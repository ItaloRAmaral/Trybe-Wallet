import React from 'react';
import AddForms from '../components/AddForms';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <AddForms />
      </section>
    );
  }
}

export default Wallet;
