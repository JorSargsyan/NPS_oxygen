enum ECustomersPermissions {
  Edit = "bk_pm_edit_customer_status",
  Read = "bk_pm_read_customers",
  Export = "bk_pm_export_customers",
}

enum ERolesPermissions {
  Create = "bk_pm_create_role",
  Delete = "bk_pm_delete_role",
  Edit = "bk_pm_edit_roles",
  Read = "bk_pm_read_roles",
}

enum EUserPermissions {
  Export = "bk_pm_export_users",
  Read = "bk_pm_read_users",
  View = "bk_pm_view_users",
}

enum ETranslationPermissions {
  Create = "bk_pm_create_translation",
  Delete = "bk_pm_delete_translation",
  Read = "bk_pm_read_translations",
}

enum EDirectoratePermissions {
  Create = "bk_pm_create_directorate",
  Edit = "bk_pm_edit_directorate",
  Read = "bk_pm_read_directorates",
}

enum EFeedbackPermissions {
  Quick_filter_by_date = "bk_pm_fb_filter_date",
  Quick_filter_by_campaign = "bk_pm_fb_filter_campaign",
  Quick_filter_by_status = "bk_pm_fb_filter_status",
  Quick_filter_by_feedback_types = "bk_pm_fb_filter_feedback_type_nps_employee_score",
  Quick_filter_by_user_visibility = "bk_pm_feedback_user_visibility",
  Additional_filter_by_employee = "bk_pm_fb_filter_employee",
  Additional_filter_by_nps_es_score = "bk_pm_fb_filter_nps_employee_score",
  Additional_filter_by_assigned_to = "bk_pm_fb_filter_assignedto_service_category",
  Additional_filter_by_task_status = "bk_pm_fb_filter_task_status",
  Additional_filter_by_directorate = "bk_pm_fb_filter_directorates",
  Grid_view_column_campaign = "bk_pm_fb_view_campaign",
  Grid_view_column_customer_assign = "bk_pm_fb_view_customer_assign",
  Grid_view_column_score = "bk_pm_fb_view_score",
  Grid_view_column_date = "bk_pm_fb_view_date",
  Grid_view_column_status = "bk_pm_fb_view_status",
  View_feedback_card = "bk_pm_view_feedback_card",
  View_notes_tab = "bk_pm_view_notes",
  Add_note = "bk_pm_add_note",
  Edit_note = "bk_pm_edit_note",
  View_edited_note = "bk_pm_view_edited_note",
  View_deleted_note = "bk_pm_view_deleted_note",
  Delete_note = "bk_pm_delete_note",
  View_feedback_card_top_component = "bk_pm_fbt_view_general_info",
  View_response_tab = "bk_pm_fbt_view_feedback_tab",
  View_survey_tab = "bk_pm_fbt_view_survey_tab",
  View_service_tab = "bk_pm_fbt_view_service_tab",
  Search = "bk_pm_fb_search",
  View_history_tab = "bk_pm_view_history",
  View_root_cause_tab = "bk_pm_view_cause_mood_tab",
  Read = "bk_pm_read_feedbacks",
  Assign = "bk_pm_assign_feedback",

  "bk_pm_delete_test_feedback" = "bk_pm_delete_test_feedback",
  Export = "bk_pm_export_feedbacks",

  Edit_feedback_status = "bk_pm_edit_feedback_status",
  Select_root_cause_mood = "bk_pm_select_cause_mood",
  View_task_logs = "bk_pm_view_task_logs",
  Add_task = "bk_pm_add_task",
  View_tasks_tab = "bk_pm_view_tasks",
  Edit_task = "bk_pm_edit_task",
  Delete_task = "bk_pm_delete_task",
}

enum ECampaignPermissions {
  Create = "bk_pm_create_campaign",
  Delete = "bk_pm_delete_campaign",
  Manage = "bk_pm_manage_campaign",
  Read = "bk_pm_read_campaigns",
}

export {
  ECustomersPermissions,
  ERolesPermissions,
  EUserPermissions,
  ETranslationPermissions,
  EDirectoratePermissions,
  EFeedbackPermissions,
  ECampaignPermissions,
};
