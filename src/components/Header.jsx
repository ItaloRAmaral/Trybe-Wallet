import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
    totalCalcExpenses = (expenses) => {
      let totalExpenses = 0;
      expenses.forEach((gasto) => {
        const a = Object.entries(gasto.exchangeRates)
          .find((currency) => currency[0] === gasto.currency);
        totalExpenses += (gasto.value * a[1].ask);
        return totalExpenses;
      });
      return totalExpenses;
    };

    render() {
      const { email, expenses } = this.props;
      console.log(expenses);
      // let totalExpenses = 0;
      // const totalCalcExpenses = expenses.forEach((gasto) => {
      //   const a = Object.entries(gasto.exchangeRates).find((currency) => {
      //     return currency[0] === gasto.currency;
      //   });
      //   console.log(a);
      //   totalExpenses += (gasto.value * a[1].ask);
      // });

      return (
        <header className="border border-2">
          <p data-testid="email-field">{email}</p>
          <p data-testid="header-currency-field">BRL</p>
          <p data-testid="total-field">{this.totalCalcExpenses(expenses).toFixed(2)}</p>
        </header>
      );
    }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps)(Header);
