/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AssociateCreateFormOverridesProps = {
    AssociateCreateFormGrid?: FormProps<GridProps>;
    name?: FormProps<TextFieldProps>;
    birthday?: FormProps<TextFieldProps>;
    address?: FormProps<TextFieldProps>;
    email?: FormProps<TextFieldProps>;
    inscription_date?: FormProps<TextFieldProps>;
    phone?: FormProps<TextFieldProps>;
    nationality?: FormProps<TextFieldProps>;
    identification?: FormProps<TextFieldProps>;
    identification_type?: FormProps<SelectFieldProps>;
    board_position?: FormProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type AssociateCreateFormProps = React.PropsWithChildren<{
    overrides?: AssociateCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AssociateCreateFormInputValues) => AssociateCreateFormInputValues;
    onSuccess?: (fields: AssociateCreateFormInputValues) => void;
    onError?: (fields: AssociateCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: AssociateCreateFormInputValues) => AssociateCreateFormInputValues;
    onValidate?: AssociateCreateFormValidationValues;
} & React.CSSProperties>;
export default function AssociateCreateForm(props: AssociateCreateFormProps): React.ReactElement;
