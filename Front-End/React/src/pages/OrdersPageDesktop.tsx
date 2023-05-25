import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import LocationPanel from "../components/LocationPanel";
import styles from "./OrdersPageDesktop.module.css";
const OrdersPageDesktop: FunctionComponent = () => {
  return (
    <div className={styles.ordersPageDesktop}>
      <div className={styles.findNearMe}>Find Near me</div>
      <LocationPanel />
      <div className={styles.yourCurrentLocation}>Your current location</div>
      <Button
        sx={{ width: 270 }}
        variant="outlined"
        name="Startbutton"
        color="primary"
        size="large"
        href="/FindNearMe"
      >
        Start Now
      </Button>
    </div>
  );
};

export default OrdersPageDesktop;
