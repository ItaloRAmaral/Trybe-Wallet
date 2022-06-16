import React from 'react';
import AddForms from '../components/AddForms';
import ExpenseTable from '../components/ExpenseTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <section className="bg-[#fffffe] text-[#fffffe]">
        <Header />
        <AddForms />
        <ExpenseTable />
      </section>
    );
  }
}

export default Wallet;
