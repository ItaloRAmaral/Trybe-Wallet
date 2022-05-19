import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllCurrencies, fetchCurrencie } from '../actions';

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
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, tag, currency, method } = this.state;

    return (
      <section>
        <h1>Cadastro Despesas</h1>
        <form>
          <label htmlFor="despesa">
            Valor
            <input
              type="text"
              name="value"
              value={ value }
              id="despesa"
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies?.map((coin, index) => (
                <option key={ index }>
                  {coin}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento
            <select
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
          <label htmlFor="category">
            Categoria
            <select
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
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <button
            type="button"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCurrencies: () => dispatch(fetchAllCurrencies()),
  getCurrencie: (expenses) => dispatch(fetchCurrencie(expenses)),
});

AddForms.propTypes = {
  getAllCurrencies: PropTypes.func.isRequired,
  getCurrencie: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForms);
