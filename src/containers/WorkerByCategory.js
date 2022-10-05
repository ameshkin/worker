import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  // getRecipes, original
  getTrabajamos,
  setError,
  getCategories,
  getRecipesByCategory, // get list of workers by category
} from '../actions/recipes';

import {
  getWorkerDetailAction, // get worker details
  getUserLocationAction
} from '../actions/workers';

class RecipeListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    location: PropTypes.shape({}), //not required but
    recipes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    fetchRecipes: PropTypes.func.isRequired,
    fetchMeals: PropTypes.func.isRequired,
    fetchWorkerDetailAction: PropTypes.func.isRequired,
    fetchUserLocationAction: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
  }

  /*
  static defaultProps = {
    match: null,
  }
  */


  // componentDidMount = () => this.fetchRecipesByCategory();
  componentDidMount = () => this.fetchRecipes();

  /**
   * Fetch Data from API, saving to Redux
   */
  fetchRecipes = () => {
    // console.log("fetchRecipes: ",this.props.match);
    const { fetchRecipes, fetchMeals, showError } = this.props;
    return fetchRecipes()
      //.then(() => fetchMeals())
      .catch((err) => {
        console.log(`Error line 49:`);
        console.log(err);
        return showError(err);
      });
  }

  /**
   * Fetch Data from API, saving to Redux
   * FETCH BY CATEGORY
   * TODO: not working,
   * // Reference.child failed: First argument was an invalid path = "null". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"
   */

  fetchRecipesByCategory = ( category ) => {

    console.log("fetchRecipesByCategory RUNNING CATEGORY: " + category);


    return null;
    /*
    console.log("category: " + category);

    console.log("fetchRecipesByCategory: ",this.props.match);

    console.log("blah blah : ",this.props.match.params.categories);


    // const cat = (this.props.match && this.props.match.params && this.props.match.params.category) ? this.props.match.params.category : null;

    // console.log("fetchRecipesByCategory cat: " + cat);

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


  /**
   * Fetch Data from API, saving to Redux
   * FETCH BY CATEGORY
   * TODO: for getting details about the worker
   * // Reference.child failed: First argument was an invalid path = "null". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"
   */
  fetchWorkerDetailAction = ( category ) => {
    console.log("category: " + category);

    console.log("fetchWorkerDetailAction: ",this.props.match);

    console.log("blah blah : ",this.props.match.params.categories);


    // const cat = (this.props.match && this.props.match.params && this.props.match.params.category) ? this.props.match.params.category : null;



    console.log("fetchWorkerDetailAction cat: " + category);

    const { fetchWorkerDetailAction, showError } = this.props;
    return fetchWorkerDetailAction( category )
    // .then(() => fetchMeals()) //not needed
      .catch((err) => {
        console.log(`Error line 105:`);
        console.log(err);
        return showError(err);
      });
  }

  render = () => {
    const { Layout, recipes, match } = this.props;
    const id  = (match && match.params && match.params.id) ? match.params.id : null;
    // const cat = (match && match.params && match.params.category) ? match.params.category : null;
    const catLabel = (match && match.params && match.params.categoryLabel) ? match.params.categoryLabel : null;
    const catSlug = (match && match.params && match.params.categorySlug) ? match.params.categorySlug : null;

    // console.log("match.params: " , match.params);
    // console.log("containers/catLabel: " + catLabel);
    // console.log("containers/WorkerByCategory catSlug: " + catSlug);



    /*

    console.log("match.params: ", match);
    */


    // console.log("recipes: ", recipes);

    return (
      <Layout
        // recipeId={id}
        // catId={ cat }
        catLabel={ catLabel }
        catSlug={ catSlug }
        error={recipes.error}
        loading={recipes.loading}
        // recipes={recipes.recipes}
        //reFetch={() => this.fetchRecipes()}
        // reFetch={() => this.fetchRecipesByCategory(cat)}
      />
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes || {},
  location: state.location || {},
});



const mapDispatchToProps = {
  // fetchRecipes: getRecipes,
  fetchRecipes: getRecipesByCategory,  // Error: Actions must be plain objects. Use custom middleware for async actions.
  // fetchMeals: getTrabajamos,
  // fetchMeals: getTrabajamos,
  fetchCategories: getCategories,
  showError: setError,
  fetchWorkerDetailAction: getWorkerDetailAction,
  fetchUserLocationAction: getUserLocationAction


  // fetchRecipesByCategory: getRecipesByCategory(this.props.match.params.categories),
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListing);

/*
Error: Actions must be plain objects. Use custom middleware for async actions.

This error is located at:
    in RecipeListing (created by Connect(RecipeListing))
    in Connect(RecipeListing) (at navigationStore.js:525)
    in Wrapped (at SceneView.js:17)
    in SceneView (at CardStack.js:466)
    in RCTView (at View.js:60)
    in View (at createAnimatedComponent.js:154)
    in AnimatedComponent (at Card.js:12)
    in Card (at PointerEventsContainer.js:39)
    in Container (at CardStack.js:498)
    in RCTView (at View.js:60)
    in View (at CardStack.js:414)
    in RCTView (at View.js:60)
    in View (at CardStack.js:413)
    in CardStack (at CardStackTransitioner.js:67)
    in RCTView (at View.js:60)
    in View (at Transitioner.js:142)
    in Transitioner (at CardStackTransitioner.js:19)
    in CardStackTransitioner (at StackNavigator.js:41)
    in Unknown (at createNavigator.js:13)
    in Navigator (at createNavigationContainer.js:226)
    in NavigationContainer (at SceneView.js:17)
    in SceneView (at ResourceSavingSceneView.js:55)
    in RCTView (at View.js:60)
    in View (at ResourceSavingSceneView.js:48)
    in RCTView (at View.js:60)
    in View (at ResourceSavingSceneView.js:39)
    in ResourceSavingSceneView (at TabView.js:35)
    in RCTView (at View.js:60)
    in View (at TabViewPagerPan.js:251)
    in RCTView (at View.js:60)
    in View (at createAnimatedComponent.js:154)
    in AnimatedComponent (at TabViewPagerPan.js:238)
    in TabViewPagerPan (at TabView.js:127)
    in RCTView (at View.js:60)
    in View (at TabViewAnimated.js:194)
    in TabViewAnimated (at TabView.js:192)
    in TabView (at withCachedChildNavigation.js:69)
    in withCachedChildNavigation(TabView) (at TabNavigator.js:34)
    in Unknown (at createNavigator.js:13)
    in Navigator (at createNavigationContainer.js:226)
    in NavigationContainer (at SceneView.js:17)
    in SceneView (at CardStack.js:466)
    in RCTView (at View.js:60)
    in View (at createAnimatedComponent.js:154)
    in AnimatedComponent (at Card.js:12)
    in Card (at PointerEventsContainer.js:39)
    in Container (at CardStack.js:498)
    in RCTView (at View.js:60)
    in View (at CardStack.js:414)
    in RCTView (at View.js:60)
    in View (at CardStack.js:413)
    in CardStack (at CardStackTransitioner.js:67)
    in RCTView (at View.js:60)
    in View (at Transitioner.js:142)
    in Transitioner (at CardStackTransitioner.js:19)
    in CardStackTransitioner (at StackNavigator.js:41)
    in Unknown (at createNavigator.js:13)
    in Navigator (at createNavigationContainer.js:226)
    in NavigationContainer (at SceneView.js:17)
    in SceneView (at CardStack.js:466)
    in RCTView (at View.js:60)
    in View (at createAnimatedComponent.js:154)
    in AnimatedComponent (at Card.js:12)
    in Card (at PointerEventsContainer.js:39)
    in Container (at CardStack.js:498)
    in RCTView (at View.js:60)
    in View (at CardStack.js:414)
    in RCTView (at View.js:60)
    in View (at CardStack.js:413)
    in CardStack (at CardStackTransitioner.js:67)
    in RCTView (at View.js:60)
    in View (at Transitioner.js:142)
    in Transitioner (at CardStackTransitioner.js:19)
    in CardStackTransitioner (at StackNavigator.js:41)
    in Unknown (at createNavigator.js:13)
    in Navigator (at createNavigationContainer.js:226)
    in NavigationContainer (at SceneView.js:17)
    in SceneView (at CardStack.js:466)
    in RCTView (at View.js:60)
    in View (at createAnimatedComponent.js:154)
    in AnimatedComponent (at Card.js:12)
    in Card (at PointerEventsContainer.js:39)
    in Container (at CardStack.js:498)
    in RCTView (at View.js:60)
    in View (at CardStack.js:414)
    in RCTView (at View.js:60)
    in View (at CardStack.js:413)
    in CardStack (at CardStackTransitioner.js:67)
    in RCTView (at View.js:60)
    in View (at Transitioner.js:142)
    in Transitioner (at CardStackTransitioner.js:19)
    in CardStackTransitioner (at StackNavigator.js:41)
    in Unknown (at createNavigator.js:13)
    in Navigator (at createNavigationContainer.js:226)
    in NavigationContainer (at Router.js:72)
    in App (at Router.js:93)
    in Router (at index.js:26)
    in StyleProvider (at index.js:25)
    in PersistGate (at index.js:21)
    in Provider (at index.js:20)
    in RCTView (at View.js:60)
    in View (at Root.js:13)
    in Root (at connectStyle.js:384)
    in Styled(Root) (at index.js:19)
    in App (at App.js:8)
    in App (at registerRootComponent.js:35)
    in RootErrorBoundary (at registerRootComponent.js:34)
    in ExpoRootComponent (at renderApplication.js:33)
    in RCTView (at View.js:60)
    in View (at AppContainer.js:102)
    in RCTView (at View.js:60)
    in View (at AppContainer.js:122)
    in AppContainer (at renderApplication.js:32)

dispatch
    redux.js:206:22
fetchRecipes
    WorkerByCategory.js:46:11
componentDidMount
    WorkerByCategory.js:38:28
commitLifeCycles
    ReactNativeRenderer-dev.js:10627:12
commitAllLifeCycles
    ReactNativeRenderer-dev.js:12512:10
invokeGuardedCallback
    ReactNativeRenderer-dev.js:39:15
invokeGuardedCallback
    ReactNativeRenderer-dev.js:221:34
commitRoot
    ReactNativeRenderer-dev.js:12677:10
completeRoot
    ReactNativeRenderer-dev.js:13685:46
performWorkOnRoot
    ReactNativeRenderer-dev.js:13635:23
performWork
    ReactNativeRenderer-dev.js:13545:26
performSyncWork
    ReactNativeRenderer-dev.js:13506:16
batchedUpdates
    ReactNativeRenderer-dev.js:13728:8
batchedUpdates
    ReactNativeRenderer-dev.js:2565:27
_receiveRootNodeIDEvent
    ReactNativeRenderer-dev.js:2701:17
receiveTouches
    ReactNativeRenderer-dev.js:2777:28
__callFunction
    MessageQueue.js:351:47
<unknown>
    MessageQueue.js:116:26
__guardSafe
    MessageQueue.js:314:6
callFunctionReturnFlushedQueue
    MessageQueue.js:115:17

 */
