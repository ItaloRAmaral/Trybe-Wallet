import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseInfo from './ExpenseInfo';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <section>
        {/* <h1>Tabela de Gastos</h1> */}
        <table>
          <thead>
            <header>Tabela de Gastos</header>
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
          </thead>
          {expenses.map((spent) => <ExpenseInfo key={ spent.id } spent={ spent } />)}
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(ExpenseTable);
