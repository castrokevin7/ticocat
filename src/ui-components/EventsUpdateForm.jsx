/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Events } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
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
}) {
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
      (currentFieldValue !== undefined ||
        currentFieldValue !== null ||
        currentFieldValue !== "") &&
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
  return (
    <React.Fragment>
      {isEditing && children}
      {!isEditing ? (
        <>
          <Text>{label}</Text>
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
                {value.toString()}
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
}
export default function EventsUpdateForm(props) {
  const {
    id,
    events,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    event_id: undefined,
    title: undefined,
    description: undefined,
    date: undefined,
    main_picture: undefined,
    pictures: [],
  };
  const [event_id, setEvent_id] = React.useState(initialValues.event_id);
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [date, setDate] = React.useState(initialValues.date);
  const [main_picture, setMain_picture] = React.useState(
    initialValues.main_picture
  );
  const [pictures, setPictures] = React.useState(initialValues.pictures);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...eventsRecord };
    setEvent_id(cleanValues.event_id);
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setDate(cleanValues.date);
    setMain_picture(cleanValues.main_picture);
    setPictures(cleanValues.pictures ?? []);
    setCurrentPicturesValue(undefined);
    setErrors({});
  };
  const [eventsRecord, setEventsRecord] = React.useState(events);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Events, id) : events;
      setEventsRecord(record);
    };
    queryData();
  }, [id, events]);
  React.useEffect(resetStateValues, [eventsRecord]);
  const [currentPicturesValue, setCurrentPicturesValue] =
    React.useState(undefined);
  const picturesRef = React.createRef();
  const validations = {
    event_id: [],
    title: [],
    description: [],
    date: [],
    main_picture: [{ type: "URL" }],
    pictures: [{ type: "URL" }],
  };
  const runValidationTasks = async (fieldName, value) => {
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
          event_id,
          title,
          description,
          date,
          main_picture: main_picture || undefined,
          pictures: pictures || undefined,
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
          await DataStore.save(
            Events.copyOf(eventsRecord, (updated) => {
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
      {...rest}
      {...getOverrideProps(overrides, "EventsUpdateForm")}
    >
      <TextField
        label="Event id"
        isRequired={false}
        isReadOnly={false}
        defaultValue={event_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id: value,
              title,
              description,
              date,
              main_picture,
              pictures,
            };
            const result = onChange(modelFields);
            value = result?.event_id ?? value;
          }
          if (errors.event_id?.hasError) {
            runValidationTasks("event_id", value);
          }
          setEvent_id(value);
        }}
        onBlur={() => runValidationTasks("event_id", event_id)}
        errorMessage={errors.event_id?.errorMessage}
        hasError={errors.event_id?.hasError}
        {...getOverrideProps(overrides, "event_id")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        defaultValue={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title: value,
              description,
              date,
              main_picture,
              pictures,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        defaultValue={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              description: value,
              date,
              main_picture,
              pictures,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        defaultValue={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              description,
              date: value,
              main_picture,
              pictures,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Main picture"
        isRequired={false}
        isReadOnly={false}
        defaultValue={main_picture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              description,
              date,
              main_picture: value,
              pictures,
            };
            const result = onChange(modelFields);
            value = result?.main_picture ?? value;
          }
          if (errors.main_picture?.hasError) {
            runValidationTasks("main_picture", value);
          }
          setMain_picture(value);
        }}
        onBlur={() => runValidationTasks("main_picture", main_picture)}
        errorMessage={errors.main_picture?.errorMessage}
        hasError={errors.main_picture?.hasError}
        {...getOverrideProps(overrides, "main_picture")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              description,
              date,
              main_picture,
              pictures: values,
            };
            const result = onChange(modelFields);
            values = result?.pictures ?? values;
          }
          setPictures(values);
          setCurrentPicturesValue(undefined);
        }}
        currentFieldValue={currentPicturesValue}
        label={"Pictures"}
        items={pictures}
        hasError={errors.pictures?.hasError}
        setFieldValue={setCurrentPicturesValue}
        inputFieldRef={picturesRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Pictures"
          isRequired={false}
          isReadOnly={false}
          value={currentPicturesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.pictures?.hasError) {
              runValidationTasks("pictures", value);
            }
            setCurrentPicturesValue(value);
          }}
          onBlur={() => runValidationTasks("pictures", currentPicturesValue)}
          errorMessage={errors.pictures?.errorMessage}
          hasError={errors.pictures?.hasError}
          ref={picturesRef}
          {...getOverrideProps(overrides, "pictures")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
