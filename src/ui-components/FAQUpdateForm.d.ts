/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FAQ } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FAQUpdateFormInputValues = {
    question?: string;
    question_cat?: string;
    answer?: string;
    answer_cat?: string;
    links?: string[];
};
export declare type FAQUpdateFormValidationValues = {
    question?: ValidationFunction<string>;
    question_cat?: ValidationFunction<string>;
    answer?: ValidationFunction<string>;
    answer_cat?: ValidationFunction<string>;
    links?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FAQUpdateFormOverridesProps = {
    FAQUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    question?: PrimitiveOverrideProps<TextFieldProps>;
    question_cat?: PrimitiveOverrideProps<TextFieldProps>;
    answer?: PrimitiveOverrideProps<TextFieldProps>;
    answer_cat?: PrimitiveOverrideProps<TextFieldProps>;
    links?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FAQUpdateFormProps = React.PropsWithChildren<{
    overrides?: FAQUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    fAQ?: FAQ;
    onSubmit?: (fields: FAQUpdateFormInputValues) => FAQUpdateFormInputValues;
    onSuccess?: (fields: FAQUpdateFormInputValues) => void;
    onError?: (fields: FAQUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FAQUpdateFormInputValues) => FAQUpdateFormInputValues;
    onValidate?: FAQUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FAQUpdateForm(props: FAQUpdateFormProps): React.ReactElement;
