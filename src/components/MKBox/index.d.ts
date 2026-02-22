import { BoxProps } from '@mui/material/Box';
import { ForwardRefExoticComponent, RefAttributes, ReactNode, InputHTMLAttributes, HTMLAttributes } from 'react';

export interface MKBoxProps extends Omit<BoxProps, 'color'>, InputHTMLAttributes<HTMLInputElement>, HTMLAttributes<HTMLElement> {
  variant?: string;
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string | number;
  shadow?: string;
  coloredShadow?: string;
  children?: ReactNode;
  component?: React.ElementType;
}

declare const MKBox: ForwardRefExoticComponent<MKBoxProps & RefAttributes<HTMLElement>>;
export default MKBox;
