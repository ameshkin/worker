import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../actions/member';



/*
      modalVisible: false,
                    alert: 1,
                    loading: null,
                    error: 0,
                    message: "Please verify your email and then log in.",
                    type: 'success',
 */
const Login = ({
                 Layout,
                 onFormSubmit,
                 member,
                 locale,
                 isLoading,
                 infoMessage,
                 errorMessage,
                 successMessage,
  type,
  message,
  alert
               }) => (
  <Layout
    member={member}
    locale={locale}
    loading={isLoading}
    info={infoMessage}
    error={errorMessage}
    success={successMessage}
    onFormSubmit={onFormSubmit}
    message={message}
    type={type}
    alert={alert}
  />
);

Login.propTypes = {
  Layout: PropTypes.func.isRequired,
  locale: PropTypes.string,
  member: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  alert: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
};

Login.defaultProps = {
  infoMessage: null,
  locale: null,
  errorMessage: null,
  successMessage: null,
  alert: null,
  loading: null,
  error: null,
  message: null,
  type: null,
};

const mapStateToProps = state => ({
  member: state.member || {},
  locale: state.locale || null,
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
  alert: state.status.alert || null,
  loading: state.status.loading || null,
  error: state.status.error || null,
  message: state.status.message || null,
  type: state.status.type || null,
});

const mapDispatchToProps = {
  onFormSubmit: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
