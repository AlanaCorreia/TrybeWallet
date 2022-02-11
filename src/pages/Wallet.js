import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { cotacaoFetch, currencyFetch } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
    };
  }

  componentDidMount() {
    const { currenciesFetch } = this.props;
    currenciesFetch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { expenseFetch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expenseObj = { value, description, currency, method, tag };

    expenseFetch(expenseObj);

    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
    });
  }

  SumTotalExpense = () => {
    const { expenses } = this.props;
    const totalExpense = expenses.reduce((accum, expense) => {
      const { value, currency, exchangeRates } = expense;
      return accum + (Number(value) * Number(exchangeRates[currency].ask));
    }, 0);
    return totalExpense.toFixed(2);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{ email }</h2>
          <h3 data-testid="total-field">
            Despesa Total: R$
            {' '}
            { this.SumTotalExpense() }
          </h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((curr) => (
                <option
                  key={ curr }
                  data-testid={ curr }
                  value={ curr }
                >
                  {curr}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
  expenseFetch: PropTypes.func,
  currenciesFetch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  expenseFetch: (expense) => dispatch(cotacaoFetch(expense)),
  currenciesFetch: () => dispatch(currencyFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
