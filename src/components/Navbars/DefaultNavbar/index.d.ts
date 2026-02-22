import { FC, ReactNode } from 'react';

export interface DefaultNavbarProps {
  routes?: any[];
  center?: boolean;
  sticky?: boolean;
  brand?: string;
  action?: {
    route?: string;
    color?: string;
    icon?: string;
    variant?: string;
    size?: string;
    minimal?: boolean;
    [key: string]: any;
  };
  children?: ReactNode;
}

declare const DefaultNavbar: FC<DefaultNavbarProps>;
export default DefaultNavbar;
