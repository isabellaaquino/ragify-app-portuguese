import os
from typing import List

from fastapi import UploadFile

import shutil


DOCUMENTS_FOLDER_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "..", "extractor", "documentos-pdf"
)


async def bufferize_uploaded_files(uploaded_files: List[UploadFile]):
    """
    Save a list of uploaded files to a local folder.

    :param uploaded_files: List of uploaded file objects
    :param destination_folder: Path to the destination folder
    """

    for uploaded_file in uploaded_files:
        file_path = os.path.join(DOCUMENTS_FOLDER_PATH, uploaded_file.filename)
        with open(file_path, "wb") as f:
            f.write(await uploaded_file.read())


async def clean_up_uploaded_files():
    if os.path.exists(DOCUMENTS_FOLDER_PATH):
        shutil.rmtree(DOCUMENTS_FOLDER_PATH)
    os.makedirs(DOCUMENTS_FOLDER_PATH)