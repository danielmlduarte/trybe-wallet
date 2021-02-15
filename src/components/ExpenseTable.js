import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

class ExpenseTable extends Component {
  render() {
    const { expenses, dispatchRemoveExpense } = this.props;
    return (
      <table>
        <tbody>
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
          { expenses.map(({
            id,
            description,
            tag,
            method,
            value,
            currency,
            exchangeRates,
          }) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ exchangeRates[currency].name }</td>
              <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>
                { parseFloat(exchangeRates[currency].ask * parseFloat(value)).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => dispatchRemoveExpense({ id }) }
                >
                  X
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveExpense: (expenseId) => dispatch(removeExpense(expenseId)),
});

ExpenseTable.propTypes = {
  dispatchRemoveExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
