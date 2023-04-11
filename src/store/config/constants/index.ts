export const EBaseUrl = {
  API: "https://api.satisfai.cx/api",
  // API: "https://npsapi.verifie.ai/Api",
  MediaTemplateURL: "https://npsapi.verifie.ai/media/template",
  BaseURL: "https://npsapi.verifie.ai",
  MediaUserURL: "https://npsapi.verifie.ai/media/user",
};

export const LStorage = {
  AUTH: "authorization",
  LANG: "language",
  EXPIRATION_DATE: "expiration_date",
  EXPIRATION_HOURS: "expiration_hours",
};

export enum ETheme {
  Light = "Light",
  Dark = "Dark",
}

export enum EPermissions {
  get_customers = "get:customers",
  view_customers = "view:customers",
  export_customers = "export:customers",
  put_customers = "put:customers",

  get_users = "get:users",
  post_users = "post:users",
  put_users = "put:users",

  attach_roles = "attach:roles",
  unattach_roles = "unattach:roles",
  delete_roles = "delete:roles",
  get_roles = "get:roles",
  post_roles = "post:roles",
  put_roles = "put:roles",

  delete_translations = "delete:translations",
  get_translations = "get:translations",
  view_translations = "view:translations",
  post_translations = "post:translations",
  put_translations = "put:translations",

  delete_notifications = "delete:notifications",
  get_notifications = "get:notifications",
  post_notifications = "post:notifications",
  put_notifications = "put:notifications",

  get_users_notifications = "get:users:notifications",
  post_users_notifications = "post:users:notifications",
  delete_users_notifications = "delete:users:notifications",

  put_shops = "put:shops",
  post_shops = "post:shops",
  get_shops = "get:shops",
  delete_shops = "delete:shops",

  delete_subscription_plans = "delete:subscription-plans",
  get_subscription_plans = "get:subscription-plans",
  post_subscription_plans = "post:subscription-plans",
  put_subscription_plans = "put:subscription-plans",

  delete_categories = "delete:categories",
  get_categories = "get:categories",
  post_categories = "post:categories",
  put_categories = "put:categories",
}

export const defaultTableData = {
  allIds: [],
  displayData: [],
  totalDisplayRecords: 0,
  totalRecords: 0,
};

export const DATE_FORMAT = "dd/MM/yyyy";
export const DATE_FORMAT_OPTIONAL = "MM/dd/yyyy";
export const HOUR_FORMAT = "HH:mm ";
