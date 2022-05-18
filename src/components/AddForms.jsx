import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllCurrencies } from '../actions';

class AddForms extends React.Component {
  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <section>
        <h1>Cadastro Despesas</h1>
        <form>
          <label htmlFor="despesa">
            Valor
            <input
              type="text"
              name="despesa"
              id="despesa"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select id="currency">
              {currencies.map((currency, index) => (
                <option key={ index } value={ currency }>
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento
            <select id="method" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de débito</option>
              <option>Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria
            <select id="category" data-testid="tag-input">
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
              data-testid="description-input"
            />
          </label>
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
});

AddForms.propTypes = {
  getAllCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForms);
