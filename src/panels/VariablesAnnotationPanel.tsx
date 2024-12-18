import { Stack, Typography } from "@mui/material";
import TabSwitcher from "@/components/TabSwitcher";
import FilesList from "@/components/FilesList";
import BottomContainer from "@/components/BottomContainer";
import { NavigationOption } from "@/utils/consts";
import { NavigationOptionType } from "@/types";
import { InfoOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { FormContext } from "@/contexts/form";
import { TabProvider } from "@/contexts/tab";

const VariablesAnnotationPanel: React.FC = () => {
  const {
    formData: { variables }
  } = useContext(FormContext);

  return (
    <div className="panel">
      {variables.length === 0 ? (
        <Typography variant="h5" fontWeight={400}>
          Nenhuma variável criada. Crie variáveis para continuar.
        </Typography>
      ) : (
        <TabProvider defaultTab={variables[0].name}>
          <Stack
            direction={"column"}
            spacing={1}
            justifyContent={"space-between"}
            height={"100%"}
          >
            <Stack direction={"column"} spacing={3}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Typography
                  variant="h1"
                  fontWeight={800}
                  align="left"
                  fontSize={25}
                >
                  Anotação de Variáveis
                </Typography>
                <InfoOutlined fontSize="small" />
              </Stack>
              <TabSwitcher tabs={variables.map(variable => variable.name)} />
            </Stack>
            <FilesList annotation />
            <BottomContainer
              nextPage={
                NavigationOption.PARAMETERS.title as NavigationOptionType
              }
            />
          </Stack>
        </TabProvider>
      )}
    </div>
  );
};

export default VariablesAnnotationPanel;
