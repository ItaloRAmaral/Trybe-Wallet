import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/addForms.css';
import { fetchAllCurrencies, fetchCurrencie, updateExpensesAction } from '../actions';

class AddForms extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      isDisabled: true,
    };
  }

  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      const { value: expense, description } = this.state;

      if (expense.length > 0
        && description.length > 0) return this.setState({ isDisabled: false });

      if (expense.length === 0
        || description.length === 0) return this.setState({ isDisabled: true });
    });
  };

  handleSubmit = () => {
    const { getCurrencie } = this.props;
    const myState = this.state;
    const { id } = this.state;
    getCurrencie(myState);

    this.setState({
      id: id + 1,
      value: '',
      description: '',
      isDisabled: true,
    });
  };

  handleEditExpense = () => {
    const { editExpenseId, actualExpenses, updateExpenses } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const editedExpense = {
      id: editExpenseId,
      value,
      description,
      currency,
      method,
      tag,
    };

    const addEditedExpense = actualExpenses.map((expense) => {
      if (editExpenseId === expense.id) {
        return {
          id: editedExpense.id,
          value: editedExpense.value,
          description: editedExpense.description,
          currency: editedExpense.currency,
          method: editedExpense.method,
          tag: editedExpense.tag,
          exchangeRates: expense.exchangeRates,
        };
      }
      return expense;
    });

    updateExpenses(addEditedExpense);

    this.setState({
      value: '',
      description: '',
      isDisabled: true,
    });
  };

  render() {
    const { currencies, editBtnForm } = this.props;
    const { value, description, tag, currency, method, isDisabled } = this.state;

    return (
      <section className="flex flex-col p-[0.5rem] text-[#e53170]">
        <h1 className="text-center text-2xl mt-1 mb-1">Cadastro Despesas</h1>
        <form className="flex gap-[3%] justify-between mt-2" id="form-expenses">
          <label htmlFor="despesa" className="flex flex-col w-[15%] text-center justify-between">
            Valor
            <input
              className="bg-transparent border-b-2 border-[#e53170] outline-0"
              type="text"
              name="value"
              value={ value }
              id="despesa"
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="moeda" className="flex flex-col w-[15%] text-center justify-between">
            Moeda
            <select
              className="bg-transparent border-b-2 border-[#e53170] outline-0"
              id="moeda"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {currencies?.map((coin, index) => (
                <option key={ index }>{coin}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method" className="flex flex-col w-[15%] text-center justify-between">
            Método de Pagamento
            <select
              className="bg-transparent border-b-2 outline-0 border-[#e53170]"
              id="method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de débito</option>
              <option>Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="category" className="flex flex-col w-[15%] text-center justify-between">
            Categoria
            <select
              className="bg-transparent border-b-2 outline-0 border-[#e53170]"
              id="category"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description" className="flex flex-col w-[15%] text-center justify-between">
            Descrição
            <input
              className="bg-transparent border-b-2 outline-0 border-[#e53170]"
              type="text"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          {editBtnForm ? (
            <button
              type="button"
              onClick={ this.handleEditExpense }
              className="bg-[#f25f4c] text-white p-2 rounded"
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ this.handleSubmit }
              disabled={ isDisabled }
              style={ { opacity: isDisabled ? '0.5' : null } }
              className="bg-[#f25f4c] text-white p-2 rounded"
            >
              Adicionar despesa
            </button>
          )}
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  actualExpenses: state.wallet.expenses,
  editBtnForm: state.wallet.editExpenseBtn,
  editExpenseId: state.wallet.editExpenseId,
  editExpenseObj: state.wallet.editExpenseObj,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCurrencies: () => dispatch(fetchAllCurrencies()),
  getCurrencie: (expenses) => dispatch(fetchCurrencie(expenses)),
  updateExpenses: (expenses) => dispatch(updateExpensesAction(expenses)),
});

AddForms.propTypes = {
  getAllCurrencies: PropTypes.func.isRequired,
  getCurrencie: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape).isRequired,
  actualExpenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  editBtnForm: PropTypes.bool.isRequired,
  editExpenseId: PropTypes.string.isRequired,
  updateExpenses: PropTypes.func.isRequired,
  // editExpenseObj: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForms);
