/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Associate } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function AssociateCreateForm(props) {
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
    name: "",
    birthday: "",
    address: "",
    email: "",
    inscription_date: "",
    phone: "",
    nationality: "",
    identification: "",
    identification_type: undefined,
    board_position: undefined,
    associate_id: "",
    bio: "",
    profile_picture: "",
    is_account_activated: false,
    is_public_profile: false,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [birthday, setBirthday] = React.useState(initialValues.birthday);
  const [address, setAddress] = React.useState(initialValues.address);
  const [email, setEmail] = React.useState(initialValues.email);
  const [inscription_date, setInscription_date] = React.useState(
    initialValues.inscription_date
  );
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [nationality, setNationality] = React.useState(
    initialValues.nationality
  );
  const [identification, setIdentification] = React.useState(
    initialValues.identification
  );
  const [identification_type, setIdentification_type] = React.useState(
    initialValues.identification_type
  );
  const [board_position, setBoard_position] = React.useState(
    initialValues.board_position
  );
  const [associate_id, setAssociate_id] = React.useState(
    initialValues.associate_id
  );
  const [bio, setBio] = React.useState(initialValues.bio);
  const [profile_picture, setProfile_picture] = React.useState(
    initialValues.profile_picture
  );
  const [is_account_activated, setIs_account_activated] = React.useState(
    initialValues.is_account_activated
  );
  const [is_public_profile, setIs_public_profile] = React.useState(
    initialValues.is_public_profile
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setBirthday(initialValues.birthday);
    setAddress(initialValues.address);
    setEmail(initialValues.email);
    setInscription_date(initialValues.inscription_date);
    setPhone(initialValues.phone);
    setNationality(initialValues.nationality);
    setIdentification(initialValues.identification);
    setIdentification_type(initialValues.identification_type);
    setBoard_position(initialValues.board_position);
    setAssociate_id(initialValues.associate_id);
    setBio(initialValues.bio);
    setProfile_picture(initialValues.profile_picture);
    setIs_account_activated(initialValues.is_account_activated);
    setIs_public_profile(initialValues.is_public_profile);
    setErrors({});
  };
  const validations = {
    name: [],
    birthday: [],
    address: [],
    email: [{ type: "Email" }],
    inscription_date: [],
    phone: [{ type: "Phone" }],
    nationality: [],
    identification: [],
    identification_type: [],
    board_position: [],
    associate_id: [],
    bio: [],
    profile_picture: [],
    is_account_activated: [],
    is_public_profile: [],
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
          name,
          birthday,
          address,
          email,
          inscription_date,
          phone,
          nationality,
          identification,
          identification_type,
          board_position,
          associate_id,
          bio,
          profile_picture,
          is_account_activated,
          is_public_profile,
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
          await DataStore.save(new Associate(modelFields));
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
      {...getOverrideProps(overrides, "AssociateCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              birthday,
              address,
              email,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Birthday"
        isRequired={false}
        isReadOnly={false}
        value={birthday}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              birthday: value,
              address,
              email,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.birthday ?? value;
          }
          if (errors.birthday?.hasError) {
            runValidationTasks("birthday", value);
          }
          setBirthday(value);
        }}
        onBlur={() => runValidationTasks("birthday", birthday)}
        errorMessage={errors.birthday?.errorMessage}
        hasError={errors.birthday?.hasError}
        {...getOverrideProps(overrides, "birthday")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address: value,
              email,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
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
              name,
              birthday,
              address,
              email: value,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
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
        label="Inscription date"
        isRequired={false}
        isReadOnly={false}
        value={inscription_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address,
              email,
              inscription_date: value,
              phone,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.inscription_date ?? value;
          }
          if (errors.inscription_date?.hasError) {
            runValidationTasks("inscription_date", value);
          }
          setInscription_date(value);
        }}
        onBlur={() => runValidationTasks("inscription_date", inscription_date)}
        errorMessage={errors.inscription_date?.errorMessage}
        hasError={errors.inscription_date?.hasError}
        {...getOverrideProps(overrides, "inscription_date")}
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
              name,
              birthday,
              address,
              email,
              inscription_date,
              phone: value,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
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
        label="Nationality"
        isRequired={false}
        isReadOnly={false}
        value={nationality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address,
              email,
              inscription_date,
              phone,
              nationality: value,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.nationality ?? value;
          }
          if (errors.nationality?.hasError) {
            runValidationTasks("nationality", value);
          }
          setNationality(value);
        }}
        onBlur={() => runValidationTasks("nationality", nationality)}
        errorMessage={errors.nationality?.errorMessage}
        hasError={errors.nationality?.hasError}
        {...getOverrideProps(overrides, "nationality")}
      ></TextField>
      <TextField
        label="Identification"
        isRequired={false}
        isReadOnly={false}
        value={identification}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address,
              email,
              inscription_date,
              phone,
              nationality,
              identification: value,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.identification ?? value;
          }
          if (errors.identification?.hasError) {
            runValidationTasks("identification", value);
          }
          setIdentification(value);
        }}
        onBlur={() => runValidationTasks("identification", identification)}
        errorMessage={errors.identification?.errorMessage}
        hasError={errors.identification?.hasError}
        {...getOverrideProps(overrides, "identification")}
      ></TextField>
      <SelectField
        label="Identification type"
        placeholder="Please select an option"
        isDisabled={false}
        value={identification_type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address,
              email,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type: value,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.identification_type ?? value;
          }
          if (errors.identification_type?.hasError) {
            runValidationTasks("identification_type", value);
          }
          setIdentification_type(value);
        }}
        onBlur={() =>
          runValidationTasks("identification_type", identification_type)
        }
        errorMessage={errors.identification_type?.errorMessage}
        hasError={errors.identification_type?.hasError}
        {...getOverrideProps(overrides, "identification_type")}
      >
        <option
          children="Nie"
          value="NIE"
          {...getOverrideProps(overrides, "identification_typeoption0")}
        ></option>
        <option
          children="Dni"
          value="DNI"
          {...getOverrideProps(overrides, "identification_typeoption1")}
        ></option>
        <option
          children="Pasaporte"
          value="PASAPORTE"
          {...getOverrideProps(overrides, "identification_typeoption2")}
        ></option>
      </SelectField>
      <SelectField
        label="Board position"
        placeholder="Please select an option"
        isDisabled={false}
        value={board_position}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address,
              email,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type,
              board_position: value,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.board_position ?? value;
          }
          if (errors.board_position?.hasError) {
            runValidationTasks("board_position", value);
          }
          setBoard_position(value);
        }}
        onBlur={() => runValidationTasks("board_position", board_position)}
        errorMessage={errors.board_position?.errorMessage}
        hasError={errors.board_position?.hasError}
        {...getOverrideProps(overrides, "board_position")}
      >
        <option
          children="Presidencia"
          value="PRESIDENCIA"
          {...getOverrideProps(overrides, "board_positionoption0")}
        ></option>
        <option
          children="Vicepresidencia"
          value="VICEPRESIDENCIA"
          {...getOverrideProps(overrides, "board_positionoption1")}
        ></option>
        <option
          children="Tesoreria"
          value="TESORERIA"
          {...getOverrideProps(overrides, "board_positionoption2")}
        ></option>
        <option
          children="Secretariado"
          value="SECRETARIADO"
          {...getOverrideProps(overrides, "board_positionoption3")}
        ></option>
        <option
          children="Vocal"
          value="VOCAL"
          {...getOverrideProps(overrides, "board_positionoption4")}
        ></option>
      </SelectField>
      <TextField
        label="Associate id"
        isRequired={false}
        isReadOnly={false}
        value={associate_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address,
              email,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id: value,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile,
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
      <TextField
        label="Bio"
        isRequired={false}
        isReadOnly={false}
        value={bio}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address,
              email,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio: value,
              profile_picture,
              is_account_activated,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.bio ?? value;
          }
          if (errors.bio?.hasError) {
            runValidationTasks("bio", value);
          }
          setBio(value);
        }}
        onBlur={() => runValidationTasks("bio", bio)}
        errorMessage={errors.bio?.errorMessage}
        hasError={errors.bio?.hasError}
        {...getOverrideProps(overrides, "bio")}
      ></TextField>
      <TextField
        label="Profile picture"
        isRequired={false}
        isReadOnly={false}
        value={profile_picture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address,
              email,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture: value,
              is_account_activated,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.profile_picture ?? value;
          }
          if (errors.profile_picture?.hasError) {
            runValidationTasks("profile_picture", value);
          }
          setProfile_picture(value);
        }}
        onBlur={() => runValidationTasks("profile_picture", profile_picture)}
        errorMessage={errors.profile_picture?.errorMessage}
        hasError={errors.profile_picture?.hasError}
        {...getOverrideProps(overrides, "profile_picture")}
      ></TextField>
      <SwitchField
        label="Is account activated"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_account_activated}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address,
              email,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated: value,
              is_public_profile,
            };
            const result = onChange(modelFields);
            value = result?.is_account_activated ?? value;
          }
          if (errors.is_account_activated?.hasError) {
            runValidationTasks("is_account_activated", value);
          }
          setIs_account_activated(value);
        }}
        onBlur={() =>
          runValidationTasks("is_account_activated", is_account_activated)
        }
        errorMessage={errors.is_account_activated?.errorMessage}
        hasError={errors.is_account_activated?.hasError}
        {...getOverrideProps(overrides, "is_account_activated")}
      ></SwitchField>
      <SwitchField
        label="Is public profile"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_public_profile}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              birthday,
              address,
              email,
              inscription_date,
              phone,
              nationality,
              identification,
              identification_type,
              board_position,
              associate_id,
              bio,
              profile_picture,
              is_account_activated,
              is_public_profile: value,
            };
            const result = onChange(modelFields);
            value = result?.is_public_profile ?? value;
          }
          if (errors.is_public_profile?.hasError) {
            runValidationTasks("is_public_profile", value);
          }
          setIs_public_profile(value);
        }}
        onBlur={() =>
          runValidationTasks("is_public_profile", is_public_profile)
        }
        errorMessage={errors.is_public_profile?.errorMessage}
        hasError={errors.is_public_profile?.hasError}
        {...getOverrideProps(overrides, "is_public_profile")}
      ></SwitchField>
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
