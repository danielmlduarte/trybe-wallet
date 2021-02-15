import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      buttonState: true,
      redirect: false,
    };
    this.handleInputEvent = this.handleInputEvent.bind(this);
    this.handleButtonStatus = this.handleButtonStatus.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidUpdate() {
    this.handleButtonStatus();
  }

  handleInputEvent(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleButtonStatus() {
    const { email, password, buttonState } = this.state;
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const minPasswordLength = 6;
    if (email.match(emailRegex) && password.length >= minPasswordLength && buttonState) {
      this.setState({
        buttonState: false,
      });
    }
    if ((!email.match(emailRegex) || password.length < minPasswordLength)
    && !buttonState) {
      this.setState({
        buttonState: true,
      });
    }
  }

  handleButtonClick() {
    const { email } = this.state;
    const { login } = this.props;
    login(email);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, password, buttonState, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            id="email"
            name="email"
            type="text"
            value={ email }
            onChange={ (e) => this.handleInputEvent(e) }
          />
        </label>
        <label htmlFor="email">
          Senha:
          <input
            data-testid="password-input"
            id="password"
            name="password"
            type="password"
            value={ password }
            onChange={ (e) => this.handleInputEvent(e) }
          />
        </label>
        <button
          type="button"
          disabled={ buttonState }
          onClick={ () => this.handleButtonClick() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (event) => dispatch(userLogin(event)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
