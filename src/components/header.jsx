import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  calculateExpense = (expense) => {
    let total = 0;
    expense.forEach((item) => {
      const moeda = item.exchangeRates[item.currency].ask;
      console.log(moeda);
      const cambio = item.value * moeda;
      const result = cambio + total;
      total = result;
    });
    return total;
  }

  render() {
    const { email, expense } = this.props;
    console.log(email);
    return (
      <section>
        <h4 data-testid="email-field">{email}</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
        <h4 data-testid="total-field">
          {this.calculateExpense(expense).toFixed(2)}
        </h4>
      </section>

    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
