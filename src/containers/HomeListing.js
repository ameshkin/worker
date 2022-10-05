import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getTrabajamos,
  setError,
  getCategories,
} from '../actions/categories';

class HomeListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    categories: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    fetchCategories: PropTypes.func.isRequired,
    fetchMeals: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchCategories();

  /**
   * Fetch Data from API, saving to Redux
   */
  fetchCategories = () => {
    const { fetchCategories, fetchMeals, showError } = this.props;
    return fetchCategories()
      .then(() => fetchMeals())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return showError(err);
      });
  }

  render = () => {
    const { Layout, categories, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        categoryId={id}
        error={categories.error}
        loading={categories.loading}
        categories={categories.categories}
        reFetch={() => this.fetchCategories()}
      />
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories || {},
});

const mapDispatchToProps = {
  fetchMeals: getTrabajamos,
  fetchCategories: getCategories,
  showError: setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeListing);
