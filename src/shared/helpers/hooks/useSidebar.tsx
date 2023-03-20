// import HomeIcon from "@mui/icons-material/Home";
import UsersIcon from "@mui/icons-material/Person";
import CustomersIcon from "@mui/icons-material/Contacts";
import SettingsIcon from "@mui/icons-material/Settings";
import RolesIcon from "@mui/icons-material/Key";
import TranslationsIcons from "@mui/icons-material/Translate";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { ERoutes } from "routes/constants";
import { hasUserPermission } from "../../helpers/index";
import { EPermissions } from "store/config/constants";
import CategoryIcon from '@mui/icons-material/Category';

export const useSidebarRoutes = (permissions: string[] | undefined) => {
  const hasPermissionToRoute = (perm: string) => {
    return hasUserPermission(permissions, perm);
  };

  return [
    ...(hasPermissionToRoute(EPermissions.get_users)
      ? [
          {
            text: "Users",
            icon: UsersIcon,
            path: ERoutes.USERS,
          },
        ]
      : []),
  

    ...(hasPermissionToRoute(EPermissions.get_customers)
      ? [
          {
            text: "Customers",
            icon: CustomersIcon,
            path: ERoutes.CUSTOMERS,
          },
        ]
      : []),

    ...(hasPermissionToRoute(EPermissions.get_roles)
      ? [
          {
            text: "Roles",
            icon: RolesIcon,
            path: ERoutes.ROLES,
          },
        ]
      : []),
  
    ...(hasPermissionToRoute(EPermissions.get_translations)
      ? [
          {
            text: "Translations",
            icon: TranslationsIcons,
            path: ERoutes.TRANSLATIONS,
          },
        ]
      : []),
   
    ...((hasPermissionToRoute(EPermissions.get_notifications) ||
    hasPermissionToRoute(EPermissions.get_users_notifications))
      ? [
          {
            text: "Notifications",
            icon: NotificationsIcon,
            children: [
              ...(hasPermissionToRoute(EPermissions.get_notifications)
                ? [
                    {
                      text: "Templates",
                      icon: SettingsIcon,
                      path: ERoutes.NOTIFICATION_TEMPLATES,
                    },
                  ]
                : []),
          

              ...(hasPermissionToRoute(EPermissions.get_users_notifications)
                ? [
                    {
                      text: "Notifications",
                      icon: RolesIcon,
                      path: ERoutes.NOTIFICATIONS,
                    },
                  ]
                : []),
          
            ],
          },
        ]
      : []),
  
    {
      text: "Settings",
      icon: SettingsIcon,
      path: ERoutes.SETTINGS,
    },

    ...(hasPermissionToRoute(EPermissions.get_categories)
    ? [
      {
        text: "Categories",
        icon: CategoryIcon,
        path: ERoutes.CATEGORIES,
      }
  
      ]
    : []),

    ...(hasPermissionToRoute(EPermissions.get_shops)
    ? [
      {
        text: "Shops",
        icon: AddBusinessIcon,
        path: ERoutes.SHOPS,
      }
  
      ]
    : []),
   

    ...(hasPermissionToRoute(EPermissions.get_subscription_plans)
    ? [
      {
        text: "Subscription plans",
        icon:SubscriptionsIcon,
        path: ERoutes.SUBSCRIPTION_PLANS,
      },
      ]
    : []),
   
  ];
};
