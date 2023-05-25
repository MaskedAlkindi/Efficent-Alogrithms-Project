import { FunctionComponent, ReactNode, useMemo } from "react";
import CSS, { Property } from "csstype";
import styles from "./LocationPanel.module.css";

type LocationPanelType = {
  /** Style props */
  rectangle1Position?: Property.Position;
  rectangle1BorderRadius?: Property.BorderRadius;
  rectangle1Top?: Property.Top;
  rectangle1Left?: Property.Left;
  children?: ReactNode;
};

const LocationPanel: FunctionComponent<LocationPanelType> = ({
  rectangle1Position,
  rectangle1BorderRadius,
  rectangle1Top,
  rectangle1Left,
  children,
}) => {
  const rectangleDivStyle: CSS.Properties = useMemo(() => {
    return {
      position: rectangle1Position,
      borderRadius: rectangle1BorderRadius,
      top: rectangle1Top,
      left: rectangle1Left,
    };
  }, [
    rectangle1Position,
    rectangle1BorderRadius,
    rectangle1Top,
    rectangle1Left,
  ]);

  return (
    <div className={styles.ordersPageDesktopChild} style={rectangleDivStyle}>
      {children}
    </div>
  );
};

export default LocationPanel;
