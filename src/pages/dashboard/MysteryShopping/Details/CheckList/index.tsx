import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import {
  AppearanceCheckList,
  BehaviourCheckList,
  CommunicationChecklist,
  GreetingCheckList,
  HallGatheringCheckList,
  TransactionCheckList,
  summaryChecklist,
} from "../../constants";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BasicTabs from "shared/ui/Tabs";
import BasicTextArea from "shared/ui/TextArea";

const CheckList = ({ actualUseCaseID }: { actualUseCaseID: string }) => {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const [checkedAnswers, setCheckedAnswers] = useState([]);

  const handleChange = (id, checked) => {
    let newChecked = [...checkedAnswers];
    if (checked) {
      newChecked.push(id);
    } else {
      newChecked = newChecked.filter((i) => i !== id);
    }
    setCheckedAnswers(newChecked);
  };

  const CheckListComp = ({
    data,
    nested = false,
  }: {
    data: any;
    nested?: boolean;
  }) => {
    const getList = (data) => {
      return data.map((check) => {
        const isChecked = checkedAnswers.includes(check.id);
        return (
          <Fragment key={check.id}>
            <Box>
              <FormControlLabel
                sx={{
                  paddingBottom: "10px",
                  paddingTop: "10px",
                  color: isChecked && "success.main",
                }}
                control={
                  <Checkbox
                    color="success"
                    checked={isChecked}
                    onChange={(_, checked) => handleChange(check.id, checked)}
                  />
                }
                label={check.text}
              />
              <Divider />
            </Box>
          </Fragment>
        );
      });
    };

    return (
      <Fragment>
        {nested ? (
          <Fragment>
            {Object.values(data).map((section: any) => {
              return (
                <Box key={section.title}>
                  <Box my={1} mt={2}>
                    <Typography fontWeight={"600"} fontSize={16}>
                      {section.title}
                    </Typography>
                  </Box>
                  <Box>{getList(section.list)}</Box>
                </Box>
              );
            })}
          </Fragment>
        ) : (
          getList(data)
        )}
      </Fragment>
    );
  };

  const onSubmit = () => {
    const result = checkedAnswers.filter((i) => i).length * 2;

    const formData = {
      evaluation: result,
      comment: methods.watch("comment"),
    };

    localStorage.setItem(actualUseCaseID, JSON.stringify(formData));
    toast.success("Your review has been saved successfully");
    navigate("/admin/mystery-shopping");
  };

  const tabData = [
    {
      index: 0,
      label: "Արտաքին տեսք",
      children: <CheckListComp data={AppearanceCheckList} />,
    },
    {
      index: 1,
      label: "Սրահի հավաքվածություն",
      children: <CheckListComp data={HallGatheringCheckList} />,
    },
    {
      index: 2,
      label: "Մասնագետների վարքագիծ",
      children: <CheckListComp data={BehaviourCheckList} />,
    },
    {
      index: 3,
      label: "Հաճախորդին դիմավորելը",
      children: <CheckListComp data={GreetingCheckList} />,
    },
    {
      index: 4,
      label: "Գործարքի իրականացում",
      children: <CheckListComp data={TransactionCheckList} nested />,
    },
    {
      index: 5,
      label: "Հաղորդակցում",
      children: <CheckListComp data={CommunicationChecklist} nested />,
    },
    {
      index: 6,
      label: "Ընդհանուր գոհունակություն",
      children: <CheckListComp data={summaryChecklist} />,
    },
  ];

  return (
    <Box>
      <FormProvider {...methods}>
        <Typography variant="h6" my={2} fontWeight={"600"}>
          Գնահատում
        </Typography>
        <Box maxHeight={"calc(100vh - 280px)"} overflow={"scroll"}>
          <BasicTabs scrollable centered={false} tabsData={tabData} />
        </Box>
        <Box>
          <BasicTextArea minRows={1} placeholder="Comment" name={"comment"} />
        </Box>
        <Box display="flex" pt={2} justifyContent={"flex-end"}>
          <Button onClick={methods.handleSubmit(onSubmit)} variant="outlined">
            Submit
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default CheckList;
