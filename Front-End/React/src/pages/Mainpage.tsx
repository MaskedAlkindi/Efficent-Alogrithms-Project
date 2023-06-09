import MapComponent from '../components/location'
import React from 'react';
import './Mainpage.css'; // Assuming you have a CSS file named Mainpage.css

const Mainpage: React.FC = () => {
  return (
    <div className="App">
      <MapComponent/> {/* Adjusted position prop to a tuple */}
    </div>
  );
};

export default Mainpage;
