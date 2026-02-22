import { TypographyProps } from '@mui/material/Typography';
import { ForwardRefExoticComponent, RefAttributes, ReactNode, AnchorHTMLAttributes } from 'react';

export interface MKTypographyProps extends Omit<TypographyProps, 'color'>, AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: string;
  fontWeight?: string | boolean;
  textTransform?: string;
  verticalAlign?: string;
  textGradient?: boolean;
  opacity?: number;
  children?: ReactNode;
  component?: React.ElementType;
}

declare const MKTypography: ForwardRefExoticComponent<MKTypographyProps & RefAttributes<HTMLElement>>;
export default MKTypography;
