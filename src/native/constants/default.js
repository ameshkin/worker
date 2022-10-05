import Colors from '../../../native-base-theme/variables/commonColor';
import theme from './theme'
import categories from '../static/category-listing'

export default {
  defaultProps: {
    navigationBarStyle: {
      backgroundColor: theme.color === "dark" ? "#101719" : "#ffffff",
    },
    titleStyle: {
      color: theme.color === "dark" ? theme.lightBgColor: "#00000",
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: theme.color === "dark" ? "#ffffff" : "#101719",
    categories
  },

  tabProps: {
    swipeEnabled: false,
    activeBackgroundColor: 'rgba(255,255,255,0.1)',
    inactiveBackgroundColor: Colors.brandPrimary,
    tabBarStyle: {
      backgroundColor: Colors.brandPrimary
    },
  },

  icons: {
    style: { color: 'white', height: 30, width: 30 },
  },
};
