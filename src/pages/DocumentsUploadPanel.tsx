import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  NewUploadedFileFormData,
  newUploadedFileSchema
} from "@/forms/FileUploadForm";
import DragAndDrop from "@/components/DragAndDrop";
import FilesList from "@/components/FilesList";

const DocumentsUploadPanel: React.FC = () => {
  const {
    formState: { errors },
    setValue,
    getValues
  } = useForm<NewUploadedFileFormData>({
    resolver: zodResolver(newUploadedFileSchema),
    defaultValues: { uploadedFiles: undefined }
  });

  return (
    <div className="panel">
      <Stack direction={"column"} spacing={5}>
        <DragAndDrop
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
        <FilesList />
      </Stack>
    </div>
  );
};

export default DocumentsUploadPanel;
