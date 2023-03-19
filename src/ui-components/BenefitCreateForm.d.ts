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
export declare type BenefitCreateFormInputValues = {
    benefit_id?: string;
    title?: string;
    title_cat?: string;
    image?: string;
    description?: string;
    description_cat?: string;
    url?: string;
    contact?: string;
    about_provider?: string;
    about_provider_cat?: string;
};
export declare type BenefitCreateFormValidationValues = {
    benefit_id?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    title_cat?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    description_cat?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    contact?: ValidationFunction<string>;
    about_provider?: ValidationFunction<string>;
    about_provider_cat?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BenefitCreateFormOverridesProps = {
    BenefitCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    benefit_id?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    title_cat?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    description_cat?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    contact?: PrimitiveOverrideProps<TextFieldProps>;
    about_provider?: PrimitiveOverrideProps<TextFieldProps>;
    about_provider_cat?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BenefitCreateFormProps = React.PropsWithChildren<{
    overrides?: BenefitCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BenefitCreateFormInputValues) => BenefitCreateFormInputValues;
    onSuccess?: (fields: BenefitCreateFormInputValues) => void;
    onError?: (fields: BenefitCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BenefitCreateFormInputValues) => BenefitCreateFormInputValues;
    onValidate?: BenefitCreateFormValidationValues;
} & React.CSSProperties>;
export default function BenefitCreateForm(props: BenefitCreateFormProps): React.ReactElement;
