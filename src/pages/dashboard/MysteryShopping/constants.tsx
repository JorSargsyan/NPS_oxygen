import { Chip } from "@mui/material";
import { IColumn } from "shared/ui/Table/constants";

export const useCaseColumns: IColumn[] = [
  {
    label: "Id",
    field: "caseId",
  },
  {
    label: "Created at",
    field: "creationDate",
  },
  {
    label: "Created by",
    field: "createdBy",
  },
  {
    label: "Source",
    field: "source",
  },
  {
    label: "Checklist",
    layout: (row: IUseCase) => (
      <Chip
        color={row.hasChecklist ? "success" : "default"}
        label={row.hasChecklist ? "Yes" : "No"}
      />
    ),
  },
  {
    label: "Details",
    field: "details",
  },
];

export interface IUseCase {
  id: number;
  caseId: string;
  creationDate: string;
  createdBy: string;
  source: string;
  video: {
    title: string;
    url: string;
  };
  hasChecklist: boolean;
  details: string;
}

export const useCaseData: IUseCase[] = [
  {
    id: 1,
    caseId: "HJSADJ12",
    creationDate: "03/18/2023",
    createdBy: "Satisfai@admin.am",
    source: "Kentron branch",
    video: {
      title: "Kentron_Branch_12453",
      url: "https://www.youtube.com/watch?v=5tPUY5GS0AY",
    },
    hasChecklist: true,
    details: "some info about video",
  },
  {
    id: 2,
    caseId: "HJSADJ13",
    creationDate: "03/18/2023",
    createdBy: "Satisfai@admin.am",
    source: "Nor Nork branch",
    video: {
      title: "Nor_Nork_Branch_12315",
      url: "https://www.youtube.com/watch?v=5tPUY5GS0AY",
    },
    hasChecklist: false,
    details: "some info about video",
  },
  {
    id: 3,
    caseId: "HJSADJ14",
    creationDate: "03/19/2023",
    createdBy: "Satisfai@admin.am",
    source: "Davitashen branch",
    video: {
      title: "Davitashen_branch_13131",
      url: "https://www.youtube.com/watch?v=5tPUY5GS0AY",
    },
    hasChecklist: false,
    details: "some info about video",
  },
  {
    id: 4,
    caseId: "HJSADJ15",
    creationDate: "03/20/2023",
    createdBy: "Satisfai@admin.am",
    source: "Nork branch",
    video: {
      title: "Nork_Branch_452",
      url: "https://www.youtube.com/watch?v=5tPUY5GS0AY",
    },
    hasChecklist: false,
    details: "some info about video",
  },
  {
    id: 5,
    caseId: "HJSADJ16",
    creationDate: "03/22/2023",
    createdBy: "Satisfai@admin.am",
    source: "Avan branch",
    video: {
      title: "Avan_Branch_531",
      url: "https://www.youtube.com/watch?v=5tPUY5GS0AY",
    },
    hasChecklist: false,
    details: "some info about video",
  },
];
