import React from 'react';
import Table from '../src/components/table/Table';
import logo from './logo.svg';
import './App.css';

function App() {

  const state=[
    {
      name:'Item',
      inputType: 'select'
    },
    {
      name:'Material Fee',
      inputType: 'currency'
    },  
    {
      name:'Packing Fee',
      inputType: 'currency'
    },
    {
      name:'Unpacking Fee',
      inputType: 'currency'
    }
  ]

  return (
    <Table data={state}/>
  );
}

export default App;
