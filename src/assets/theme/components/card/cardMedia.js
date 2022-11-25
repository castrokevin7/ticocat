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

// Otis Kit PRO Base Styles
import borders from "assets/theme/base/borders";

// Otis Kit PRO Helper Functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
    },

    media: {
      width: "auto",
    },
  },
};
