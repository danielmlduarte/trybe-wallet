import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
import ExpenseTable from '../components/ExpenseTable';
import fetchCurrencies from '../services/api';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    dispatchFetchCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <Form />
        <ExpenseTable />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  dispatchFetchCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
