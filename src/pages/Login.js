import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/login.css';
import image from '../assets/images/teste.svg';
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
      <section className="flex justify-center justify-evenly h-screen items-center bg-[#f25f4c]">
        <img
          src={ image }
          alt="Imagem de uma mulher com cartao de credito"
          className="xl:w-[700px] lg:w-[500px]"
        />
        <form
          className="flex flex-col w-[25%] bg-[#e53170] rounded-2xl items-center p-[4rem] shadow-xl lg:p-[2rem] md:w-[50%] sm:w-[50%]"
          id="form-container"
        >
          <h1
            className="text-[#fffffe] text-5xl font-serif underline xl:text-[2.1rem] lg:text-[2rem] md:text-[2.7rem]"
            id="title"
          >
            TrybeWallet
          </h1>
          <div className="mt-9 w-[90%]">
            <label htmlFor="name" className="flex flex-col text-[#fffffe]">
              Login
              <input
                className="bg-transparent border-b-2 outline-0"
                type="email"
                name="email"
                id="name"
                value={ email }
                // placeholder="email or username"
                onChange={ this.handleChange }
                data-testid="email-input"
              />
            </label>
            <label
              htmlFor="password"
              className="flex flex-col text-[#fffffe] mt-[1.5rem]"
            >
              Password
              <input
                className="bg-transparent border-b-2 outline-0"
                type="text"
                name="password"
                id="password"
                // placeholder="your password"
                value={ password }
                onChange={ this.handleChange }
                data-testid="password-input"
              />
            </label>
            <button
              type="button"
              className="bg-[#ff8906] text-white w-full h-[2.5rem] mt-[1.5rem]"
              disabled={ isDisabled }
              style={ { opacity: isDisabled ? '0.5' : null } }
              onClick={ this.handleLogin }
            >
              Entrar
            </button>
          </div>
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
