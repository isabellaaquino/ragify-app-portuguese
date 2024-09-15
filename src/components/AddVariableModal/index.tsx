import React, { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Stack } from "@mui/system";
import {
  Button,
  Chip,
  FormControl,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import { Variable, VariableLabel, VariableLabelType } from "@/types/Variables";
import { FormContext } from "@/contexts/form";
import { useSnackbar } from "notistack";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddVariableModal: React.FC<ModalProps> = ({ open, handleClose }) => {
  const {
    formData: { variables },
    setVariables
  } = useContext(FormContext);

  const [variableName, setVariableName] = useState("");
  const [label, setLabel] = useState<VariableLabelType | undefined>(undefined);
  const [prompt, setPrompt] = useState("");

  const [error, setError] = useState(false);
  const setTimetoutError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000);
    return;
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleClearForm = () => {
    setVariableName("");
    setLabel(undefined);
    setPrompt("");
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!variableName) {
      enqueueSnackbar("Please fill in all required fields.", {
        variant: "error"
      });
      setTimetoutError();
    }

    if (variables.find(variable => variable.name === variableName)) {
      enqueueSnackbar("Variable name already exists. Please try again.", {
        variant: "error"
      });
      setTimetoutError();
      return;
    }

    const newVariable: Variable = {
      name: variableName,
      label: label,
      prompt: prompt
    };

    const newVariables = [...variables, newVariable];
    setVariables(newVariables);

    enqueueSnackbar("Variable added successfully.", { variant: "success" });

    handleClearForm();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          ...style
        }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          className="h-full w-full"
        >
          <Typography variant="h1" fontWeight={800} fontSize={30}>
            Add Variable
          </Typography>
          <FormControl required fullWidth>
            <Stack spacing={3}>
              <TextField
                id="outlined-basic"
                label="Variable Name"
                variant="outlined"
                value={variableName}
                onChange={e => setVariableName(e.target.value)}
                required
                error={error}
              />
              <Box className="w-full">
                <TextField
                  select
                  label="Label"
                  value={label ? label : ""}
                  onChange={e => setLabel(e.target.value as VariableLabelType)}
                  sx={{ width: "100%" }}
                >
                  {Object.keys(VariableLabel).map((key, index) => (
                    <MenuItem key={index} value={key}>
                      <Chip
                        key={index}
                        label={VariableLabel[
                          key as VariableLabelType
                        ].name.toUpperCase()}
                        sx={{
                          color: VariableLabel[key as VariableLabelType].color,
                          border: `1px solid ${VariableLabel[key as VariableLabelType].color}`,
                          backgroundColor: `${VariableLabel[key as VariableLabelType].color}10`
                        }}
                      />
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <TextField
                placeholder="Write your prompt..."
                label="Prompt"
                multiline
                rows={5}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
            </Stack>
          </FormControl>
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
            <Button
              type="button"
              variant="contained"
              tabIndex={-1}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddVariableModal;

const style = {
  height: "80vh",
  width: "40vw",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 3,
  boxShadow: 24,
  paddingX: 6
};