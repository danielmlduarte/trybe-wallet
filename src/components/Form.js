import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, totalExpenses } from '../actions';
import fetchCurrencies from '../services/api';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueInput: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputEvent({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { valueInput, description, currency, method, tag } = this.state;
    const {
      dispatchFetchCurrencies,
      dispatchAddExpense,
      dispatchTotalExpense,
      expenses,
      currencies,
    } = this.props;
    dispatchFetchCurrencies();
    const expense = {
      id: expenses.length,
      value: valueInput,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    dispatchAddExpense(expense);
    const exchangeRate = currencies[currency].ask;
    dispatchTotalExpense(valueInput * exchangeRate);
  }

  render() {
    const { valueInput, description } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <label htmlFor="valueInput">
            Valor da despesa:
            <input
              data-testid="value-input"
              id="valueInput"
              name="valueInput"
              type="number"
              value={ valueInput }
              onChange={ (e) => this.handleInputEvent(e) }
            />
          </label>
          <label htmlFor="description">
            Descrição da despesa:
            <input
              data-testid="description-input"
              id="description"
              name="description"
              type="text"
              value={ description }
              onChange={ (e) => this.handleInputEvent(e) }
            />
          </label>
          <label htmlFor="currency">
            Moeda de conversão:
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              onChange={ (e) => this.handleInputEvent(e) }
            >
              { Object.values(currencies)
                .filter(({ name }) => name !== 'Dólar Turismo')
                .map(({ code }) => (
                  <option key={ code } value={ code } data-testid={ code }>
                    { code }
                  </option>
                )) }
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method"
              onChange={ (e) => this.handleInputEvent(e) }
            >
              <option
                value="Dinheiro"
              >
                Dinheiro
              </option>
              <option
                value="Cartão de crédito"
              >
                Cartão de crédito
              </option>
              <option
                value="Cartão de débito"
              >
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              onChange={ (e) => this.handleInputEvent(e) }
            >
              <option
                value="Alimentação"
              >
                Alimentação
              </option>
              <option
                value="Lazer"
              >
                Lazer
              </option>
              <option
                value="Trabalho"
              >
                Trabalho
              </option>
              <option
                value="Transporte"
              >
                Transporte
              </option>
              <option
                value="Saúde"
              >
                Saúde
              </option>
            </select>
          </label>
          <button type="submit">
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  currencies,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddExpense: (expense) => dispatch(addExpense(expense)),
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
  dispatchTotalExpense: (totalValue) => dispatch(totalExpenses(totalValue)),
});

Form.propTypes = {
  currencies: PropTypes.shape({
    
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
  dispatchAddExpense: PropTypes.func.isRequired,
  dispatchFetchCurrencies: PropTypes.func.isRequired,
  dispatchTotalExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
