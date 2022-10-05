import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { workersignup } from '../actions/member';

const WorkerSignUp = ({
  Layout,
  onHandleSubmit,
  member,
  locale,
  loading,
  message,
  error,
  success,
}) => (
  <Layout
    member={member}
    locale={locale}
    loading={loading}
    info={message}
    error={error}
    success={success}
    onHandleSubmit={onHandleSubmit}
  />
);

WorkerSignUp.propTypes = {
  Layout: PropTypes.func.isRequired,
  locale: PropTypes.string,
  member: PropTypes.shape({}).isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  alert: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  message: PropTypes.string,
  success: PropTypes.string,
};

WorkerSignUp.defaultProps = {
  alert: null,
  error: null,
  locale: null,
  message: null,
  success: null,
};

const mapStateToProps = state => ({
  member: state.member || {},
  locale: state.locale || null,
  loading: state.status.loading || false,
  message: state.status.message || null,
  error: state.status.error || null,
  alert: state.status.alert || null,
  success: state.status.success || null,
});

const mapDispatchToProps = {
  onHandleSubmit: workersignup,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkerSignUp);
