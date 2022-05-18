import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmailAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      const { password, email } = this.state;
      const MIN_PASSWORD = 6;
      const VALIDATE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      console.log(VALIDATE_EMAIL.test(email));

      if (password.length >= MIN_PASSWORD
      && (VALIDATE_EMAIL.test(email))
      ) return this.setState({ isDisabled: false });

      if (password.length < MIN_PASSWORD
      || !(VALIDATE_EMAIL.test(email))
      ) return this.setState({ isDisabled: true });
    });
  }

  handleLogin = () => {
    const { history, saveEmail } = this.props;
    const { email } = this.state;

    saveEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <section>
        <form>
          <h1>TrybeWallet</h1>
          <label htmlFor="name">
            Login
            <input
              type="email"
              name="email"
              id="name"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="text"
              name="password"
              id="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveEmailAction(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
