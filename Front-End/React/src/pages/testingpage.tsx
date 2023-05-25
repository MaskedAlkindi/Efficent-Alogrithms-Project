
import MapComponent from '../components/location'
import React from 'react';


const TestingPage: React.FC = () => {
  return (
    <div className="App">
      <MapComponent position={[51.505, -0.09]} /> {/* Adjusted position prop to a tuple */}
    </div>
  );
};

export default TestingPage;


