/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Associate } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AssociateUpdateFormInputValues = {
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
export declare type AssociateUpdateFormValidationValues = {
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
export declare type AssociateUpdateFormOverridesProps = {
    AssociateUpdateFormGrid?: FormProps<GridProps>;
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
export declare type AssociateUpdateFormProps = React.PropsWithChildren<{
    overrides?: AssociateUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    associate?: Associate;
    onSubmit?: (fields: AssociateUpdateFormInputValues) => AssociateUpdateFormInputValues;
    onSuccess?: (fields: AssociateUpdateFormInputValues) => void;
    onError?: (fields: AssociateUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: AssociateUpdateFormInputValues) => AssociateUpdateFormInputValues;
    onValidate?: AssociateUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AssociateUpdateForm(props: AssociateUpdateFormProps): React.ReactElement;
