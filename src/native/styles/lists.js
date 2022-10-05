import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import theme from '../constants/theme'

const listStyles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    backgroundColor: theme.color === "dark" ? "#101719" : "#ffffff",
    borderBottomColor: theme.color === "dark" ? "#272727" : "#ffffff",
    borderBottomWidth: 1,
    padding: 10,
    margin: 0,
    height: 80,
  },
  flexContainerRow: {
    flexDirection: 'row',
    width: '80%' // TODO: need to fix this but width:0 not working https://github.com/facebook/react-native/issues/1438
  },
  flexFullRow: {
    flexDirection: 'row',
    width: '100%',
    // verticalAlign: 'center'
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
    paddingLeft: 15,
  },
  flexColumnOneHalf: {
    flexDirection: 'column',
    paddingHorizontal: 5,
    width: '50%'
  },
  flexColumn10: {
    flexDirection: 'column',
    paddingHorizontal: 5,
    width: '10%'
  },
  flexColumn90: {
    flexDirection: 'column',
    paddingHorizontal: 5,
    width: '90%'
  },
  flexColumnOneThird: {
    flexDirection: 'column',
    paddingHorizontal: 5,
    width: '50%'
  },
  iconLeft: {
    width: 70,
    height: 50,
  },
  description: {
    fontSize: 14,
    color:  theme.color === "dark" ? "#858585" : "#ffffff",
    flexWrap: 'wrap',
  },
  label: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontSize: 18,
    fontWeight: 'bold',
    //fontFamily: 'Roboto'
  },
  taskDescription: {
    fontSize: 14,
    color:  theme.color === "dark" ? "#858585" : "#ffffff",
    flexWrap: 'wrap',
  },
  taskTitle: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontSize: 18,
    fontWeight: 'bold',
    //fontFamily: 'Roboto'
  },
  workerContainerRow: {
    backgroundColor: theme.color === "dark" ? "#101719" : "#ffffff",
    borderBottomColor: theme.color === "dark" ? "#272727" : "#ffffff",
    borderBottomWidth: 1,
    padding: 10,
    margin: 0,
    height: 100,
  },
  workerIcon: {
    width: 70,
    height: 50,
  },
  workerDescription: {
    fontSize: 14,
    color:  theme.color === "dark" ? "#858585" : "#ffffff",
    flexWrap: 'wrap',
  },
  workerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 'bold',
    //fontFamily: 'Roboto'
  },
  workerColumn: {
    flex: .8,
    flexDirection: 'column',
    paddingLeft: 15,
  },
  workerHeader: {
    borderBottomWidth: 4,
    borderBottomColor: '#177fd0',
    marginVertical: 20,
    paddingBottom: 17,
    flex: 1,
    flexDirection: 'row'
  },
  workerHeaderText: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '800',
    fontSize: 18,
    width: '100%',
    textAlign: 'left',
    flex: .9
  },
  workerHeaderIcon: {
    flex: .1,
    textAlign: 'right'
  },
  autocompleteContainerCRAP: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 50,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    width: '100%'
    // backgroundColor: "#000000",

  },
  autocompleteContainer: {
    // flex: 1,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  tagStyles: {  // autotag render prop
    paddingTop: 25,
    paddingLeft: 15,
    marginTop: 15,
    height: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: theme.secondBgColor,
    borderWidth: 1,
    borderColor: "#ffffff",

  },
  tagBoxCnt: {
    //width: '50%',
    //height: 20
  },
  tagButton: {
    backgroundColor: theme.secondBgColor,
    padding: 10,
    margin: 15,
    height: 30,
  },
  tagButtonText: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    paddingTop: 20,
    paddingLeft: 10,
    fontWeight: '800'
  },
  tagButtonExp: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    paddingTop: 20,
    paddingLeft: 10,
    justifyContent: 'flex-start'
  },
  tagSuggestionList: { // drop down for autotag
    backgroundColor: "#111111",
    paddingLeft: 10,
    paddingTop: 5,
    zIndex: 2
  },
  tagSuggestionListText: {
    color: "#ffffff",
    paddingVertical: 5,
    fontWeight: '700',
    fontSize: 16
  },
  buttonCnt: { // TODO: new button which takes up bottom of phone :)
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  tagWrapper: {
    // width: '100%',
  },
  tagTouchable: {
    backgroundColor: "#333",
    flex: 1,
    width: '100%',
  },


  touchableWrap: {

    backgroundColor: theme.thirdBgColor,
    //backgroundColor: "#111111",
    flex: 1,
    marginBottom: 7,
    marginTop: 7,
    borderWidth: 1,
    borderColor: "#ffffff",
    alignSelf: 'stretch',
  },


  tagIcon: {
    color: "#ffffff",

    paddingTop: 15,
  },
  listCnt: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: theme.secondBgColor,
  },
  /*
  tagBoxWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  */
});

export default listStyles;
