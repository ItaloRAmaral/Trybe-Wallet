import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenseAction } from '../actions';

class ExpenseInfo extends React.Component {
  totalSpent = (spent) => {
    const coinValue = Object.entries(spent.exchangeRates)
      .find((currency) => currency[0] === spent.currency);
    const total = Number(spent.value * coinValue[1].ask).toFixed(2);
    return total;
  }

  getCurrencyValue = (spent) => {
    const coinValue = Object.entries(spent.exchangeRates)
      .find((currency) => currency[0] === spent.currency);

    return Number(coinValue[1].ask).toFixed(2);
  }

  getCurrencyName = (spent) => {
    const getFullName = Object.entries(spent.exchangeRates)
      .find((currency) => currency[0] === spent.currency);

    const coinName = getFullName[1].name.split('/');
    return coinName;
  }

  render() {
    const { spent, removeExpense } = this.props;

    return (
      <tbody>
        <tr>
          <td>{spent.description}</td>
          <td>{spent.tag}</td>
          <td>{spent.method}</td>
          <td>{Number(spent.value).toFixed(2)}</td>
          <td>{this.getCurrencyValue(spent)}</td>
          <td>{this.getCurrencyName(spent)}</td>
          <td>{this.totalSpent(spent)}</td>
          <td>Real</td>
          <td>
            <button
              name={ spent.id }
              type="button"
            >
              Editar
            </button>
            <button
              name={ spent.id }
              type="button"
              onClick={ () => removeExpense(spent.id) }
              data-testid="delete-btn"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAction(id)),
});

ExpenseInfo.propTypes = {
  spent: PropTypes.objectOf.isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpenseInfo);
