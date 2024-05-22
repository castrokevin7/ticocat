/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AssociateCreateFormInputValues = {
    name?: string;
    birthday?: string;
    address?: string;
    email?: string;
    inscription_date?: string;
    phone?: string;
    nationality?: string;
    identification?: string;
    identification_type?: string;
    board_position?: string;
    associate_id?: string;
    bio?: string;
    profile_picture?: string;
    is_account_activated?: boolean;
    is_public_profile?: boolean;
};
export declare type AssociateCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    birthday?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    inscription_date?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    nationality?: ValidationFunction<string>;
    identification?: ValidationFunction<string>;
    identification_type?: ValidationFunction<string>;
    board_position?: ValidationFunction<string>;
    associate_id?: ValidationFunction<string>;
    bio?: ValidationFunction<string>;
    profile_picture?: ValidationFunction<string>;
    is_account_activated?: ValidationFunction<boolean>;
    is_public_profile?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AssociateCreateFormOverridesProps = {
    AssociateCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    birthday?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    inscription_date?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    nationality?: PrimitiveOverrideProps<TextFieldProps>;
    identification?: PrimitiveOverrideProps<TextFieldProps>;
    identification_type?: PrimitiveOverrideProps<SelectFieldProps>;
    board_position?: PrimitiveOverrideProps<SelectFieldProps>;
    associate_id?: PrimitiveOverrideProps<TextFieldProps>;
    bio?: PrimitiveOverrideProps<TextFieldProps>;
    profile_picture?: PrimitiveOverrideProps<TextFieldProps>;
    is_account_activated?: PrimitiveOverrideProps<SwitchFieldProps>;
    is_public_profile?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type AssociateCreateFormProps = React.PropsWithChildren<{
    overrides?: AssociateCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AssociateCreateFormInputValues) => AssociateCreateFormInputValues;
    onSuccess?: (fields: AssociateCreateFormInputValues) => void;
    onError?: (fields: AssociateCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AssociateCreateFormInputValues) => AssociateCreateFormInputValues;
    onValidate?: AssociateCreateFormValidationValues;
} & React.CSSProperties>;
export default function AssociateCreateForm(props: AssociateCreateFormProps): React.ReactElement;
