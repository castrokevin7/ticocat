import { BadgeProps } from '@mui/material/Badge';
import { ForwardRefExoticComponent, RefAttributes, ReactNode } from 'react';

export interface MKBadgeProps extends Omit<BadgeProps, 'color'> {
  color?: string;
  variant?: string;
  size?: string;
  circular?: boolean;
  indicator?: boolean;
  border?: boolean;
  container?: boolean;
  children?: ReactNode;
}

declare const MKBadge: ForwardRefExoticComponent<MKBadgeProps & RefAttributes<HTMLSpanElement>>;
export default MKBadge;
