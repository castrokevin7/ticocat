import { TextFieldProps } from '@mui/material/TextField';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface MKInputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: string;
  error?: boolean;
  success?: boolean;
}

declare const MKInput: ForwardRefExoticComponent<MKInputProps & RefAttributes<HTMLDivElement>>;
export default MKInput;
