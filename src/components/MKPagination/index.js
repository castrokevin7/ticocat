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

import { forwardRef, createContext, useContext, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Otis Kit PRO components
import MKBox from "components/MKBox";

// Custom styles for MKPagination
import MKPaginationItemRoot from "components/MKPagination/MKPaginationItemRoot";

// The Pagination main context
const Context = createContext();

const MKPagination = forwardRef(
  ({ item, variant, color, size, active, children, placement, ...rest }, ref) => {
    const context = item ? useContext(Context) : null;
    const paginationSize = context ? context.size : null;
    let placementValue = "flex-end";

    if (placement === "left") {
      placementValue = "flex-start";
    } else if (placement === "center") {
      placementValue = "center";
    }

    const contextValue = useMemo(() => ({ variant, color, size }), []);

    return (
      <Context.Provider value={contextValue}>
        {item ? (
          <MKPaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </MKPaginationItemRoot>
        ) : (
          <MKBox
            display="flex"
            justifyContent={placementValue}
            alignItems="center"
            sx={{ listStyle: "none" }}
          >
            {children}
          </MKBox>
        )}
      </Context.Provider>
    );
  }
);

// Setting default values for the props of MKPagination
MKPagination.defaultProps = {
  item: false,
  variant: "gradient",
  color: "info",
  size: "medium",
  active: false,
  placement: "right",
};

// Typechecking props for the MKPagination
MKPagination.propTypes = {
  item: PropTypes.bool,
  variant: PropTypes.oneOf(["gradient", "contained"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(["left", "right", "center"]),
};

export default MKPagination;
