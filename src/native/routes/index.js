import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
// import { Icon } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import DefaultProps from '../constants/default';  // default props: navigation, categories
import AppConfig from '../../constants/config';

// TODO: original containe ris RecipesContainer
// import RecipesContainer from '../../containers/Recipes';
import RecipesContainer from '../../containers/WorkerByCategory';
import WorkerByCategory from '../components/pages/WorkerByCategory';

import WorkerDetailContainer from '../../containers/WorkerDetail';

// import RecipeViewComponent from '../components/pages/Recipe';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/pages/admin/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/pages/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/pages/ForgotPassword';

import LocaleContainer from '../../containers/Locale';
import LocaleComponent from '../components/pages/Locale';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/pages/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/pages/Profile';

import ProfileDetailsComponent from '../components/pages/ProfileDetails';




// import UserDashboardContainer from '../../containers/UserDashboard';
import UserDashboardComponent from '../components/pages/admin/UserDashboard';


import AboutComponent from '../components/pages/About';
import HomeComponent from '../components/pages/Home';
import HomeIntro from '../components/pages/HomeIntro';
import CategoryListing from '../components/pages/CategoryListing';

import WorkerDetail from '../components/pages/WorkerDetail';

// sign up process
import WorkerSignUp from '../components/pages/admin/WorkerSignUp' // the first worker sign up page
import WorkerSignUpLocation from '../components/pages/admin/WorkerSignUpLocation'  // set location either as a worker or a user
import WorkerSignUpLanguage from '../components/pages/admin/WorkerSignUpLanguage'  // select worker language
import WorkerSignUpSkills from '../components/pages/admin/WorkerSignUpSkills'  // select worker skills
// import WorkerSignUpComputerPrograms from '../components/pages/admin/WorkerSignUpComputerPrograms'  // select computer languages
import WorkerSignUpComputerLanguages from '../components/pages/admin/WorkerSignUpComputerLanguages'  // select worker skills
import SettingsPage from '../components/pages/admin/SettingsPage'  // Settings Page
import AdvancedSearch from '../components/pages/admin/AdvancedSearch'  // Advanced Search




import RemoveAds from '../components/pages/crypto/RemoveAds'  // select worker skills





// import HomeContainer from '../../containers/HomeListing';

// import HomeComponent from '../../web/components/Home';


/*
<Scene
  key="modal"
  direction="vertical"
  component={ModalScreen}
  title="Modal"
  hideNavBar
/>
 */

console.log("props in index: ", this.props);

const Index = (
  <Stack>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={ false }
        {...DefaultProps.tabProps}
      >

        <Stack
          key="intro"
          title={ "FIND A WORKER" }
          icon={() => <Icon name="home" size={27} color={'#177fd0'} />}
          // tabBarStyle={{top:0}}
          {...DefaultProps.defaultProps}
        >
          <Scene key="intro" component={ HomeIntro } />

          <Scene
            tabBarStyle={{top:0}}
            back
            key="recipes"
            component={ RecipesContainer }
            Layout={ WorkerByCategory }
            title="WORKERS NEAR YOU"
            {...DefaultProps.defaultProps}
          />

          <Scene
            back
            // clone
            key="workerdetail"
            title="WORKER DETAILS"
            {...DefaultProps.defaultProps}
            component={ WorkerDetailContainer }
            Layout={ WorkerDetail }
          />
        </Stack>

        <Stack
          key="profile"
          title="USER PROFILE"
          icon={() => <Icon name="user" size={27} color={'#177fd0'} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="profile" component={MemberContainer} Layout={ProfileComponent} />
          <Scene
            back
            key="signUp"
            {...DefaultProps.defaultProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />

          <Scene
            back
            key="setlocation"
            title="WORKER SIGN UP"
            {...DefaultProps.defaultProps}
            component={ SignUpContainer }
            Layout={ WorkerSignUpLocation }
          />

          <Scene
            back
            key="login"
            title="LOGIN"
            {...DefaultProps.defaultProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />

          <Scene
            back
            key="dashboarduser"
            title="USER DASHBOARD"
            {...DefaultProps.defaultProps}
            component={ MemberContainer }  // member never worked
            // component={ UserDashboardContainer } // Actions must be plain objects. Use custom middleware for async actions.
            Layout={ UserDashboardComponent }
          />

          <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            {...DefaultProps.defaultProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="locale"
            title="CHANGE LANGUAGE"
            {...DefaultProps.defaultProps}
            component={LocaleContainer}
            Layout={LocaleComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            {...DefaultProps.defaultProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
        </Stack>

        {
          // show worker details even if this user is not yet a  worker
        }
        <Stack
          back
          key="profiledetails"
          title="WORKER PROFILE"
          icon={() => <Icon name="briefcase" size={27} color={'#177fd0'} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="profiledetails" component={ MemberContainer } Layout={ ProfileDetailsComponent } />

          <Scene
            back
            key="signUp"
            {...DefaultProps.defaultProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />


          <Scene
            back
            key="workersignup"
            title=" BECOME A WORKER"
            {...DefaultProps.defaultProps}
            component={ SignUpContainer }
            Layout={ WorkerSignUp }
          />


          <Scene
            back
            key="setlanguage"
            title="WORKER SIGN UP"
            {...DefaultProps.defaultProps}
            component={ SignUpContainer }
            Layout={ WorkerSignUpLanguage }
          />

          <Scene
            back
            key="setskills"
            title="WORKER SIGN UP"
            {...DefaultProps.defaultProps}
            component={ SignUpContainer }
            Layout={ WorkerSignUpSkills }
          />

          <Scene
            back
            key="setcpuskills"
            title="WORKER SIGN UP"
            {...DefaultProps.defaultProps}
            component={ SignUpContainer }
            Layout={ WorkerSignUpComputerLanguages }
          />

        </Stack>

        <Stack
          key="about"
          title={ "HELP"}
          icon={() => <Icon name="question" size={27} color={'#177fd0'} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="about" component={ AboutComponent } />
        </Stack>

        {
          // temporary

        }
        <Stack
          key="settings"
          title={ "Settings"}
          icon={() => <Icon name="gear" size={27} color={'#177fd0'} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="settings" component={ SettingsPage } />
        </Stack>


        <Stack
          key="advancedsearch"
          title={ "Advanced Search"}
          icon={() => <Icon name="gear" size={27} color={'#d04723'} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="advancedsearch" component={ AdvancedSearch } />
        </Stack>


      </Tabs>
    </Scene>
  </Stack>
);

export default Index;

/*


        <Stack
          key="workercpulanguages"
          title={ "Computer Languages"}
          icon={() => <Icon name="question" size={27} color={'#177fd0'} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="workercpulanguages" component={ WorkerSignUpComputerLanguages } />
        </Stack>


        <Stack
          key="workersignuptest"
          title="BECOME A WORKER"
          icon={() => <Icon name="user" size={27} color={'#fff432'} />}
          {...DefaultProps.defaultProps}
        >

          <Scene
            back
            key="workersignuptest"
            {...DefaultProps.defaultProps}
            component={ SignUpContainer }
            Layout={ WorkerSignUp }
          />
        </Stack>

        <Scene
          back
          key="signUp"
          title="CREATE AN ACCOUNT"
          {...DefaultProps.defaultProps}
          component={SignUpContainer}
          Layout={SignUpComponent}
        />

        <Stack
          key="workersignuplocation"
          title="YOUR LOCATION"
          icon={() => <Icon name="map" size={27} color={'#ffffff'} />}
          {...DefaultProps.defaultProps}
        >

          <Scene
            back
            key="workersignuplocation2"
            {...DefaultProps.defaultProps}
            component={ SignUpContainer }
            Layout={ WorkerSignUpLocation }
          />
        </Stack>



// old worker detail page, recipe
  <Scene
          back
          clone
          key="recipe"
          title="RECIPE"
          {...DefaultProps.defaultProps}
          component={RecipesContainer}
          Layout={RecipeViewComponent}
        />

    <Stack
      key="workersignup"
      title=" BECOME A WORKER"
      icon={() => <Icon name="wrench" size={27} color={'#ff0000'} />}
      {...DefaultProps.defaultProps}
    >

      <Scene
        back
        key="workersignup"
        title=" BECOME A WORKER"
        {...DefaultProps.defaultProps}
        component={ SignUpContainer }
        Layout={ WorkerSignUp }
      />

      <Scene
        back
        key="workersignuplocation"
        title="YOUR LOCATION"
        {...DefaultProps.defaultProps}
        component={ SignUpContainer }
        Layout={ WorkerSignUpLocation }
      />
    </Stack>


 */



/*
      <Stack
          key="home"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="home" {...DefaultProps.icons} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="home" component={HomeComponent} />
        </Stack>


           <Stack
          key="homenew"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="home" {...DefaultProps.icons} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="homenew" component={CategoryListing} />
        </Stack>




/* TODO: if something is in tabs, then props will not work!!!!
        <Stack
          key="recipes"
          title="FIND A WORKER"
          icon={() => <Icon name="wrench" size={27} color={'#177fd0'} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
        </Stack>


              <Stack
          key="categories"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="wrench" size={27} color={'#177fd0'} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="categories" component={CategoryListing} />
        </Stack>

    <Stack
          key="home"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="home" size={27} color={'#177fd0'} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="home" component={CategoryListing} />
        </Stack>



*/


/*

        <Stack
          key="categories"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="briefcase" size={27} color={'#177fd0'} />}
          {...DefaultProps.defaultProps}
        >
          <Scene key="categories" component={ CategoryListing } />

          <Scene
            back
            key="recipes"
            component={ RecipesContainer }
            Layout={ WorkerByCategory }
            title="WORKERS NEAR YOU"
            {...DefaultProps.defaultProps}
          />

          <Scene
            back
            // clone
            key="workerdetail"
            title="WORKER DETAILS"
            {...DefaultProps.defaultProps}
            component={ WorkerDetailContainer }
            Layout={ WorkerDetail }
          />

        </Stack>

 */
