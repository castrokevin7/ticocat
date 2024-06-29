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
export default function BenefitCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    description: "",
    description_cat: "",
    about_provider: "",
    about_provider_cat: "",
    image: "",
    email: "",
    phone: "",
    instagramUrl: "",
    facebookUrl: "",
    websiteUrl: "",
    associate_id: "",
  };
  const [benefit_id, setBenefit_id] = React.useState(initialValues.benefit_id);
  const [title, setTitle] = React.useState(initialValues.title);
  const [title_cat, setTitle_cat] = React.useState(initialValues.title_cat);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [description_cat, setDescription_cat] = React.useState(
    initialValues.description_cat
  );
  const [about_provider, setAbout_provider] = React.useState(
    initialValues.about_provider
  );
  const [about_provider_cat, setAbout_provider_cat] = React.useState(
    initialValues.about_provider_cat
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [instagramUrl, setInstagramUrl] = React.useState(
    initialValues.instagramUrl
  );
  const [facebookUrl, setFacebookUrl] = React.useState(
    initialValues.facebookUrl
  );
  const [websiteUrl, setWebsiteUrl] = React.useState(initialValues.websiteUrl);
  const [associate_id, setAssociate_id] = React.useState(
    initialValues.associate_id
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setBenefit_id(initialValues.benefit_id);
    setTitle(initialValues.title);
    setTitle_cat(initialValues.title_cat);
    setDescription(initialValues.description);
    setDescription_cat(initialValues.description_cat);
    setAbout_provider(initialValues.about_provider);
    setAbout_provider_cat(initialValues.about_provider_cat);
    setImage(initialValues.image);
    setEmail(initialValues.email);
    setPhone(initialValues.phone);
    setInstagramUrl(initialValues.instagramUrl);
    setFacebookUrl(initialValues.facebookUrl);
    setWebsiteUrl(initialValues.websiteUrl);
    setAssociate_id(initialValues.associate_id);
    setErrors({});
  };
  const validations = {
    benefit_id: [],
    title: [],
    title_cat: [],
    description: [],
    description_cat: [],
    about_provider: [],
    about_provider_cat: [],
    image: [],
    email: [{ type: "Email" }],
    phone: [{ type: "Phone" }],
    instagramUrl: [{ type: "URL" }],
    facebookUrl: [{ type: "URL" }],
    websiteUrl: [{ type: "URL" }],
    associate_id: [],
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
          description,
          description_cat,
          about_provider,
          about_provider_cat,
          image,
          email,
          phone,
          instagramUrl,
          facebookUrl,
          websiteUrl,
          associate_id,
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
          await DataStore.save(new Benefit(modelFields));
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
      {...getOverrideProps(overrides, "BenefitCreateForm")}
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
              description,
              description_cat,
              about_provider,
              about_provider_cat,
              image,
              email,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id,
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
              description,
              description_cat,
              about_provider,
              about_provider_cat,
              image,
              email,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id,
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
              description,
              description_cat,
              about_provider,
              about_provider_cat,
              image,
              email,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id,
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
              description: value,
              description_cat,
              about_provider,
              about_provider_cat,
              image,
              email,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id,
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
              description,
              description_cat: value,
              about_provider,
              about_provider_cat,
              image,
              email,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id,
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
              description,
              description_cat,
              about_provider: value,
              about_provider_cat,
              image,
              email,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id,
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
              description,
              description_cat,
              about_provider,
              about_provider_cat: value,
              image,
              email,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id,
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
              description,
              description_cat,
              about_provider,
              about_provider_cat,
              image: value,
              email,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id,
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
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              description,
              description_cat,
              about_provider,
              about_provider_cat,
              image,
              email: value,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        type="tel"
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              description,
              description_cat,
              about_provider,
              about_provider_cat,
              image,
              email,
              phone: value,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Instagram url"
        isRequired={false}
        isReadOnly={false}
        value={instagramUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              description,
              description_cat,
              about_provider,
              about_provider_cat,
              image,
              email,
              phone,
              instagramUrl: value,
              facebookUrl,
              websiteUrl,
              associate_id,
            };
            const result = onChange(modelFields);
            value = result?.instagramUrl ?? value;
          }
          if (errors.instagramUrl?.hasError) {
            runValidationTasks("instagramUrl", value);
          }
          setInstagramUrl(value);
        }}
        onBlur={() => runValidationTasks("instagramUrl", instagramUrl)}
        errorMessage={errors.instagramUrl?.errorMessage}
        hasError={errors.instagramUrl?.hasError}
        {...getOverrideProps(overrides, "instagramUrl")}
      ></TextField>
      <TextField
        label="Facebook url"
        isRequired={false}
        isReadOnly={false}
        value={facebookUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              description,
              description_cat,
              about_provider,
              about_provider_cat,
              image,
              email,
              phone,
              instagramUrl,
              facebookUrl: value,
              websiteUrl,
              associate_id,
            };
            const result = onChange(modelFields);
            value = result?.facebookUrl ?? value;
          }
          if (errors.facebookUrl?.hasError) {
            runValidationTasks("facebookUrl", value);
          }
          setFacebookUrl(value);
        }}
        onBlur={() => runValidationTasks("facebookUrl", facebookUrl)}
        errorMessage={errors.facebookUrl?.errorMessage}
        hasError={errors.facebookUrl?.hasError}
        {...getOverrideProps(overrides, "facebookUrl")}
      ></TextField>
      <TextField
        label="Website url"
        isRequired={false}
        isReadOnly={false}
        value={websiteUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              description,
              description_cat,
              about_provider,
              about_provider_cat,
              image,
              email,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl: value,
              associate_id,
            };
            const result = onChange(modelFields);
            value = result?.websiteUrl ?? value;
          }
          if (errors.websiteUrl?.hasError) {
            runValidationTasks("websiteUrl", value);
          }
          setWebsiteUrl(value);
        }}
        onBlur={() => runValidationTasks("websiteUrl", websiteUrl)}
        errorMessage={errors.websiteUrl?.errorMessage}
        hasError={errors.websiteUrl?.hasError}
        {...getOverrideProps(overrides, "websiteUrl")}
      ></TextField>
      <TextField
        label="Associate id"
        isRequired={false}
        isReadOnly={false}
        value={associate_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              benefit_id,
              title,
              title_cat,
              description,
              description_cat,
              about_provider,
              about_provider_cat,
              image,
              email,
              phone,
              instagramUrl,
              facebookUrl,
              websiteUrl,
              associate_id: value,
            };
            const result = onChange(modelFields);
            value = result?.associate_id ?? value;
          }
          if (errors.associate_id?.hasError) {
            runValidationTasks("associate_id", value);
          }
          setAssociate_id(value);
        }}
        onBlur={() => runValidationTasks("associate_id", associate_id)}
        errorMessage={errors.associate_id?.errorMessage}
        hasError={errors.associate_id?.hasError}
        {...getOverrideProps(overrides, "associate_id")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
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
