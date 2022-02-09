import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      disabled: true,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validationButton());
  }

  handleClick = () => {
    const { email } = this.state;
    const { getEmailDispatch } = this.props;

    getEmailDispatch(email);
    this.setState({
      redirect: true,
    });
  }

  /* Validação feita através de pesquisa nos sites:
  https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  https://medium.com/xp-inc/regex-um-guia-pratico-para-express%C3%B5es-regulares-1ac5fa4dd39f
  https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
  */

  validationButton = () => {
    const { email, senha } = this.state;
    const emailTest = /\S+@\S+\.\S+/;
    const MIN_CARACTERES = 6;
    if (senha.length >= MIN_CARACTERES && emailTest.test(email)) {
      return this.setState({
        disabled: false,
      });
    }
    return this.setState({
      disabled: true,
    });
  }

  render() {
    const { disabled, redirect } = this.state;
    return (
      <div>
        <h1>Trybewallet</h1>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            data-testid="password-input"
            name="senha"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        { redirect && <Redirect to="/carteira" /> }
      </div>
    );
  }
}

Login.propTypes = {
  getEmailDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmailDispatch: (email) => dispatch(getEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
