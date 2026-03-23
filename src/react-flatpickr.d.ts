declare module 'react-flatpickr' {
  import { Component } from 'react';

  interface FlatpickrProps {
    defaultValue?: string;
    options?: Record<string, any>;
    onChange?: (dates: Date[], dateStr: string) => void;
    value?: Date | string | Date[];
    render?: (props: { defaultValue?: string }, ref: React.Ref<HTMLInputElement>) => React.ReactNode;
    [key: string]: any;
  }

  export default class Flatpickr extends Component<FlatpickrProps> {}
}
