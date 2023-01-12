/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Associate } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function AssociateUpdateForm(props) {
  const {
    id,
    associate,
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
    name: undefined,
    birthday: undefined,
    address: undefined,
    email: undefined,
    inscription_date: undefined,
    phone: undefined,
    nationality: undefined,
    identification: undefined,
    identification_type: undefined,
    board_position: undefined,
    associate_id: undefined,
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
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...associateRecord };
    setName(cleanValues.name);
    setBirthday(cleanValues.birthday);
    setAddress(cleanValues.address);
    setEmail(cleanValues.email);
    setInscription_date(cleanValues.inscription_date);
    setPhone(cleanValues.phone);
    setNationality(cleanValues.nationality);
    setIdentification(cleanValues.identification);
    setIdentification_type(cleanValues.identification_type);
    setBoard_position(cleanValues.board_position);
    setAssociate_id(cleanValues.associate_id);
    setErrors({});
  };
  const [associateRecord, setAssociateRecord] = React.useState(associate);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Associate, id) : associate;
      setAssociateRecord(record);
    };
    queryData();
  }, [id, associate]);
  React.useEffect(resetStateValues, [associateRecord]);
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
            Associate.copyOf(associateRecord, (updated) => {
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
      {...getOverrideProps(overrides, "AssociateUpdateForm")}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        defaultValue={name}
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
        defaultValue={birthday}
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
        defaultValue={address}
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
        defaultValue={email}
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
        defaultValue={inscription_date}
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
        defaultValue={phone}
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
        defaultValue={nationality}
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
        defaultValue={identification}
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
        defaultValue={associate_id}
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
