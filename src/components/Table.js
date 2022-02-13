import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';
import '../Wallet.css';

class Table extends Component {
  handleClick = ({ target }) => {
    const { deleteDispatch } = this.props;
    const expenseId = target.id;
    return deleteDispatch(expenseId);
  }

  render() {
    const { dataExpenses } = this.props;
    return (
      <table>
        <thead>
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
        <tbody>
          {dataExpenses
            .map(({ id, value, description, currency, method, tag, exchangeRates }) => {
              const currencyName = exchangeRates[currency].name.split('/')[0];
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>
                    {currencyName}
                  </td>
                  <td>
                    {Number(exchangeRates[currency].ask).toFixed(2)}
                  </td>
                  <td>
                    {(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      className="btn-delete"
                      type="button"
                      id={ id }
                      data-testid="delete-btn"
                      onClick={ this.handleClick }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dataExpenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      exchangeRates: PropTypes.objectOf(PropTypes.any),
    }),
  ),
}.isRequired;

const mapStateToProps = (state) => ({
  dataExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (expense) => dispatch(deleteExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
