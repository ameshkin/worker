import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setError,
  getWorkerDetailAction,
} from '../actions/workers';

const getOneWorker = ( item ) => {
  console.log("getOneWorker item: " + item);

  console.log("getOneWorker  props: ",this.props);

  // console.log("blah blah : ",this.props.match.params.categories);


  // const cat = (this.props.match && this.props.match.params && this.props.match.params.category) ? this.props.match.params.category : null;

  // console.log("getOneWorker cat: " + cat);


  return getWorkerDetailAction( item )
    // .then(() => fetchOneWorker( item )) //not needed
    .catch((err) => {
      console.log(`Error line 73:`);
      console.log(err);
      return showError(err);
    });
  /*
  const { fetchRecipesByCategory, fetchMeals, showError } = this.props;
  return fetchRecipesByCategory( cat )
  // .then(() => fetchMeals()) //not needed
    .catch((err) => {
      console.log(`Error line 73:`);
      console.log(err);
      return showError(err);
    });

    */
}

class WorkerDetailContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    fetchOneWorker: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
  }

  /*
  static defaultProps = {
    match: null,
  }
  */




  /**
   * Fetch Data from API, saving to Redux
   * FETCH BY CATEGORY
   * TODO: not working,
   * // Reference.child failed: First argument was an invalid path = "null". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"
   */
  fetchOneWorker = ( worker ) => {

    return this.props.item;

  }




  // componentDidMount = () => this.fetchRecipesByCategory();
  componentDidMount = () => this.fetchOneWorker();

  render = () => {
    const { Layout, worker, match } = this.props;

    console.log("worker: ", worker);

    console.log("worker detail this.props.item: " ,this.props.item);

    return (
      <Layout
        // recipeId={ id }
        // catId={cat}
        error={worker.error}
        loading={worker.loading}
        worker={this.props.item}
        reFetch={() => this.fetchOneWorker }
      />
    );
  }
}

const mapStateToProps = state => ({
  // recipes: state.recipes || {},
  worker: state.worker || {},
});

const mapDispatchToProps = {
  fetchOneWorker: getOneWorker,  // Error: Actions must be plain objects. Use custom middleware for async actions.
  showError: setError,
  fetchWorkerDetailAction: getWorkerDetailAction
  // fetchRecipesByCategory: getRecipesByCategory(this.props.match.params.categories),
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkerDetailContainer);
