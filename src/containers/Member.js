import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// TODO: this is where we pass data and functions to  src/native/components/pages/Profile.js
import { logout, getMemberData, dashboarduser } from '../actions/member';

class Member extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    memberDashboarduser: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
    alert: PropTypes.bool,
    message: PropTypes.string,

  }

  componentDidMount = () => {
    const { fetchData } = this.props;
    fetchData();
  }

  render = () => {
    const { Layout, member, memberLogout, memberDashboarduser } = this.props;

    // console.log("Member.js: ", this.props);

    return <Layout
      member={ member }
      logout={ memberLogout }
      dashboarduser={ memberDashboarduser }
    />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
  memberDashboarduser: dashboarduser,
  fetchData: getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
