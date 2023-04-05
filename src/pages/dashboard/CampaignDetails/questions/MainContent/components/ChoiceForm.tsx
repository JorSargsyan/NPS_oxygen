import { Box } from "@mui/system";
import { useFieldArray, useFormContext } from "react-hook-form";
import TextInput from "shared/ui/TextInput";
import BackspaceIcon from "@heroicons/react/24/outline/BackspaceIcon";
import { Button, IconButton, Typography } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import reorderDragDrop from "shared/helpers/reorderDragDrop";
import { requiredRules } from "shared/helpers/validators";
import { setCampaignLoading } from "store/slicers/common";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";

const ChoiceForm = () => {
  const dispatch = useAsyncDispatch();
  const { reset, watch, control } = useFormContext();

  const { append, remove, fields } = useFieldArray({
    name: "answers",
    control: control,
  });

  const onAddRow = () => {
    append({ value: "", position: watch("answers").length || 0 });
  };

  const onRemoveRow = (index) => {
    remove(index);
  };

  const onDragEnd = ({ destination, source }) => {
    if (!destination || destination.index === source.index) {
      return;
    }

    const newItems = reorderDragDrop<{ value: string }>(
      watch("answers"),
      source.index,
      destination.index,
      false
    );

    reset({
      ...watch(),
      title: watch("title"),
      answers: newItems,
    });
  };

  return (
    <Box>
      <TextInput
        name="title"
        placeholder={"Type your final text here"}
        label="Title"
        rules={requiredRules}
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
                              rules={{
                                required: { value: true, message: "" },
                              }}
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
    </Box>
  );
};
export default ChoiceForm;
