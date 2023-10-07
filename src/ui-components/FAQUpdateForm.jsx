/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { FAQ } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function FAQUpdateForm(props) {
  const {
    id: idProp,
    fAQ,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    question: "",
    question_cat: "",
    answer: "",
    answer_cat: "",
    links: [],
  };
  const [question, setQuestion] = React.useState(initialValues.question);
  const [question_cat, setQuestion_cat] = React.useState(
    initialValues.question_cat
  );
  const [answer, setAnswer] = React.useState(initialValues.answer);
  const [answer_cat, setAnswer_cat] = React.useState(initialValues.answer_cat);
  const [links, setLinks] = React.useState(initialValues.links);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = fAQRecord
      ? { ...initialValues, ...fAQRecord }
      : initialValues;
    setQuestion(cleanValues.question);
    setQuestion_cat(cleanValues.question_cat);
    setAnswer(cleanValues.answer);
    setAnswer_cat(cleanValues.answer_cat);
    setLinks(cleanValues.links ?? []);
    setCurrentLinksValue("");
    setErrors({});
  };
  const [fAQRecord, setFAQRecord] = React.useState(fAQ);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(FAQ, idProp) : fAQ;
      setFAQRecord(record);
    };
    queryData();
  }, [idProp, fAQ]);
  React.useEffect(resetStateValues, [fAQRecord]);
  const [currentLinksValue, setCurrentLinksValue] = React.useState("");
  const linksRef = React.createRef();
  const validations = {
    question: [{ type: "Required" }],
    question_cat: [{ type: "Required" }],
    answer: [{ type: "Required" }],
    answer_cat: [{ type: "Required" }],
    links: [{ type: "URL" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          question,
          question_cat,
          answer,
          answer_cat,
          links,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            FAQ.copyOf(fAQRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "FAQUpdateForm")}
      {...rest}
    >
      <TextField
        label="Question"
        isRequired={true}
        isReadOnly={false}
        value={question}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              question: value,
              question_cat,
              answer,
              answer_cat,
              links,
            };
            const result = onChange(modelFields);
            value = result?.question ?? value;
          }
          if (errors.question?.hasError) {
            runValidationTasks("question", value);
          }
          setQuestion(value);
        }}
        onBlur={() => runValidationTasks("question", question)}
        errorMessage={errors.question?.errorMessage}
        hasError={errors.question?.hasError}
        {...getOverrideProps(overrides, "question")}
      ></TextField>
      <TextField
        label="Question cat"
        isRequired={true}
        isReadOnly={false}
        value={question_cat}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              question,
              question_cat: value,
              answer,
              answer_cat,
              links,
            };
            const result = onChange(modelFields);
            value = result?.question_cat ?? value;
          }
          if (errors.question_cat?.hasError) {
            runValidationTasks("question_cat", value);
          }
          setQuestion_cat(value);
        }}
        onBlur={() => runValidationTasks("question_cat", question_cat)}
        errorMessage={errors.question_cat?.errorMessage}
        hasError={errors.question_cat?.hasError}
        {...getOverrideProps(overrides, "question_cat")}
      ></TextField>
      <TextField
        label="Answer"
        isRequired={true}
        isReadOnly={false}
        value={answer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              question,
              question_cat,
              answer: value,
              answer_cat,
              links,
            };
            const result = onChange(modelFields);
            value = result?.answer ?? value;
          }
          if (errors.answer?.hasError) {
            runValidationTasks("answer", value);
          }
          setAnswer(value);
        }}
        onBlur={() => runValidationTasks("answer", answer)}
        errorMessage={errors.answer?.errorMessage}
        hasError={errors.answer?.hasError}
        {...getOverrideProps(overrides, "answer")}
      ></TextField>
      <TextField
        label="Answer cat"
        isRequired={true}
        isReadOnly={false}
        value={answer_cat}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              question,
              question_cat,
              answer,
              answer_cat: value,
              links,
            };
            const result = onChange(modelFields);
            value = result?.answer_cat ?? value;
          }
          if (errors.answer_cat?.hasError) {
            runValidationTasks("answer_cat", value);
          }
          setAnswer_cat(value);
        }}
        onBlur={() => runValidationTasks("answer_cat", answer_cat)}
        errorMessage={errors.answer_cat?.errorMessage}
        hasError={errors.answer_cat?.hasError}
        {...getOverrideProps(overrides, "answer_cat")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              question,
              question_cat,
              answer,
              answer_cat,
              links: values,
            };
            const result = onChange(modelFields);
            values = result?.links ?? values;
          }
          setLinks(values);
          setCurrentLinksValue("");
        }}
        currentFieldValue={currentLinksValue}
        label={"Links"}
        items={links}
        hasError={errors.links?.hasError}
        setFieldValue={setCurrentLinksValue}
        inputFieldRef={linksRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Links"
          isRequired={false}
          isReadOnly={false}
          value={currentLinksValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.links?.hasError) {
              runValidationTasks("links", value);
            }
            setCurrentLinksValue(value);
          }}
          onBlur={() => runValidationTasks("links", currentLinksValue)}
          errorMessage={errors.links?.errorMessage}
          hasError={errors.links?.hasError}
          ref={linksRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "links")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || fAQ)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || fAQ) || Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
