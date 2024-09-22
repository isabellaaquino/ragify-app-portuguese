import {
  ChecksIcon,
  DevIcon,
  FileIcon,
  GraphIcon,
  LayersIcon
} from "@/components/Icons";

export const NavigationOption = {
  DOCUMENTS: { id: 0, title: "Documents", icon: <FileIcon /> },
  VARIABLES: { id: 1, title: "Variables", icon: <LayersIcon /> },
  ANNOTATION: { id: 2, title: "Annotation", icon: <ChecksIcon /> },
  PARAMETERS: {
    id: 3,
    title: "RAG Parameters",
    icon: <DevIcon className="text-gray-400" />
  },
  RESULTS: {
    id: 4,
    title: "Results",
    icon: <GraphIcon />
  }
};
