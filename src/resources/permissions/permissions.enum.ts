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
  "bk_pm_fb_filter_date" = "bk_pm_fb_filter_date",
  "bk_pm_fb_filter_campaign" = "bk_pm_fb_filter_campaign",
  "bk_pm_fb_filter_status" = "bk_pm_fb_filter_status",
  "bk_pm_fb_filter_feedback_type_nps_employee_score" = "bk_pm_fb_filter_feedback_type_nps_employee_score",
  "bk_pm_fb_filter_postal_office" = "bk_pm_fb_filter_postal_office",
  "bk_pm_fb_filter_po_net" = "bk_pm_fb_filter_po_net",
  "bk_pm_fb_filter_po_direction" = "bk_pm_fb_filter_po_direction",
  "bk_pm_fb_filter_employee" = "bk_pm_fb_filter_employee",
  "bk_pm_fb_filter_nps_employee_score" = "bk_pm_fb_filter_nps_employee_score",
  "bk_pm_fb_filter_assignedto_service_category" = "bk_pm_fb_filter_assignedto_service_category",
  "bk_pm_feedback_user_visibility" = "bk_pm_feedback_user_visibility",
  "bk_pm_fb_view_campaign" = "bk_pm_fb_view_campaign",
  "bk_pm_fb_view_score" = "bk_pm_fb_view_score",
  "bk_pm_fb_view_date" = "bk_pm_fb_view_date",
  "bk_pm_fbt_view_general_info" = "bk_pm_fbt_view_general_info",
  "bk_pm_fbt_view_feedback_tab" = "bk_pm_fbt_view_feedback_tab",
  "bk_pm_fbt_view_survey_tab" = "bk_pm_fbt_view_survey_tab",
  "bk_pm_fbt_view_service_tab" = "bk_pm_fbt_view_service_tab",
  "bk_pm_fb_search" = "bk_pm_fb_search",
  "bk_pm_view_history" = "bk_pm_view_history",
  "bk_pm_view_cause_mood_tab" = "bk_pm_view_cause_mood_tab",
  Read = "bk_pm_read_feedbacks",
  "bk_pm_assign_feedback" = "bk_pm_assign_feedback",
  "bk_pm_view_feedback_card" = "bk_pm_view_feedback_card",
  "bk_pm_delete_test_feedback" = "bk_pm_delete_test_feedback",
  "bk_pm_export_feedbacks" = "bk_pm_export_feedbacks",
  "bk_pm_view_notes" = "bk_pm_view_notes",
  "bk_pm_add_note" = "bk_pm_add_note",
  "bk_pm_edit_note" = "bk_pm_edit_note",
  "bk_pm_view_edited_note" = "bk_pm_view_edited_note",
  "bk_pm_view_deleted_note" = "bk_pm_view_deleted_note",
  "bk_pm_delete_note" = "bk_pm_delete_note",
  "bk_pm_edit_feedback_status" = "bk_pm_edit_feedback_status",
  "bk_pm_select_cause_mood" = "bk_pm_select_cause_mood",
  "bk_pm_cancel_feedback" = "bk_pm_cancel_feedback",
  "bk_pm_view_task_logs" = "bk_pm_view_task_logs",
  "bk_pm_add_task" = "bk_pm_add_task",
  "bk_pm_view_tasks" = "bk_pm_view_tasks",
  "bk_pm_edit_task" = "bk_pm_edit_task",
  "bk_pm_delete_task" = "bk_pm_delete_task",
  "bk_pm_fb_filter_task_status" = "bk_pm_fb_filter_task_status",
  "bk_pm_fb_filter_directorates" = "bk_pm_fb_filter_directorates",
  "bk_pm_fb_view_customer_assign" = "bk_pm_fb_view_customer_assign",
  "bk_pm_fb_view_status" = "bk_pm_fb_view_status",
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
