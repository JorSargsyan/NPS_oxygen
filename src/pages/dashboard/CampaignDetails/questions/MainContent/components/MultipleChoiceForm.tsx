import { Box } from "@mui/system";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo } from "store/slicers/campaignDetail";
import BackspaceIcon from "@heroicons/react/24/outline/BackspaceIcon";
import { Button, IconButton, Typography } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ButtonLoader from "shared/ui/ButtonLoader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import reorderDragDrop from "shared/helpers/reorderDragDrop";

const defaultAnswer = {
  value: "",
  position: 0,
};

const MultipleChoiceForm = ({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) => {
  const { details } = useSelector(selectSurveyInfo);
  const methods = useForm({
    defaultValues: {
      title: "",
      answers: [defaultAnswer],
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "answers",
    control: methods.control,
  });

  const onSubmitForm = async (formData) => {
    onSubmit(formData);
  };

  const onAddRow = () => {
    append({ value: "", position: methods.watch("answers").length || 0 });
  };

  const onDragEnd = ({ destination, source }) => {
    if (!destination || destination.index === source.index) {
      return;
    }

    const newItems = reorderDragDrop<{ value: string }>(
      methods.watch("answers"),
      source.index,
      destination.index,
      false
    );

    methods.reset({
      title: methods.watch("title"),
      answers: newItems,
    });
  };

  useEffect(() => {
    if (details.answers.length) {
      methods.reset({
        title: details.title,
        answers: details.answers.map((i) => {
          return {
            value: i.value,
            position: i.position,
            id: i.id,
          };
        }),
      });
    }
  }, [details.answers, details.title, methods]);

  return (
    <Box>
      <FormProvider {...methods}>
        <TextInput
          name="title"
          placeholder={"Type your final text here"}
          label="Title"
        />
        <Box display="flex" gap={3}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Box flex={1}>
                    {fields.map((answer, index) => {
                      return (
                        <Draggable
                          key={answer.id}
                          draggableId={answer.id}
                          index={index}
                        >
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ position: "relative" }}
                              my={1}
                              display="flex"
                              alignItems={"center"}
                            >
                              <Box
                                px={2}
                                mr={1}
                                sx={{
                                  backgroundColor: "primary.main",
                                  borderRadius: "5px",
                                }}
                              >
                                <Typography color="white" fontWeight={"800"}>
                                  {index + 1}
                                </Typography>
                              </Box>
                              <TextInput
                                size="small"
                                label="Choice"
                                name={`answers[${index}].value`}
                              />
                              {fields.length > 1 && (
                                <Box
                                  onClick={() => remove(index)}
                                  sx={{ position: "absolute", right: 0 }}
                                  ml={2}
                                  display="flex"
                                  alignItems={"center"}
                                >
                                  <IconButton>
                                    <BackspaceIcon height={20} width={20} />
                                  </IconButton>
                                </Box>
                              )}
                            </Box>
                          )}
                        </Draggable>
                      );
                    })}
                  </Box>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Box flex={1} mt={"11px"}>
            <Button
              onClick={onAddRow}
              variant="outlined"
              size="small"
              startIcon={<PlusIcon height={20} />}
            >
              <Typography>Add choice</Typography>
            </Button>
          </Box>
        </Box>
        <Box
          mt={2}
          width="10%"
          p={2}
          sx={{
            zIndex: 1100,
            position: "fixed",
            bottom: 0,
            right: 0,
          }}
          display="flex"
          justifyContent={"flex-end"}
        >
          <Box>
            <ButtonLoader
              fullWidth
              onClick={methods.handleSubmit(onSubmitForm)}
              isLoading={false}
              type="submit"
            >
              <Typography>{"Save"}</Typography>
            </ButtonLoader>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};
export default MultipleChoiceForm;
