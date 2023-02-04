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
export declare type EventCreateFormInputValues = {
    event_id?: string;
    title?: string;
    title_cat?: string;
    image?: string;
    gallery?: string[];
    date?: string;
    contact?: string;
    location_url?: string;
    description?: string;
    description_cat?: string;
    time?: string;
};
export declare type EventCreateFormValidationValues = {
    event_id?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    title_cat?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    gallery?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    contact?: ValidationFunction<string>;
    location_url?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    description_cat?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventCreateFormOverridesProps = {
    EventCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    event_id?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    title_cat?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    gallery?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    contact?: PrimitiveOverrideProps<TextFieldProps>;
    location_url?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    description_cat?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EventCreateFormProps = React.PropsWithChildren<{
    overrides?: EventCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EventCreateFormInputValues) => EventCreateFormInputValues;
    onSuccess?: (fields: EventCreateFormInputValues) => void;
    onError?: (fields: EventCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EventCreateFormInputValues) => EventCreateFormInputValues;
    onValidate?: EventCreateFormValidationValues;
} & React.CSSProperties>;
export default function EventCreateForm(props: EventCreateFormProps): React.ReactElement;
