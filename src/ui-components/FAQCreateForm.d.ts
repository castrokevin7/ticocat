/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FAQCreateFormInputValues = {
    question?: string;
    question_cat?: string;
    answer?: string;
    answer_cat?: string;
    links?: string[];
};
export declare type FAQCreateFormValidationValues = {
    question?: ValidationFunction<string>;
    question_cat?: ValidationFunction<string>;
    answer?: ValidationFunction<string>;
    answer_cat?: ValidationFunction<string>;
    links?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FAQCreateFormOverridesProps = {
    FAQCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    question?: PrimitiveOverrideProps<TextFieldProps>;
    question_cat?: PrimitiveOverrideProps<TextFieldProps>;
    answer?: PrimitiveOverrideProps<TextFieldProps>;
    answer_cat?: PrimitiveOverrideProps<TextFieldProps>;
    links?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FAQCreateFormProps = React.PropsWithChildren<{
    overrides?: FAQCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FAQCreateFormInputValues) => FAQCreateFormInputValues;
    onSuccess?: (fields: FAQCreateFormInputValues) => void;
    onError?: (fields: FAQCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FAQCreateFormInputValues) => FAQCreateFormInputValues;
    onValidate?: FAQCreateFormValidationValues;
} & React.CSSProperties>;
export default function FAQCreateForm(props: FAQCreateFormProps): React.ReactElement;
