import React from 'react'
import './App.scss';
import CurrencyPopup from './components/CurrencyPopup/CurrencyPopup';

const apiUrl = 'https://www.nbp.pl/kursy/xml/LastA.xml'

function App() {
  return (
    <div className="container">
      <CurrencyPopup url={apiUrl}/>
    </div>
  );
}

export default App;
