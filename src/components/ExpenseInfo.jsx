import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenseAction, editBtnFormsAction } from '../actions';
import { NotePencil, Trash } from 'phosphor-react';

class ExpenseInfo extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     editExpense: false,
  //   };
  // }

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
    return coinName[0];
  }

  handleEditForms = () => {
    const { editBtn, spent } = this.props;
    editBtn(spent.id, spent);
  }

  render() {
    const { spent, removeExpense } = this.props;
    // const { editExpense } = this.state;

    return (
      <tbody className="text-center">
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
              onClick={ this.handleEditForms }
              data-testid="edit-btn"
            >
              <NotePencil />
            </button>
            <button
              name={ spent.id }
              type="button"
              onClick={ () => removeExpense(spent.id) }
              data-testid="delete-btn"
            >
              <Trash />
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAction(id)),
  editBtn: (id, expense) => dispatch(editBtnFormsAction(id, expense)),
});

ExpenseInfo.propTypes = {
  spent: PropTypes.objectOf.isRequired,
  removeExpense: PropTypes.func.isRequired,
  editBtn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpenseInfo);
