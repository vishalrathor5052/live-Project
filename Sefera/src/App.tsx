import React from 'react';
import './index.scss';
import LandingPage from "./Screens/LandingPage/LandingPage";
import Layout from "./Components/HOC/Layout";



const LandingLayout = Layout(LandingPage)
function App() {
  return (
    <div className='app'>
   <LandingLayout />
   </div>

  );
}

export default App;
