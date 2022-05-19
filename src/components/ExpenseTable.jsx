import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";

class ExpenseTable extends React.Component {
  render() {
    return (
      <section>
        <h1>Tabela de Gastos</h1>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </table>
      </section>
    );
  }
}

// const mapStateToProps = (state) => ({
//   currencies: state.wallet.currencies,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getAllCurrencies: () => dispatch(fetchAllCurrencies()),
//   getCurrencie: (expenses) => dispatch(fetchCurrencie(expenses)),
// });

// AddForms.propTypes = {
//   getAllCurrencies: PropTypes.func.isRequired,
//   getCurrencie: PropTypes.func.isRequired,
//   currencies: PropTypes.arrayOf.isRequired,
// };

export default connect()(ExpenseTable);
