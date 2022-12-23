/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Event } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EventUpdateFormInputValues = {
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
export declare type EventUpdateFormValidationValues = {
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
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventUpdateFormOverridesProps = {
    EventUpdateFormGrid?: FormProps<GridProps>;
    event_id?: FormProps<TextFieldProps>;
    title?: FormProps<TextFieldProps>;
    title_cat?: FormProps<TextFieldProps>;
    image?: FormProps<TextFieldProps>;
    gallery?: FormProps<TextFieldProps>;
    date?: FormProps<TextFieldProps>;
    contact?: FormProps<TextFieldProps>;
    location_url?: FormProps<TextFieldProps>;
    description?: FormProps<TextFieldProps>;
    description_cat?: FormProps<TextFieldProps>;
    time?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EventUpdateFormProps = React.PropsWithChildren<{
    overrides?: EventUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    event?: Event;
    onSubmit?: (fields: EventUpdateFormInputValues) => EventUpdateFormInputValues;
    onSuccess?: (fields: EventUpdateFormInputValues) => void;
    onError?: (fields: EventUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: EventUpdateFormInputValues) => EventUpdateFormInputValues;
    onValidate?: EventUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EventUpdateForm(props: EventUpdateFormProps): React.ReactElement;
