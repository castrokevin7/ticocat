/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Event } from "../models";
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
export default function EventCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    title_cat: undefined,
    image: undefined,
    gallery: [],
    date: undefined,
    contact: undefined,
    location_url: undefined,
    description: undefined,
    description_cat: undefined,
    time: undefined,
  };
  const [event_id, setEvent_id] = React.useState(initialValues.event_id);
  const [title, setTitle] = React.useState(initialValues.title);
  const [title_cat, setTitle_cat] = React.useState(initialValues.title_cat);
  const [image, setImage] = React.useState(initialValues.image);
  const [gallery, setGallery] = React.useState(initialValues.gallery);
  const [date, setDate] = React.useState(initialValues.date);
  const [contact, setContact] = React.useState(initialValues.contact);
  const [location_url, setLocation_url] = React.useState(
    initialValues.location_url
  );
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [description_cat, setDescription_cat] = React.useState(
    initialValues.description_cat
  );
  const [time, setTime] = React.useState(initialValues.time);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEvent_id(initialValues.event_id);
    setTitle(initialValues.title);
    setTitle_cat(initialValues.title_cat);
    setImage(initialValues.image);
    setGallery(initialValues.gallery);
    setCurrentGalleryValue(undefined);
    setDate(initialValues.date);
    setContact(initialValues.contact);
    setLocation_url(initialValues.location_url);
    setDescription(initialValues.description);
    setDescription_cat(initialValues.description_cat);
    setTime(initialValues.time);
    setErrors({});
  };
  const [currentGalleryValue, setCurrentGalleryValue] =
    React.useState(undefined);
  const galleryRef = React.createRef();
  const validations = {
    event_id: [],
    title: [],
    title_cat: [],
    image: [],
    gallery: [],
    date: [],
    contact: [],
    location_url: [{ type: "URL" }],
    description: [],
    description_cat: [],
    time: [],
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
          title_cat,
          image,
          gallery,
          date,
          contact,
          location_url: location_url || undefined,
          description,
          description_cat,
          time,
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
          await DataStore.save(new Event(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "EventCreateForm")}
    >
      <TextField
        label="Event id"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id: value,
              title,
              title_cat,
              image,
              gallery,
              date,
              contact,
              location_url,
              description,
              description_cat,
              time,
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
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title: value,
              title_cat,
              image,
              gallery,
              date,
              contact,
              location_url,
              description,
              description_cat,
              time,
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
        label="Title cat"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              title_cat: value,
              image,
              gallery,
              date,
              contact,
              location_url,
              description,
              description_cat,
              time,
            };
            const result = onChange(modelFields);
            value = result?.title_cat ?? value;
          }
          if (errors.title_cat?.hasError) {
            runValidationTasks("title_cat", value);
          }
          setTitle_cat(value);
        }}
        onBlur={() => runValidationTasks("title_cat", title_cat)}
        errorMessage={errors.title_cat?.errorMessage}
        hasError={errors.title_cat?.hasError}
        {...getOverrideProps(overrides, "title_cat")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              title_cat,
              image: value,
              gallery,
              date,
              contact,
              location_url,
              description,
              description_cat,
              time,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              title_cat,
              image,
              gallery: values,
              date,
              contact,
              location_url,
              description,
              description_cat,
              time,
            };
            const result = onChange(modelFields);
            values = result?.gallery ?? values;
          }
          setGallery(values);
          setCurrentGalleryValue(undefined);
        }}
        currentFieldValue={currentGalleryValue}
        label={"Gallery"}
        items={gallery}
        hasError={errors.gallery?.hasError}
        setFieldValue={setCurrentGalleryValue}
        inputFieldRef={galleryRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Gallery"
          isRequired={false}
          isReadOnly={false}
          value={currentGalleryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.gallery?.hasError) {
              runValidationTasks("gallery", value);
            }
            setCurrentGalleryValue(value);
          }}
          onBlur={() => runValidationTasks("gallery", currentGalleryValue)}
          errorMessage={errors.gallery?.errorMessage}
          hasError={errors.gallery?.hasError}
          ref={galleryRef}
          {...getOverrideProps(overrides, "gallery")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              title_cat,
              image,
              gallery,
              date: value,
              contact,
              location_url,
              description,
              description_cat,
              time,
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
        label="Contact"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              title_cat,
              image,
              gallery,
              date,
              contact: value,
              location_url,
              description,
              description_cat,
              time,
            };
            const result = onChange(modelFields);
            value = result?.contact ?? value;
          }
          if (errors.contact?.hasError) {
            runValidationTasks("contact", value);
          }
          setContact(value);
        }}
        onBlur={() => runValidationTasks("contact", contact)}
        errorMessage={errors.contact?.errorMessage}
        hasError={errors.contact?.hasError}
        {...getOverrideProps(overrides, "contact")}
      ></TextField>
      <TextField
        label="Location url"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              title_cat,
              image,
              gallery,
              date,
              contact,
              location_url: value,
              description,
              description_cat,
              time,
            };
            const result = onChange(modelFields);
            value = result?.location_url ?? value;
          }
          if (errors.location_url?.hasError) {
            runValidationTasks("location_url", value);
          }
          setLocation_url(value);
        }}
        onBlur={() => runValidationTasks("location_url", location_url)}
        errorMessage={errors.location_url?.errorMessage}
        hasError={errors.location_url?.hasError}
        {...getOverrideProps(overrides, "location_url")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              title_cat,
              image,
              gallery,
              date,
              contact,
              location_url,
              description: value,
              description_cat,
              time,
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
        label="Description cat"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              title_cat,
              image,
              gallery,
              date,
              contact,
              location_url,
              description,
              description_cat: value,
              time,
            };
            const result = onChange(modelFields);
            value = result?.description_cat ?? value;
          }
          if (errors.description_cat?.hasError) {
            runValidationTasks("description_cat", value);
          }
          setDescription_cat(value);
        }}
        onBlur={() => runValidationTasks("description_cat", description_cat)}
        errorMessage={errors.description_cat?.errorMessage}
        hasError={errors.description_cat?.hasError}
        {...getOverrideProps(overrides, "description_cat")}
      ></TextField>
      <TextField
        label="Time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              title_cat,
              image,
              gallery,
              date,
              contact,
              location_url,
              description,
              description_cat,
              time: value,
            };
            const result = onChange(modelFields);
            value = result?.time ?? value;
          }
          if (errors.time?.hasError) {
            runValidationTasks("time", value);
          }
          setTime(value);
        }}
        onBlur={() => runValidationTasks("time", time)}
        errorMessage={errors.time?.errorMessage}
        hasError={errors.time?.hasError}
        {...getOverrideProps(overrides, "time")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ClearButton")}
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
