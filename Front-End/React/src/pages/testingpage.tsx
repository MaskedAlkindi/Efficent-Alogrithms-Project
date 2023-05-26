import MapComponent from '../components/location'
import React from 'react';
import './testingpage.css'; // Assuming you have a CSS file named testingpage.css

const TestingPage: React.FC = () => {
  return (
    <div className="App">
      <MapComponent/> {/* Adjusted position prop to a tuple */}
    </div>
  );
};

export default TestingPage;
