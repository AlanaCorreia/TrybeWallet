import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { cotacaoFetch } from '../actions';
import Loading from '../components/Loading';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'CAD',
      method: 'dinheiro',
      tag: 'alimentação',
    };
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
      currency: 'CAD',
      method: 'dinheiro',
      tag: 'alimentação',
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
    const { email, isLoading } = this.props;
    return (
      <div>
        { isLoading ? <Loading />
          : (
            <>
              <header>
                <h2 data-testid="email-field">{ email }</h2>
                <h3 data-testid="total-field">
                  Despesa Total:
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
                    <option value="CAD">CAD</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
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
                    <option value="dinheiro">Dinheiro</option>
                    <option value="credito">Cartão de crédito</option>
                    <option value="debito">Cartão de débito</option>
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
                    <option value="alimentação">Alimentação</option>
                    <option value="lazer">Lazer</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="transporte">Transporte</option>
                    <option value="saúde">Saúde</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={ this.handleClick }
                >
                  Adicionar despesa
                </button>
              </form>
            </>
          )}
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
  expenseFetch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  isLoading: state.wallet.loading,
});

const mapDispatchToProps = (dispatch) => ({
  expenseFetch: (expense) => dispatch(cotacaoFetch(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
