import { GlobalContext } from "@/contexts/global";
import { NavigationOptionType } from "@/types";
import { NavigationOption } from "@/utils/consts";
import { Icon, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";

const PageTracker: React.FC = () => {
  const { pageType, setPageType } = useContext(GlobalContext);
  const componentMap = pageTrackerMapper(setPageType);

  const CurrentPage = componentMap[pageType];

  return (
    <div className="absolute left-0 top-0 p-3">
      <Stack
        direction={"row"}
        gap={1}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CurrentPage />
      </Stack>
    </div>
  );
};

export default PageTracker;

interface SectionProps {
  original?: boolean;
}

const pageTrackerMapper = (
  setPageType: (value: NavigationOptionType) => void
) => {
  const ArrowIcon: React.JSX.Element = (
    <Icon className={"material-symbols-outlined"} sx={{ fontSize: "15px" }}>
      arrow_forward_ios
    </Icon>
  );

  const DocumentsSection: React.FC<SectionProps> = ({ original = true }) => {
    return (
      <>
        <Icon
          className={"material-symbols-outlined cursor-pointer"}
          sx={{ fontSize: "15px" }}
          onClick={() => setPageType("DOCUMENTS")}
        >
          {NavigationOption.DOCUMENTS.icon}
        </Icon>
        {original && <Typography fontSize={15}>Uploading Documents</Typography>}
      </>
    );
  };

  const VariablesSection: React.FC<SectionProps> = ({ original = true }) => {
    return (
      <>
        <DocumentsSection original={false} />
        {ArrowIcon}
        <Icon
          className={"material-symbols-outlined cursor-pointer"}
          sx={{ fontSize: "15px" }}
          onClick={() => setPageType("VARIABLES")}
        >
          {NavigationOption.VARIABLES.icon}
        </Icon>
        {original && (
          <Typography fontSize={15}>Annotating Variables</Typography>
        )}
      </>
    );
  };

  const ParametersSection: React.FC<SectionProps> = ({ original = true }) => {
    return (
      <>
        <VariablesSection original={false} />
        {ArrowIcon}
        <Icon
          className={"material-symbols-outlined cursor-pointer"}
          sx={{ fontSize: "15px" }}
          onClick={() => setPageType("PARAMETERS")}
        >
          {NavigationOption.PARAMETERS.icon}
        </Icon>
        <Typography fontSize={15}>Choosing Parameters</Typography>
      </>
    );
  };

  return {
    [NavigationOption.DOCUMENTS.title]: DocumentsSection,
    [NavigationOption.VARIABLES.title]: VariablesSection,
    [NavigationOption.ANNOTATION.title]: VariablesSection,
    [NavigationOption.PARAMETERS.title]: ParametersSection
  };
};
