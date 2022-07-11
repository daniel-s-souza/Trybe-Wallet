import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../actions';

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
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.validate();
    });
  }

  validate = () => {
    const { email, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const SIX = 6;

    const validation = [password.length >= SIX && emailRegex.test(email)];

    this.setState({
      isDisabled: !validation.every((element) => element === true),
    });
  }

  handleClick = () => {
    const { dispatchUserEmail, history } = this.props;
    const { email } = this.state;

    history.push('/carteira');

    dispatchUserEmail(email);
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form>
        <input
          name="email"
          value={ email }
          onChange={ this.handleChange }
          type="text"
          placeholder="e-mail"
          data-testid="email-input"
        />
        <input
          type="password"
          value={ password }
          name="password"
          onChange={ this.handleChange }
          placeholder="senha:"
          data-testid="password-input"
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatchUserEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchUserEmail: (email) => dispatch(userEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
