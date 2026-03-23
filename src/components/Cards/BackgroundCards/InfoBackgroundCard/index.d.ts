import { FC } from 'react';

export interface InfoBackgroundCardProps {
  image: string;
  icon: string;
  title: string;
  label: string;
}

declare const InfoBackgroundCard: FC<InfoBackgroundCardProps>;
export default InfoBackgroundCard;
