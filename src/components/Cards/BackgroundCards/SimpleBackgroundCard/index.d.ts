import { FC } from 'react';

export interface SimpleBackgroundCardProps {
  image: string;
  title: string;
  description?: string;
  date?: string | null;
}

declare const SimpleBackgroundCard: FC<SimpleBackgroundCardProps>;
export default SimpleBackgroundCard;
