import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import FeedbackIcon from "@heroicons/react/24/solid/ChatBubbleLeftEllipsisIcon";
import TranslationIcon from "@heroicons/react/24/solid/DocumentTextIcon";
import { SvgIcon } from "@mui/material";
import Campaigns from "pages/dashboard/Campaigns";
import Customers from "pages/dashboard/Customers";
import Dictionary from "pages/dashboard/Dictionary";
import Feedbacks from "pages/dashboard/FeedBacks";
import Megaphone from "@heroicons/react/24/solid/MegaphoneIcon";
import HomePage from "pages/dashboard/Home";
import Roles from "pages/dashboard/Roles";
import Users from "pages/dashboard/Users";

export const items = [
  {
    title: "Overview",
    path: "overview",
    element: <HomePage />,
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Feedbacks",
    path: "feedbacks",
    element: <Feedbacks />,
    icon: (
      <SvgIcon fontSize="small">
        <FeedbackIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Campaigns",
    path: "campaings",
    element: <Campaigns />,
    icon: (
      <SvgIcon fontSize="small">
        <Megaphone />
      </SvgIcon>
    ),
  },
  {
    title: "Customers",
    path: "customers",
    element: <Customers />,
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Roles",
    path: "roles",
    element: <Roles />,
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Users",
    path: "users",
    element: <Users />,
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Translations",
    path: "dictionary",
    element: <Dictionary />,
    icon: (
      <SvgIcon fontSize="small">
        <TranslationIcon />
      </SvgIcon>
    ),
  },
];
