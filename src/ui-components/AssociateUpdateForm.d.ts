/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Associate } from "../models";
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
    associate_id?: string;
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
    associate_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AssociateUpdateFormOverridesProps = {
    AssociateUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
} & EscapeHatchProps;
export declare type AssociateUpdateFormProps = React.PropsWithChildren<{
    overrides?: AssociateUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    associate?: Associate;
    onSubmit?: (fields: AssociateUpdateFormInputValues) => AssociateUpdateFormInputValues;
    onSuccess?: (fields: AssociateUpdateFormInputValues) => void;
    onError?: (fields: AssociateUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AssociateUpdateFormInputValues) => AssociateUpdateFormInputValues;
    onValidate?: AssociateUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AssociateUpdateForm(props: AssociateUpdateFormProps): React.ReactElement;
