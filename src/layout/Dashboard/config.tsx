import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import FeedbackIcon from "@heroicons/react/24/solid/ChatBubbleLeftEllipsisIcon";
import TranslationIcon from "@heroicons/react/24/solid/DocumentTextIcon";
import Cog from "@heroicons/react/24/solid/CogIcon";
import { SvgIcon } from "@mui/material";
import Campaigns from "pages/dashboard/Campaigns";
import Customers from "pages/dashboard/Customers";
import Dictionary from "pages/dashboard/Dictionary";
import Feedbacks from "pages/dashboard/FeedBacks";
import Megaphone from "@heroicons/react/24/solid/MegaphoneIcon";
import HomePage from "pages/dashboard/Home";
import Roles from "pages/dashboard/Roles";
import Users from "pages/dashboard/Users";
import DirectoratesGrid from "pages/dashboard/Directorates";

export const items = ({
  hasRolesPerm,
  hasCustomerPerm,
  hasUsersPerm,
  hasTranslationPerm,
  hasDirectoratePerm,
  hasFeedbackPerm,
  hasCampaignPerm,
}) => {
  return [
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
    ...(hasFeedbackPerm
      ? [
          {
            title: "Responses",
            path: "responses",
            element: <Feedbacks />,
            icon: (
              <SvgIcon fontSize="small">
                <FeedbackIcon />
              </SvgIcon>
            ),
          },
        ]
      : []),
    ...(hasCampaignPerm
      ? [
          {
            title: "Campaigns",
            path: "campaigns",
            element: <Campaigns />,
            icon: (
              <SvgIcon fontSize="small">
                <Megaphone />
              </SvgIcon>
            ),
          },
        ]
      : []),

    ...(hasCustomerPerm
      ? [
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
        ]
      : []),

    ...(hasUsersPerm
      ? [
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
        ]
      : []),
    {
      title: "Settings",
      path: "",
      icon: (
        <SvgIcon fontSize="small">
          <Cog />
        </SvgIcon>
      ),
      children: [
        ...(hasTranslationPerm
          ? [
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
            ]
          : []),
        ...(hasRolesPerm
          ? [
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
            ]
          : []),
      ],
    },
    ...(hasDirectoratePerm
      ? [
          {
            title: "Directorates",
            path: "directorates",
            element: <DirectoratesGrid />,
            icon: (
              <SvgIcon fontSize="small">
                <TranslationIcon />
              </SvgIcon>
            ),
          },
        ]
      : []),
  ];
};
