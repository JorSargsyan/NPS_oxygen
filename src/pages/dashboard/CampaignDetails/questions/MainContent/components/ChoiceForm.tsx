import { Box } from "@mui/system";
import { memo, useCallback, useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo, setSurveyForm } from "store/slicers/campaignDetail";
import BackspaceIcon from "@heroicons/react/24/outline/BackspaceIcon";
import { Button, IconButton, Typography } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import reorderDragDrop from "shared/helpers/reorderDragDrop";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { requiredRules } from "shared/helpers/validators";

const defaultAnswer = {
  value: "",
  position: 0,
};

const ChoiceForm = () => {
  const dispatch = useAsyncDispatch();
  const { details } = useSelector(selectSurveyInfo);
  const methods = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      answers: [defaultAnswer],
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "answers",
    control: methods.control,
  });

  const formData = methods.watch();

  const onSubmitForm = useCallback(() => {
    console.log("submitting");
    dispatch(setSurveyForm(JSON.parse(JSON.stringify(formData))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, formData?.answers?.length, formData?.title]);

  const onAddRow = () => {
    append({ value: "", position: methods.watch("answers").length || 0 });
    dispatch(setSurveyForm(JSON.parse(JSON.stringify(formData))));
  };

  const onRemoveRow = (index) => {
    remove(index);
    dispatch(setSurveyForm(JSON.parse(JSON.stringify(formData))));
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

    dispatch(setSurveyForm(JSON.parse(JSON.stringify(methods.watch()))));
  };

  useEffect(() => {
    if (details) {
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
  }, [details, methods]);

  return (
    <Box>
      <FormProvider {...methods}>
        <TextInput
          name="title"
          placeholder={"Type your final text here"}
          label="Title"
          rules={requiredRules}
          onBlur={methods.handleSubmit(onSubmitForm)}
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
                                onBlur={methods.handleSubmit(onSubmitForm)}
                                rules={requiredRules}
                                label="Choice"
                                name={`answers[${index}].value`}
                              />
                              {fields.length > 1 && (
                                <Box
                                  onClick={() => onRemoveRow(index)}
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
      </FormProvider>
    </Box>
  );
};
export default ChoiceForm;
