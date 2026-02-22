import { ButtonProps } from '@mui/material/Button';
import { ForwardRefExoticComponent, RefAttributes, ReactNode, AnchorHTMLAttributes, ElementType } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export interface MKButtonProps extends Omit<ButtonProps, 'color'>, AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: string;
  variant?: string;
  size?: string;
  circular?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
  component?: ElementType;
  sx?: SxProps<Theme>;
}

declare const MKButton: ForwardRefExoticComponent<MKButtonProps & RefAttributes<HTMLButtonElement>>;
export default MKButton;
