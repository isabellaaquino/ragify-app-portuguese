from langchain.llms.ollama import Ollama
from extractor.chains.custom_chains import DynamicRetrievalQA, DynamicRetriever

from langchain.prompts import PromptTemplate
from langchain_core.vectorstores import VectorStoreRetriever


class LocalLLM:
    def __init__(self, model_path, local=True) -> None:
        """
        Carrega um modelo de linguagem local e armazena-o em self.llm
        """

        base_url = (
            "http://localhost:11434/" if local else "https://ollama-dev.ceos.ufsc.br/"
        )

        self.llm = Ollama(model=model_path, base_url=base_url, temperature=0, top_k=1)

    def get_pipeline(self):
        return self.llm

    def create_retrieval_qa_chain(
        self, db: VectorStoreRetriever, chain_type="stuff", prompt_template=None
    ):
        """
        Instancia uma chain DynamicRetrivalQA, que recebe um DynamicVectorRetriever
        (devido ao suporte descontinuado para RetrievalQA e chains relacionadas (map reduce, etc))
        """

        template = (
            """
        Você é um assistente de IA útil e fornece a resposta em língua portuguesa para a pergunta com base no contexto fornecido.
        Use os seguintes pedaços de contexto para responder a pergunta ao final. Se não for possível responder a pergunta a partir do contexto, apenas responda que você encontrou a resposta.
        CONTEXTO: {context}
        >>>PERGUNTA<<<: {question}
        >>>RESPOSTA<<<:
        """
            if not prompt_template
            else prompt_template
        )

        prompt = PromptTemplate(
            template=template, input_variables=["context", "question"]
        )

        chain_type_kwargs = None
        if chain_type == "stuff":
            chain_type_kwargs = {"prompt": prompt}

        qa_chain = DynamicRetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type=chain_type,
            chain_type_kwargs=chain_type_kwargs,
            retriever=DynamicRetriever(vectorstore=db),
            return_source_documents=True,
        )

        if not chain_type == "stuff":
            qa_chain.combine_documents_chain.llm_chain.prompt.template = prompt

        return qa_chain

    @staticmethod
    def get_model_kwargs(chain_type, model_name, top_k):
        return {
            "model_name": model_name,
            "quantization": "8bit",
            "top_k": top_k,
            "chain_type": chain_type,
        }
