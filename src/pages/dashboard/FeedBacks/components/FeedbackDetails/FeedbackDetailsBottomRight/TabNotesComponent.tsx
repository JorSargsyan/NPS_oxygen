import History from "@heroicons/react/24/outline/ClockIcon";
import Edit from "@heroicons/react/24/outline/PencilIcon";
import Trash from "@heroicons/react/24/outline/TrashIcon";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import { Fragment, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EFeedbackPermissions } from "resources/permissions/permissions.enum";
import { getQueryParams } from "shared/helpers/getQueryParams";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import usePermission from "shared/helpers/hooks/usePermission";
import useTranslation from "shared/helpers/hooks/useTranslation";
import ButtonLoader from "shared/ui/ButtonLoader";
import SharedDialog from "shared/ui/Dialog";
import RightDrawer from "shared/ui/Drawer";
import BasicTextArea from "shared/ui/TextArea";
import TextInput from "shared/ui/TextInput";
import { EBaseUrl } from "store/config/constants";
import { ERequestStatus } from "store/enums/index.enum";
import {
  IFeedbackNoteHistory,
  IFeedbackNotes,
  IUpdateNote,
} from "store/interfaces/feedback";
import {
  selectButtonLoadingState,
  setButtonLoading,
  setLoading,
} from "store/slicers/common";
import {
  AddFeedbackNote,
  DeleteFeedbackNote,
  GetFeedbackDeletedNoteHistory,
  GetFeedbackEditedNoteHistory,
  GetFeedbackNotes,
  selectFeedbackNoteHistory,
  selectFeedbackNotes,
  UpdateFeedbackNote,
} from "store/slicers/feedback";
import { selectUserInfo } from "store/slicers/users";
import NoData from "../../NoData";
import { deleteNoteDialogOptions } from "./constants";
import NoteHistory from "./FeedbackSharedHistory";

export const CardContentNoPadding = styled(CardContent)(`
  padding: 20px;
  &:last-child {
    padding-bottom: 20px;
  }
`);

interface IFormData {
  notesList: IFeedbackNotes[];
  id: number | string;
  textarea: string;
}

const currentTime = format(new Date(), "dd.MM.yyyy HH:mm:ss");

const TabNotesComponent = () => {
  const [warningOpen, setWarningOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const hasAddNotePermission = usePermission(EFeedbackPermissions.Add_note);
  const hasEditNotePermission = usePermission(EFeedbackPermissions.Edit_note);
  const hasDeleteNotePermission = usePermission(
    EFeedbackPermissions.Delete_note
  );
  const hasViewEditedNotePermission = usePermission(
    EFeedbackPermissions.View_edited_note
  );
  const hasViewDeletedNotePermission = usePermission(
    EFeedbackPermissions.View_deleted_note
  );

  const { id } = useParams();

  const t = useTranslation();

  const methods = useForm<IFormData>({
    defaultValues: { notesList: [], id: "" },
  });

  const isButtonLoading = useSelector(selectButtonLoadingState);
  const notesList = useSelector(selectFeedbackNotes);
  const historyList = useSelector(selectFeedbackNoteHistory);
  const userInfo = useSelector(selectUserInfo);

  const watchNotesList = useWatch({
    name: "notesList",
    control: methods.control,
  });

  const watchEditedNoteID = useWatch({
    name: "id",
    control: methods.control,
  });

  const watchTextArea = useWatch({
    name: "textarea",
    control: methods.control,
  });

  const dispatch = useAsyncDispatch();

  const refetchFeedbackNotes = async () => {
    const { meta } = await dispatch(GetFeedbackNotes(Number(id)));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      await dispatch(setButtonLoading(false));
      return;
    }
  };

  const handleAddNote = async () => {
    const data = {
      creationDate: currentTime,
      feedbackID: Number(id),
      id: notesList?.length + 1,
      isDeleted: false,
      isUpdated: false,
      note: watchTextArea,
    };
    methods.setValue("textarea", "");
    await dispatch(setButtonLoading(true));
    await dispatch(AddFeedbackNote(data));
    await dispatch(setButtonLoading(false));

    await refetchFeedbackNotes();
  };

  const handleDelete = async () => {
    if (!activeRow) {
      return;
    }
    dispatch(setLoading(true));
    const { meta } = await dispatch(DeleteFeedbackNote(activeRow));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      dispatch(setLoading(false));
      return;
    }

    await refetchFeedbackNotes();
    await dispatch(setLoading(false));
    setActiveRow(undefined);
    toast.success("Note is deleted");
  };

  const editNote = (note: IFeedbackNotes) => {
    methods.setValue("id", note.id);
  };

  const deleteNote = (note: IFeedbackNotes) => {
    setActiveRow(note.id);
    setWarningOpen(true);
  };

  const handleCancelNoteEditing = () => {
    methods.setValue("id", "");
  };

  const handleSaveEditedNote = async (note: IFeedbackNotes) => {
    const data: IUpdateNote = {
      noteID: note.id,
      formData: {
        feedbackID: Number(id),
        note: note.note,
      },
    };
    const { meta } = await dispatch(UpdateFeedbackNote(data));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    await refetchFeedbackNotes();
  };

  const viewFeedbackHistory = async (note: IFeedbackNotes) => {
    const data = {
      noteId: note.id,
      feedbackId: id,
    };
    const query = getQueryParams(data);
    const action = note.isDeleted
      ? dispatch(GetFeedbackDeletedNoteHistory(query))
      : dispatch(GetFeedbackEditedNoteHistory(query));
    const { meta } = await action;
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    setDrawerOpen(true);
  };

  const isSameNoteCreator = useCallback(
    (id) => {
      return id === userInfo?.id;
    },
    [userInfo?.id]
  );

  const initialFetch = useCallback(() => {
    if (notesList?.length) {
      methods.reset({
        notesList,
      });
    }
  }, [notesList, methods]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return (
    <Box p={3} sx={{ overflowY: "scroll", p: 3 }}>
      <FormProvider {...methods}>
        {hasAddNotePermission && (
          <>
            <BasicTextArea
              name="textarea"
              aria-label="Add Notes"
              placeholder={t("type_your_answer")}
            />
            <Box textAlign="right" py={2}>
              <ButtonLoader
                disabled={!watchTextArea}
                onClick={handleAddNote}
                isLoading={isButtonLoading}
              >
                <Typography>Add note</Typography>
              </ButtonLoader>
            </Box>
          </>
        )}

        <Box sx={{ maxHeight: 500, overflowY: "scroll" }}>
          {watchNotesList?.length ? (
            watchNotesList?.map((note, index) => {
              return (
                <Card key={note.id} sx={{ marginBottom: 2 }}>
                  <CardContentNoPadding>
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      justifyContent="space-between"
                      pb={1}
                    >
                      <Box display="flex" alignItems="center">
                        <Box mr={1}>
                          {note?.user?.imagePath ? (
                            <Avatar
                              sx={{
                                height: 40,
                                width: 40,
                              }}
                              src={`${EBaseUrl.MediaUserURL}/${note?.user?.imagePath}`}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                height: 40,
                                width: 40,
                                backgroundColor: "primary.main",
                              }}
                            >
                              {note?.user?.name.slice(0, 1)}
                            </Avatar>
                          )}
                        </Box>
                        <Box>
                          <Box fontSize={12}>
                            {`${note?.user?.name} ${note?.user?.surname}`}
                            {note.isUpdated && (
                              <Typography
                                sx={{ color: "warning.main" }}
                                fontSize={12}
                              >{`Edited on ${note?.updatedDate}`}</Typography>
                            )}
                            {note.isDeleted && (
                              <Typography
                                fontSize={12}
                                sx={{ color: "error.main" }}
                              >{`Deleted on ${note?.updatedDate}`}</Typography>
                            )}
                          </Box>
                          <Typography fontSize={12}>
                            {note?.creationDate}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <CardActions>
                          {!note.isDeleted &&
                            isSameNoteCreator(note.user.id) &&
                            hasEditNotePermission && (
                              <Tooltip title="Edit">
                                <Button
                                  onClick={(e) => editNote(note)}
                                  startIcon={<Edit height={15} width={15} />}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    minWidth: 25,
                                    padding: "10px",
                                    "& .MuiButton-startIcon": {
                                      marginRight: 0,
                                    },
                                  }}
                                />
                              </Tooltip>
                            )}
                          {!note.isDeleted &&
                            isSameNoteCreator(note.user.id) &&
                            hasDeleteNotePermission && (
                              <Tooltip title="Delete">
                                <Button
                                  onClick={(e) => deleteNote(note)}
                                  startIcon={<Trash height={15} width={15} />}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    minWidth: 25,
                                    padding: "10px",
                                    "& .MuiButton-startIcon": {
                                      marginRight: 0,
                                    },
                                  }}
                                />
                              </Tooltip>
                            )}

                          {(note.isDeleted || note.isUpdated) &&
                            hasViewDeletedNotePermission &&
                            hasViewEditedNotePermission && (
                              <Tooltip
                                title={
                                  note?.isDeleted
                                    ? "Delete history"
                                    : "Edit history"
                                }
                              >
                                <Button
                                  onClick={() => viewFeedbackHistory(note)}
                                  startIcon={<History height={15} width={15} />}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    minWidth: 25,
                                    padding: "10px",
                                    "& .MuiButton-startIcon": {
                                      marginRight: 0,
                                    },
                                  }}
                                />
                              </Tooltip>
                            )}
                        </CardActions>
                      </Box>
                    </Box>
                    <Divider />
                    {!note.isDeleted && (
                      <TextInput<IFormData>
                        label="Note"
                        disabled={note.id !== watchEditedNoteID}
                        name={`notesList[${index}].note`}
                      />
                    )}
                    {watchEditedNoteID && watchEditedNoteID === note.id && (
                      <Box textAlign="end" mt={2}>
                        <Button
                          onClick={handleCancelNoteEditing}
                          size="small"
                          variant="outlined"
                          sx={{ marginRight: 2 }}
                        >
                          <Typography>Cancel</Typography>
                        </Button>
                        <ButtonLoader
                          onClick={() => handleSaveEditedNote(note)}
                          size="small"
                          variant="contained"
                          isLoading={isButtonLoading}
                        >
                          <Typography>Save</Typography>
                        </ButtonLoader>
                      </Box>
                    )}
                  </CardContentNoPadding>
                </Card>
              );
            })
          ) : (
            <NoData description="no_notes" />
          )}
        </Box>
        <SharedDialog
          open={warningOpen}
          setOpen={setWarningOpen}
          onSuccess={handleDelete}
          textConfig={deleteNoteDialogOptions}
        />
        <RightDrawer
          open={isDrawerOpen}
          setOpen={setDrawerOpen}
          title="View Response Note History"
        >
          <NoteHistory<IFeedbackNoteHistory> list={historyList} />
        </RightDrawer>
      </FormProvider>
    </Box>
  );
};

export default TabNotesComponent;
