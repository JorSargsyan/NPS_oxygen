import { Chip } from "@mui/material";
import { IColumn } from "shared/ui/Table/constants";
import video1 from "assets/videos/video1.mp4";
import video2 from "assets/videos/video2.mp4";
import video3 from "assets/videos/video3.mp4";

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
];

export interface IUseCase {
  id: number;
  caseId: string;
  creationDate: string;
  createdBy: string;
  source: string;
  video: {
    title: string;
    url?: string;
  };
  hasChecklist: boolean;
}

export interface ICheckList {
  id: number;
  text: string;
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
      url: video1,
    },
    hasChecklist: true,
  },
  {
    id: 2,
    caseId: "HJSADJ13",
    creationDate: "03/18/2023",
    createdBy: "Satisfai@admin.am",
    source: "Nor Nork branch",
    video: {
      title: "Nor_Nork_Branch_12315",
      url: video2,
    },
    hasChecklist: false,
  },
  {
    id: 3,
    caseId: "HJSADJ14",
    creationDate: "03/19/2023",
    createdBy: "Satisfai@admin.am",
    source: "Davitashen branch",
    video: {
      title: "Davitashen_branch_13131",
      url: video3,
    },
    hasChecklist: false,
  },
];

export const checkListData: ICheckList[] = [
  {
    id: 1,
    text: "Մասնագետները միմիանց հետ շշուկով էին հաղորդակցվում",
  },
  {
    id: 2,
    text: "Մասնագետները միմիանց հետ խոսում էին միայն գործնական թեմաներով",
  },
  {
    id: 3,
    text: "Մասնագետները հեռախոսով խոսել են միայն գործնական թեմաներով",
  },
  {
    id: 4,
    text: "Մասնագետները հեռախոսով խոսում էին ցածրաձայն",
  },
  {
    id: 5,
    text: "Մասնագետները բարեհամբույր էին խոսում հաճախորդների հետ",
  },
];

export const branchListMock = [
  {
    value: 1,
    label: "Nor nork branch",
  },
  {
    value: 2,
    label: "Davtashen branch",
  },
  {
    value: 3,
    label: "Kentron branch",
  },
];

export const operatorListMock = [
  {
    value: 1,
    label: "Operator 1",
  },
  {
    value: 2,
    label: "Operator 2",
  },
  {
    value: 3,
    label: "Operator 3",
  },
];
