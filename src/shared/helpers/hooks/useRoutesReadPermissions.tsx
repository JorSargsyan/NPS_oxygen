import { useMemo } from "react";
import {
  ECampaignPermissions,
  ECustomersPermissions,
  EDirectoratePermissions,
  EFeedbackPermissions,
  EOverviewPermissions,
  ERolesPermissions,
  ETranslationPermissions,
  EUserPermissions,
} from "resources/permissions/permissions.enum";
import usePermission from "./usePermission";

const useRoutesReadPermissions = () => {
  const hasCustomerPerm = usePermission(ECustomersPermissions.Read);
  const hasRolesPerm = usePermission(ERolesPermissions.Read);
  const hasUsersPerm = usePermission(EUserPermissions.Read);
  const hasTranslationPerm = usePermission(ETranslationPermissions.Read);
  const hasDirectoratePerm = usePermission(EDirectoratePermissions.Read);
  const hasFeedbackPerm = usePermission(EFeedbackPermissions.Read);
  const hasCampaignPerm = usePermission(ECampaignPermissions.Read);
  const hasOverviewPerm = usePermission(EOverviewPermissions.Read);

  const hasPerm = useMemo(() => {
    return {
      hasCustomerPerm,
      hasRolesPerm,
      hasUsersPerm,
      hasTranslationPerm,
      hasDirectoratePerm,
      hasFeedbackPerm,
      hasCampaignPerm,
      hasOverviewPerm,
    };
  }, [
    hasCustomerPerm,
    hasRolesPerm,
    hasUsersPerm,
    hasTranslationPerm,
    hasDirectoratePerm,
    hasFeedbackPerm,
    hasCampaignPerm,
    hasOverviewPerm,
  ]);

  return hasPerm;
};

export { useRoutesReadPermissions };
