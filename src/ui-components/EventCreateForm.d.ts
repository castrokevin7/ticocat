/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EventCreateFormInputValues = {
    event_id?: string;
    title?: string;
    description?: string;
    image?: string;
    gallery?: string[];
    date?: string;
};
export declare type EventCreateFormValidationValues = {
    event_id?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    gallery?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventCreateFormOverridesProps = {
    EventCreateFormGrid?: FormProps<GridProps>;
    event_id?: FormProps<TextFieldProps>;
    title?: FormProps<TextFieldProps>;
    description?: FormProps<TextFieldProps>;
    image?: FormProps<TextFieldProps>;
    gallery?: FormProps<TextFieldProps>;
    date?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EventCreateFormProps = React.PropsWithChildren<{
    overrides?: EventCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EventCreateFormInputValues) => EventCreateFormInputValues;
    onSuccess?: (fields: EventCreateFormInputValues) => void;
    onError?: (fields: EventCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: EventCreateFormInputValues) => EventCreateFormInputValues;
    onValidate?: EventCreateFormValidationValues;
} & React.CSSProperties>;
export default function EventCreateForm(props: EventCreateFormProps): React.ReactElement;