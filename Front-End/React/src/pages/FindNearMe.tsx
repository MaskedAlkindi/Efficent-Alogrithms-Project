import { FunctionComponent } from "react";
import LocationPanel from "../components/LocationPanel";
import NearestLocationChoice from "../components/NearestLocationChoice";
import MyMap from '../components/location';
import styles from "./FindNearMe.module.css";

const FindNearMe: FunctionComponent = () => {
  const handleClick = (src: string) => {
    console.log(`Image with src: ${src} was clicked`);
  };

  return (
    <div className={styles.findNearMe}>
      <div className={styles.findNearMe1}>Find Near me</div>
      <div className={styles.electricStations}>
        <p className={styles.electric}>{` Electric `}</p>
        <p className={styles.electric}>Stations</p>
      </div>
      <div className={styles.hotels}>Hotels</div>
      <div className={styles.foodPlaces}>
        <p className={styles.electric}>Food</p>
        <p className={styles.electric}>Places</p>
      </div>
      <div className={styles.gasStations}>
        <p className={styles.electric}>Gas</p>
        <p className={styles.electric}>Stations</p>
      </div>
      <div className={styles.hospitals}>Hospitals</div>
      <div className={styles.findNearMeChild} />
      <LocationPanel
        rectangle1Position="absolute"
        rectangle1BorderRadius="unset"
        rectangle1Top="823px"
        rectangle1Left="182px"
      >
       
      </LocationPanel>

      <NearestLocationChoice />
      <div className={styles.findNearMeItem} />
      <div className={styles.findNearMeInner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.findNearMeChild1} />
      <div className={styles.findNearMeChild2} />
      <img className={styles.brand1Icon} alt="" src="/brand-1@2x.png" onClick={() => handleClick("/brand-1@2x.png")} />
      <img
        className={styles.hospitalBuildings1Icon}
        alt=""
        src="/hospitalbuildings-1@2x.png"
        onClick={() => handleClick("/hospitalbuildings-1@2x.png")}
      />
      <img
        className={styles.gasStation1Icon}
        alt=""
        src="/gasstation-1@2x.png"
        onClick={() => handleClick("/gasstation-1@2x.png")}
      />
      <img className={styles.cutlery1Icon} alt="" src="/cutlery-1@2x.png" onClick={() => handleClick("/cutlery-1@2x.png")} />
      <img className={styles.hotel1Icon} alt="" src="/hotel-1@2x.png" onClick={() => handleClick("/hotel-1@2x.png")} />
    </div>
  );
};

export default FindNearMe;
