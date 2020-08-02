import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Conversor from './Componentes/Conversor';

function App() {

  return (
    <div className="App">
      <h1>Kwanza De Hoje</h1>
      <div className="linha">
        <Conversor moedaA="USD" moedaB="AOA"></Conversor>
        <Conversor moedaA="AOA" moedaB="USD"></Conversor>
      </div>
      <div className="linha">
        <Conversor moedaA="EUR" moedaB="AOA"></Conversor>
        <Conversor moedaA="AOA" moedaB="EUR"></Conversor>
      </div>
      <div className="linha">
        <Conversor moedaA="BRL" moedaB="AOA"></Conversor>
        <Conversor moedaA="AOA" moedaB="BRL"></Conversor>
      </div>
    </div>
  );
}

export default App;
