/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Benefit } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BenefitUpdateFormInputValues = {
    benefit_id?: string;
    title?: string;
    title_cat?: string;
    image?: string;
    description?: string;
    description_cat?: string;
    url?: string;
    contact?: string;
};
export declare type BenefitUpdateFormValidationValues = {
    benefit_id?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    title_cat?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    description_cat?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    contact?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BenefitUpdateFormOverridesProps = {
    BenefitUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    benefit_id?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    title_cat?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    description_cat?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    contact?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BenefitUpdateFormProps = React.PropsWithChildren<{
    overrides?: BenefitUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    benefit?: Benefit;
    onSubmit?: (fields: BenefitUpdateFormInputValues) => BenefitUpdateFormInputValues;
    onSuccess?: (fields: BenefitUpdateFormInputValues) => void;
    onError?: (fields: BenefitUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BenefitUpdateFormInputValues) => BenefitUpdateFormInputValues;
    onValidate?: BenefitUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BenefitUpdateForm(props: BenefitUpdateFormProps): React.ReactElement;
