/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Benefit } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function BenefitUpdateForm(props) {
  const {
    id: idProp,
    benefit,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    benefit_id: "",
    title: "",
    title_cat: "",
    image: "",
    description: "",
    description_cat: "",
    url: "",
    contact: "",
    about_provider: "",
    about_provider_cat: "",
  };
  const [benefit_id, setBenefit_id] = React.useState(initialValues.benefit_id);
  const [title, setTitle] = React.useState(initialValues.title);
  const [title_cat, setTitle_cat] = React.useState(initialValues.title_cat);
  const [image, setImage] = React.useState(initialValues.image);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [description_cat, setDescription_cat] = React.useState(
    initialValues.description_cat
  );
  const [url, setUrl] = React.useState(initialValues.url);
  const [contact, setContact] = React.useState(initialValues.contact);
  const [about_provider, setAbout_provider] = React.useState(
    initialValues.about_provider
  );
  const [about_provider_cat, setAbout_provider_cat] = React.useState(
    initialValues.about_provider_cat
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = benefitRecord
      ? { ...initialValues, ...benefitRecord }
      : initialValues;
    setBenefit_id(cleanValues.benefit_id);
    setTitle(cleanValues.title);
    setTitle_cat(cleanValues.title_cat);
    setImage(cleanValues.image);
    setDescription(cleanValues.description);
    setDescription_cat(cleanValues.description_cat);
    setUrl(cleanValues.url);
    setContact(cleanValues.contact);
    setAbout_provider(cleanValues.about_provider);
    setAbout_provider_cat(cleanValues.about_provider_cat);
    setErrors({});
  };
  const [benefitRecord, setBenefitRecord] = React.useState(benefit);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Benefit, idProp) : benefit;
      setBenefitRecord(record);
    };
    queryData();
  }, [idProp, benefit]);
  React.useEffect(resetStateValues, [benefitRecord]);
  const validations = {
    benefit_id: [],
    title: [],
    title_cat: [],
    image: [],
    description: [],
    description_cat: [],
    url: [{ type: "URL" }],
    contact: [],
    about_provider: [],
    about_provider_cat: [],
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
          benefit_id,
          title,
          title_cat,
          image,
          description,
          description_cat,
          url,
          contact,
          about_provider,
          about_provider_cat,
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
            Benefit.copyOf(benefitRecord, (updated) => {
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
      {...getOverrideProps(overrides, "BenefitUpdateForm")}
      {...rest}
    >
      <TextField
        label="Benefit id"
        isRequired={false}
        isReadOnly={false}
        value={benefit_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id: value,
              title,
              title_cat,
              image,
              description,
              description_cat,
              url,
              contact,
              about_provider,
              about_provider_cat,
            };
            const result = onChange(modelFields);
            value = result?.benefit_id ?? value;
          }
          if (errors.benefit_id?.hasError) {
            runValidationTasks("benefit_id", value);
          }
          setBenefit_id(value);
        }}
        onBlur={() => runValidationTasks("benefit_id", benefit_id)}
        errorMessage={errors.benefit_id?.errorMessage}
        hasError={errors.benefit_id?.hasError}
        {...getOverrideProps(overrides, "benefit_id")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title: value,
              title_cat,
              image,
              description,
              description_cat,
              url,
              contact,
              about_provider,
              about_provider_cat,
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
        value={title_cat}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat: value,
              image,
              description,
              description_cat,
              url,
              contact,
              about_provider,
              about_provider_cat,
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
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              image: value,
              description,
              description_cat,
              url,
              contact,
              about_provider,
              about_provider_cat,
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
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              image,
              description: value,
              description_cat,
              url,
              contact,
              about_provider,
              about_provider_cat,
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
        value={description_cat}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              image,
              description,
              description_cat: value,
              url,
              contact,
              about_provider,
              about_provider_cat,
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
        label="Url"
        isRequired={false}
        isReadOnly={false}
        value={url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              image,
              description,
              description_cat,
              url: value,
              contact,
              about_provider,
              about_provider_cat,
            };
            const result = onChange(modelFields);
            value = result?.url ?? value;
          }
          if (errors.url?.hasError) {
            runValidationTasks("url", value);
          }
          setUrl(value);
        }}
        onBlur={() => runValidationTasks("url", url)}
        errorMessage={errors.url?.errorMessage}
        hasError={errors.url?.hasError}
        {...getOverrideProps(overrides, "url")}
      ></TextField>
      <TextField
        label="Contact"
        isRequired={false}
        isReadOnly={false}
        value={contact}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              image,
              description,
              description_cat,
              url,
              contact: value,
              about_provider,
              about_provider_cat,
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
        label="About provider"
        isRequired={false}
        isReadOnly={false}
        value={about_provider}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              image,
              description,
              description_cat,
              url,
              contact,
              about_provider: value,
              about_provider_cat,
            };
            const result = onChange(modelFields);
            value = result?.about_provider ?? value;
          }
          if (errors.about_provider?.hasError) {
            runValidationTasks("about_provider", value);
          }
          setAbout_provider(value);
        }}
        onBlur={() => runValidationTasks("about_provider", about_provider)}
        errorMessage={errors.about_provider?.errorMessage}
        hasError={errors.about_provider?.hasError}
        {...getOverrideProps(overrides, "about_provider")}
      ></TextField>
      <TextField
        label="About provider cat"
        isRequired={false}
        isReadOnly={false}
        value={about_provider_cat}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              image,
              description,
              description_cat,
              url,
              contact,
              about_provider,
              about_provider_cat: value,
            };
            const result = onChange(modelFields);
            value = result?.about_provider_cat ?? value;
          }
          if (errors.about_provider_cat?.hasError) {
            runValidationTasks("about_provider_cat", value);
          }
          setAbout_provider_cat(value);
        }}
        onBlur={() =>
          runValidationTasks("about_provider_cat", about_provider_cat)
        }
        errorMessage={errors.about_provider_cat?.errorMessage}
        hasError={errors.about_provider_cat?.hasError}
        {...getOverrideProps(overrides, "about_provider_cat")}
      ></TextField>
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
          isDisabled={!(idProp || benefit)}
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
              !(idProp || benefit) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
