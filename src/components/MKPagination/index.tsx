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

import React, { forwardRef, createContext, useContext, useMemo, ReactNode } from "react";

// Otis Kit PRO components
import MKBox from "../MKBox";

// Custom styles for MKPagination
import MKPaginationItemRoot from "./MKPaginationItemRoot";

type VariantType = "gradient" | "contained";
type ColorType = "white" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
type SizeType = "small" | "medium" | "large";
type PlacementType = "left" | "right" | "center";

interface ContextType {
  variant: VariantType;
  color: ColorType;
  size: SizeType;
}

// The Pagination main context
const Context = createContext<ContextType | null>(null);

interface MKPaginationProps {
  item?: boolean;
  variant?: VariantType;
  color?: ColorType;
  size?: SizeType;
  active?: boolean;
  children: ReactNode;
  placement?: PlacementType;
  [key: string]: any;
}

const MKPagination = forwardRef<HTMLButtonElement, MKPaginationProps>(
  (
    {
      item = false,
      variant = "gradient",
      color = "info",
      size = "medium",
      active = false,
      children,
      placement = "right",
      ...rest
    },
    ref
  ) => {
    const context = item ? useContext(Context) : null;
    const paginationSize = context ? context.size : null;
    let placementValue = "flex-end";

    if (placement === "left") {
      placementValue = "flex-start";
    } else if (placement === "center") {
      placementValue = "center";
    }

    const contextValue = useMemo(() => ({ variant, color, size }), [variant, color, size]);

    const Root = MKPaginationItemRoot as any;
    return (
      <Context.Provider value={contextValue}>
        {item ? (
          <Root
            {...rest}
            ref={ref}
            variant={active ? context!.variant : "outlined"}
            color={active ? context!.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </Root>
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

export default MKPagination;
