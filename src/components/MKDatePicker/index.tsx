/**
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";

// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

// Otis Kit PRO components
import MKInput from "../MKInput";

interface MKDatePickerProps {
  input?: Record<string, any>;
  [key: string]: any;
}

function MKDatePicker({ input = {}, ...rest }: MKDatePickerProps) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }: { defaultValue?: string }, ref: React.Ref<HTMLInputElement>) => (
        <MKInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

export default MKDatePicker;
