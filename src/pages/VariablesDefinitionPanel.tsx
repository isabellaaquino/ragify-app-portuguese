import { Stack, Tooltip, Typography } from "@mui/material";
import BottomContainer from "@/components/BottomContainer";
import { NavigationOption } from "@/utils/consts";
import { NavigationOptionType } from "@/types";
import { InfoOutlined } from "@mui/icons-material";
import VariablesGrid from "@/components/VariablesGrid";
import { useState } from "react";
import AddVariableModal from "@/components/AddVariableModal";

const VariablesDefinition: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="panel">
      <Stack direction={"column"} spacing={3}>
        <Stack direction={"column"} spacing={3}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography
              variant="h1"
              fontWeight={800}
              align="left"
              fontSize={25}
            >
              Variables
            </Typography>
            <Tooltip title="Esse eh um teste longo de tooltip!" placement="top">
              <InfoOutlined fontSize="small" />
            </Tooltip>
          </Stack>
          <VariablesGrid
            setOpen={setOpen}
            rows={[
              {
                id: 0,
                name: "Número da Licitação",
                prompt: "This is a large prompt...",
                label: "ONE-SHOT"
              },
              {
                id: 1,
                name: "Município de Irregularidade",
                prompt:
                  "This is a large prompt with a lot of characters and phrases that wouldn't fit on a normal column width",
                label: "ONE-SHOT"
              }
            ]}
          />
          <AddVariableModal open={open} handleClose={() => setOpen(false)} />
        </Stack>
        <BottomContainer
          nextPage={NavigationOption.ANNOTATION.title as NavigationOptionType}
        />
      </Stack>
    </div>
  );
};

export default VariablesDefinition;
