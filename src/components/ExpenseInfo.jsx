import React from 'react';
import PropTypes from 'prop-types';

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
    const { spent } = this.props;

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
          <td>Editar/Excluir</td>
        </tr>
      </tbody>
    );
  }
}

ExpenseInfo.propTypes = {
  spent: PropTypes.objectOf.isRequired,
};

export default (ExpenseInfo);
