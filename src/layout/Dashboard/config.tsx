import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import FeedbackIcon from "@heroicons/react/24/solid/ChatBubbleLeftEllipsisIcon";
import ShoppingIcon from "@heroicons/react/24/solid/BuildingStorefrontIcon";
import TranslationIcon from "@heroicons/react/24/solid/DocumentTextIcon";
import Cog from "@heroicons/react/24/solid/CogIcon";
import { SvgIcon } from "@mui/material";
import Campaigns from "pages/dashboard/Campaigns";
import Customers from "pages/dashboard/Customers";
import Dictionary from "pages/dashboard/Dictionary";
import Feedbacks from "pages/dashboard/FeedBacks";
import Megaphone from "@heroicons/react/24/solid/MegaphoneIcon";
import Dashboard from "pages/dashboard/Home";
import Roles from "pages/dashboard/Roles";
import Users from "pages/dashboard/Users";
import DirectoratesGrid from "pages/dashboard/Directorates";
import MysteryShopping from "pages/dashboard/MysteryShopping";

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
      title: "overview_section_title",
      path: "overview",
      element: <Dashboard />,
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      ),
    },
    ...(hasFeedbackPerm
      ? [
          {
            title: "responses_section_title",
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
    {
      title: "mystery_shopping_title",
      path: "mystery-shopping",
      element: <MysteryShopping />,
      icon: (
        <SvgIcon fontSize="small">
          <ShoppingIcon />
        </SvgIcon>
      ),
    },
    ...(hasCampaignPerm
      ? [
          {
            title: "surveys_section_title",
            path: "survey",
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
            title: "customers_section_title",
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
            title: "users_section_title",
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
      title: "settings",
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
                title: "translations_section_title",
                path: "dictionary",
                element: <Dictionary />,
                errorElement: <div>ERROR ELEMENT</div>,
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
                title: "roles_section_title",
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
