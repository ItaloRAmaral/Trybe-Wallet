import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Cardholder } from 'phosphor-react';

class Header extends React.Component {
    totalCalcExpenses = (expenses) => {
      let totalExpenses = 0;
      expenses.forEach((gasto) => {
        const coinValue = Object.entries(gasto.exchangeRates)
          .find((currency) => currency[0] === gasto.currency);
        totalExpenses += (gasto.value * coinValue[1].ask);
        return totalExpenses;
      });
      return totalExpenses;
    };

    render() {
      const { email, expenses } = this.props;

      return (
        <header className="flex justify-between items-center p-[0.5rem] border-b-[1px] bg-[#f25f4c] border-[#fffffe] text-[white]">
          <div className="flex items-center">
            <Cardholder size={ 32 } />
            <p>TrybeWallet</p>
          </div>
          <div className="flex flex-col">
            <p data-testid="email-field">{email}</p>
            {/* <p data-testid="header-currency-field">BRL</p> */}
            <p data-testid="total-field">
              {`Despesa Total: R$ ${this.totalCalcExpenses(expenses).toFixed(
                2,
              )}`}
            </p>
          </div>
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
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
