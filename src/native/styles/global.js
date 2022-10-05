import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import theme from '../constants/theme'

const globalStyles = StyleSheet.create({
  main: {
    backgroundColor: theme.color === "dark" ? "#101719" : "#ffffff",
    paddingRight: 10,
    paddingLeft:  10,
    borderTopColor: theme.color === "dark" ? theme.darkBgColor : "#ffffff",
    //fontFamily: 'Roboto'
  },
  topBar: {
    backgroundColor: theme.color === "dark" ? theme.darkBgColor : "#ffffff",
    borderBottomColor: theme.color === "dark" ? theme.darkBgColor : "#ffffff",
  },
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceCnt: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 20
  },
  ratingStars: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 0,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ptext: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '400',
    textAlign: "left",
    fontSize: 14,
    marginTop: 0,
    width: '100%'
  },
  centerHeader: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 0,
    width: '100%'
  },
  centerHeaderContent: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    textAlign: 'center',
    fontSize: 14,
    marginTop: 0,
    width: '100%'
  },
    LeftHeader: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '700',
    textAlign: "left",
    fontSize: 18,
    marginTop: 0,
    width: '100%'
  },
  cardHeader: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '700',
    textAlign: "left",
    fontSize: 18,
    marginTop: 0,
    width: '100%',
    borderRadius: 0
  },
  listView: {
    marginVertical: 20,
  },
  historyCnt: {
    marginVertical: 20,
    height: 1000,
    display: 'flex'
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: theme.color === "dark" ? "#101719" : "#ffffff",
    borderBottomColor: theme.color === "dark" ? "#272727" : "#ffffff",
    borderBottomWidth: 1,
    padding: 10,
    margin: 0,
  },
  listHeader: {
    borderBottomWidth: 4,
    borderBottomColor: '#177fd0',
    marginVertical: 20,
    paddingBottom: 17
  },
  listHeaderText: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '800',
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
  customText: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '400',
    textAlign: "left",
    fontSize: 14,
    marginTop: 0,
    width: '100%'
  },
  note: {
    fontSize: 12,
    color: '#ff0000',
    paddingTop: 20,
  },
  btn: {
    marginRight: 20,
    marginLeft:20,
    paddingRight: 20,
    paddingLeft:  20,
  },
  listImage: {
    height: 100,
    width: null,
    flex: 1,
  },
  AccordionViewHeader: {
    backgroundColor: theme.color === "dark" ? theme.darkBgColor : "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  AccordionViewContent: {
    backgroundColor: theme.color === "dark" ? "#111111" : "#ffffff",
    height: '100%',
    paddingHorizontal: 20,
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  accordionHeader: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '700',
    fontSize: 16,
    marginTop: 0,
    width: '100%',
    flexWrap: 'wrap'
  },
  accordionContent: {
    fontSize: 14,
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    paddingTop: 1,
    width: '100%',
    paddingBottom: 10,
    flex: 1,
    flexWrap: 'wrap'
  },
  icon: {
    width: 30,
    marginLeft:10
  },
  homeIcon: {
    marginRight: 20,
    marginTop:13,
    paddingRight: 20,
    paddingTop:13
  },
  taskIcon: {
    paddingTop: 20,
    marginTop: 20,
    marginRight: 20,
  },
  paddingLeftRight: {
    paddingLeft:  15,
    paddingRight: 15,
    borderRadius: 0
  },
  workerHeader: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '700',
    fontSize: 18,
    marginTop: 0,
    width: '100%'
  },
  inputItem: {
    borderBottomColor: '#177fd0',
    marginBottom: 10
  },
  inputBox: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    marginTop: 0,
    width: '100%',

  },
  inputLabel: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
  },
  workerListHeader: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '700',
    textAlign: "left",
    fontSize: 14,
    marginTop: 0,
    width: '100%',
    paddingLeft:  5
  },
  workerListText: {  // worker detail page stats section
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '400',
    textAlign: "left",
    fontSize: 14,
    marginTop: 0,
    paddingRight: 20,
    width: '100%'
  },
  listItem: {
    borderBottomWidth: 0,
    borderRadius: 0
  },
  noborder: {
    borderBottomWidth: 0,
    borderRadius: 0
  },
  listButton: {
    backgroundColor: "#000000",
    paddingLeft:  40,
    marginTop: 2,
    height: 50,
    borderRadius: 0
  },
  listButtonText: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '700',
    textAlign: "left",
    fontSize: 14,
    marginTop: 0,
    width: '100%',
    marginLeft:20
  },
  flag: {
    marginLeft:0
  },
  centerColumn: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileLink: {
    backgroundColor: theme.color === "dark" ? "#101719" : "#ffffff",
    padding: 10,
    margin: 0,
    height: 70,
    borderBottomWidth: 0,
  },
  profileLinkText: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '600',
    textAlign: "left",
    fontSize: 16,
    marginTop: 0,
    width: '100%',
    borderBottomWidth: 0,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterSection: {
    //color: theme.color === "dark" ? theme.darkBgColor: theme.lightBgColor,
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    // color: '#ffffff',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 0,
    marginBottom: 15,
    width: '100%',
  },
  searchTagCnt: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1

  },
  searchTag: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    width: '20%',
    backgroundColor: "#111",
    //flex: .1
  },
  filterModalHeader: {  //
    // flex: 1, // dissapears
    flexDirection: 'row',
    marginTop: 22,
    marginBottom: 0,
    paddingBottom: 5,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1
  },
  filterHeaderLeft: {  //
    flex: .5,
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '500',
    textAlign: "left",
    fontSize: 20,
    paddingTop: 7
  },

  filterHeaderRight: {  //
    flex: .5,
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '200',
    textAlign: 'right',
    fontSize: 27,
  },
  filterHeaderFirst: {  //
    fontSize: 17,
    paddingTop: 0,
    paddingBottom: 5,
    color: "#cccccc",
    fontWeight: '500',
    textAlign: "left"
  },
  filterHeader: {  //
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#cccccc",
    fontWeight: '500',
    textAlign: "left",
  },
  filterBorder: {  //
    marginBottom: 20,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1
  },
  sliderText: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '500',
    fontSize: 17,
    width: '100%',
    textAlign: "left",
  },
});

export default globalStyles;
