import React from 'react';
import Header from '../components/header';
import CurrencyBar from '../components/currencyBar';
import Table from '../components/table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <CurrencyBar />
        <Table />
      </>
    );
  }
}

export default Wallet;
