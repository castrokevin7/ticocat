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

// Otis Kit PRO base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";

// Otis Kit PRO helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { grey, white } = colors;
const { borderRadius } = borders;
const { tabsBoxShadow } = boxShadows;

export default {
  styleOverrides: {
    root: {
      position: "relative",
      backgroundColor: grey[100],
      borderRadius: borderRadius.xl,
      minHeight: "unset",
      padding: pxToRem(4),
    },

    flexContainer: {
      height: "100%",
      position: "relative",
      zIndex: 10,
    },

    fixed: {
      overflow: "unset !important",
      overflowX: "unset !important",
    },

    vertical: {
      "& .MuiTabs-indicator": {
        width: "100%",
      },
    },

    indicator: {
      height: "100%",
      borderRadius: borderRadius.lg,
      backgroundColor: white.main,
      boxShadow: tabsBoxShadow.indicator,
      transition: "all 500ms ease",
    },
  },
};
