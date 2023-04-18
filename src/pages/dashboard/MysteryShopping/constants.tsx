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

export const AppearanceCheckList: ICheckList[] = [
  {
    id: 1,
    text: "Մասնագետների հագուստը համապատասխանում էր ընկերության կողմից սահմանված չափանիշներին",
  },
  {
    id: 2,
    text: "Մասնագետները չէին կրում աչքի ընկնող զարդեր",
  },
  {
    id: 3,
    text: "Մասնագետների հարդարանքը աչքի ընկնող չէր",
  },
  {
    id: 4,
    text: "Մասնագետները կրում էին անվանաքարտեր",
  },
];

export const HallGatheringCheckList: ICheckList[] = [
  {
    id: 5,
    text: "Սպասարկող մասնագետի սեղանը կոկիկ դասավորված էր",
  },
  {
    id: 6,
    text: "Հաճախորդների համար նախատեսված բարձր սեղանը մաքուր էր, առկա պարագաները կոկիկ դասավորված էր",
  },
];

export const BehaviourCheckList: ICheckList[] = [
  {
    id: 7,
    text: "Մասնագետները միմյանց հետ շշուկով էին հաղորդակցվում",
  },
  {
    id: 8,
    text: "Մասնագետները միմյանց հետ խոսում էին միայն գործնական թեմաներով ",
  },
  {
    id: 9,
    text: "Մասնագետները հեռախոսով խոսել են միայն գործնական թեմայով",
  },
  {
    id: 10,
    text: "Մասնագետները հեռախոսով խոսում էին ցածրաձայն",
  },
  {
    id: 11,
    text: "Մասնագետները քաղաքավարի/բարեհամբույր էին խոսում հաճախորդների հետ",
  },
];

export const GreetingCheckList: ICheckList[] = [
  {
    id: 12,
    text: "Մասնագետը նկատեց հաճախորդին անմիջապես՝ վերջինիս մոտենալուն պես",
  },
  {
    id: 13,
    text: "Մասնագետը ողջունեց հաճախորդին",
  },
  {
    id: 14,
    text: "Մասնագետը ներողություն խնդրեց հաճախորդից՝ երկար սպասելու համար",
  },
  {
    id: 15,
    text: "Մասնագետը խնդրեց հերթի կտրոնը ",
  },
];

export const TransactionCheckList = {
  payments: {
    title: "Վճարումներ",
    list: [
      {
        id: 16,
        text: "Մասնագետը պարզաբանող հարցեր տվեց՝ հասկանալու համար՝ ինչ վճարում է կատարում հաճախորդը",
      },
      {
        id: 17,
        text: "Մասնագետը նշեց վճարման ենթակա գումարի չափը",
      },
      {
        id: 18,
        text: "Մասնագետը տրամադրեց վճարման կտրոնը",
      },
      {
        id: 19,
        text: "Մասնագետը տրամադրել կամ վերադարձրել է մանրը ամբողջությամբ թոշակառուին/նպաստառուին",
      },
    ],
  },
  moneyRecieve: {
    title: "Գումարի ստացում",
    list: [
      {
        id: 20,
        text: "Մասնագետը պարզաբանող հարցեր տվեց՝ հասկանալու համար՝ ինչ գումար ստանալու նպատակով է եկել",
      },
      {
        id: 21,
        text: "Մասնագետը նշեց, թե որքան է կազմում վճարման ենթակա գումարը",
      },
      {
        id: 23,
        text: "Մասնագետը խնդրեց հաճախորդին ստորագրել համապատասխան փաստաթուղթը/տեղեկանքը/ստացականը",
      },
      {
        id: 24,
        text: "Մասնագետը տրամադրեց ստացականը",
      },
      {
        id: 25,
        text: "Մասնագետը տրամադրել է գումարը լիազորված անձին",
      },
      {
        id: 26,
        text: "Մանսագետը ընդունելի պատասխան տվեց հաճախորդին՝ դրամարկղում բավարար գումար չունենալու դեպքում",
      },
    ],
  },
  moneySending: {
    title: "Գումարի փոխանցում",
    list: [
      {
        id: 27,
        text: "Մասնագետը հարցրեց, որ երկիր են փոխանցում գումարը",
      },
      {
        id: 28,
        text: "Մասնագետը ճշտեց փոխանցվող գումարի արտարժույթը եւ չափը",
      },
      {
        id: 29,
        text: "Մասնագետը ներկայացրեց տվյալ երկրին համապատասխան փոխանցման համակարգերը",
      },
      {
        id: 30,
        text: "Մասնագետը նշեց միջնորդավճարի չափը",
      },
      {
        id: 31,
        text: "Մասնագետը խնդրեց հաճախորդի անձնագիրը եւ ստացողի տվյալները",
      },
      {
        id: 32,
        text: "Մասնագետը խնդրեց հաճախորդին ստորագրել ստացականը",
      },
      {
        id: 33,
        text: "Մասնագետը հաճախորդին տրամադրեց ստացականը",
      },
    ],
  },
  applications: {
    title: "Դիմումների ընդունում",
    list: [
      {
        id: 34,
        text: "Մասնագետը ճշտեց՝ ինչ դիմում է ներկայացնում հաճախորդը",
      },
      {
        id: 35,
        text: "Մասնագետը թվարկեց դիմումի ներկայացման համար անհրաժեշտ փաստաթղթերի ցանկը",
      },
      {
        id: 36,
        text: "Մասնագետը տրամադրեց դիմումի ձեւանմուշը եւ բացատրեց լրացման կարգը",
      },
      {
        id: 37,
        text: "Մասնագետը նշեց տեղեկանքի համար վճարվելիք գումարի չափը",
      },
      {
        id: 39,
        text: "Մասնագետը տրամադրեց տեղեկանքը",
      },
      {
        id: 40,
        text: "Մասնագետը մուտքագրեց դիմումի տվյալները համակարգ տեղում՝ հաճախորդի ներկայությամբ",
      },
    ],
  },
  additional: {
    title: "Հավելյալ ծառայություններ",
    list: [
      {
        id: 41,
        text: "Մասնագետը ճիշտ տեղեկատվություն տրամադրեց ծառայության վերաբերյալ",
      },
      {
        id: 42,
        text: "Մասնագետն ինքնուրույն սպասարկեց Ձեզ, առանց գործընկերների օգնությանը դիմելու",
      },
      {
        id: 43,
        text: "Մասնագետը հաճախորդին տրամադրեց գործարքի վճարման կտրոնը, երբ հաճախորդը չվերցրեց, մասնագետը նշեց որ վերցնելը պարտադիր է",
      },
    ],
  },
};

export const CommunicationChecklist = {
  communication: {
    title: "Հաղորդակցվելու հմտությունները",
    list: [
      {
        id: 47,
        text: "Մասնագետը չէր օգտագործում հաճախորդի համար անհասկանալի տերմիններ/մասնագիտական լեզու",
      },
      {
        id: 48,
        text: "Մասնագետը դիմում էր պաշտոնապես՝ «Դուք»-ով",
      },
      {
        id: 49,
        text: "Մասնագետը չէր ընդհատում հաճախորդի խոսքը",
      },
      {
        id: 50,
        text: "Մասնագետը բարեհամբույր էր",
      },
      {
        id: 51,
        text: "Մասնագետի խոսքը վստահ էր, չէր կմկմում կամ չէր օգտագործում «տեղյակ չեմ», «չգիտեմ», «զանգեք զանգերի կենտրոն» արտահայտությունները",
      },
    ],
  },
  conflicts: {
    title: "Կոնֆլիկտները կառավարելու հմտությունները",
    list: [
      {
        id: 52,
        text: "Մասնագետը լսեց հաճախորդի բողոքն առանց ընդհատելու",
      },
      {
        id: 53,
        text: "Մասնագետը հարցրեց հաճախորդի բողոքի պատճառը",
      },
      {
        id: 54,
        text: "Մասնագետը վստահեցրեց, որ հաճախորդի հարցը կլուծվի սահմանված ժամկետում",
      },
      {
        id: 56,
        text: "Մասնագետը դրսեւորել է պրոֆեսիոնալ վարքագիծ (չի կոպտել, չի բղավել)",
      },
    ],
  },
};

export const summaryChecklist = [
  {
    id: 58,
    text: "Մասնագետի սպասարկման օպտիմալությունը",
  },
  {
    id: 59,
    text: "Հերթերի կանոնակարգվածությունը",
  },
  {
    id: 60,
    text: "Սրահում արտահերթ սպասարկում չի նկատվել",
  },
  {
    id: 61,
    text: "Մասնաճյուղը գործում էր սահմանված աշխատանքային գրաֆիկին համաձայն",
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

export const useCaseTypeMock = [
  {
    value: 1,
    label: "Customer opening",
  },
  {
    value: 2,
    label: "Account opening",
  },
  {
    value: 3,
    label: "Exchange",
  },
  {
    value: 4,
    label: "Payment",
  },
  {
    value: 5,
    label: "Transfer",
  },
  {
    value: 6,
    label: "Loan disbursement/Consultancy",
  },
  {
    value: 7,
    label: "Deposit opening/Consultancy",
  },
];
