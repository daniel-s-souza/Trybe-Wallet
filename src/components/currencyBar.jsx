import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, adicionarDispesa } from '../actions';

class CurrencyBar extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchCurrenciesProp } = this.props;
    fetchCurrenciesProp();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { dispatchExpense } = this.props;
    dispatchExpense(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    }));
  }

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            onChange={ this.handleChange }
            type="text"
            name="value"
            data-testid="value-input"
            value={ value }
          />
        </label>
        <label htmlFor="code">
          Moeda:
          <select
            id="code"
            onChange={ this.handleChange }
            name="currency"
          >
            {
              currencies.map((code, index) => <option key={ index }>{ code }</option>)
            }

          </select>
        </label>
        <label htmlFor="payment">
          Método de Pagamento:
          <select
            data-testid="method-input"
            onChange={ this.handleChange }
            name="method"
            id="payment"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria:
          <select
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="tag"
            id="category"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description"
            value={ description }
            onChange={ this.handleChange }
            name="description"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProp: () => dispatch(getCurrencies()),
  dispatchExpense: (expenses) => dispatch(adicionarDispesa(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

CurrencyBar.propTypes = {
  getCurrencies: PropTypes.func,
  adicionarDispesa: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyBar);
