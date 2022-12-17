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
export default function EventUpdateForm(props) {
  const {
    id,
    event,
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
    image: undefined,
    gallery: [],
    date: undefined,
    location: undefined,
    contact: undefined,
    location_url: undefined,
  };
  const [event_id, setEvent_id] = React.useState(initialValues.event_id);
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [gallery, setGallery] = React.useState(initialValues.gallery);
  const [date, setDate] = React.useState(initialValues.date);
  const [location, setLocation] = React.useState(initialValues.location);
  const [contact, setContact] = React.useState(initialValues.contact);
  const [location_url, setLocation_url] = React.useState(
    initialValues.location_url
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...eventRecord };
    setEvent_id(cleanValues.event_id);
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setImage(cleanValues.image);
    setGallery(cleanValues.gallery ?? []);
    setCurrentGalleryValue(undefined);
    setDate(cleanValues.date);
    setLocation(cleanValues.location);
    setContact(cleanValues.contact);
    setLocation_url(cleanValues.location_url);
    setErrors({});
  };
  const [eventRecord, setEventRecord] = React.useState(event);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Event, id) : event;
      setEventRecord(record);
    };
    queryData();
  }, [id, event]);
  React.useEffect(resetStateValues, [eventRecord]);
  const [currentGalleryValue, setCurrentGalleryValue] =
    React.useState(undefined);
  const galleryRef = React.createRef();
  const validations = {
    event_id: [],
    title: [],
    description: [],
    image: [],
    gallery: [],
    date: [],
    location: [],
    contact: [],
    location_url: [{ type: "URL" }],
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
          image,
          gallery,
          date,
          location,
          contact,
          location_url: location_url || undefined,
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
            Event.copyOf(eventRecord, (updated) => {
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
      {...getOverrideProps(overrides, "EventUpdateForm")}
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
              image,
              gallery,
              date,
              location,
              contact,
              location_url,
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
              image,
              gallery,
              date,
              location,
              contact,
              location_url,
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
              image,
              gallery,
              date,
              location,
              contact,
              location_url,
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
        label="Image"
        isRequired={false}
        isReadOnly={false}
        defaultValue={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              description,
              image: value,
              gallery,
              date,
              location,
              contact,
              location_url,
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
              description,
              image,
              gallery: values,
              date,
              location,
              contact,
              location_url,
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
        defaultValue={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              description,
              image,
              gallery,
              date: value,
              location,
              contact,
              location_url,
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
        label="Location"
        isRequired={false}
        isReadOnly={false}
        defaultValue={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              description,
              image,
              gallery,
              date,
              location: value,
              contact,
              location_url,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Contact"
        isRequired={false}
        isReadOnly={false}
        defaultValue={contact}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              description,
              image,
              gallery,
              date,
              location,
              contact: value,
              location_url,
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
        defaultValue={location_url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              event_id,
              title,
              description,
              image,
              gallery,
              date,
              location,
              contact,
              location_url: value,
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
