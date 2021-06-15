import * as React from 'react';
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from "@expo/vector-icons";
import { Card } from 'react-native-paper';

import { nominalList } from '../components/NominalList.js' // explore using json or a database



export default function HomeScreen({ userID }) {

  function timeNow() {
    var myDate = new Date();

    let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];

    let date = myDate.getDate();
    let month = monthsList[myDate.getMonth()];
    let year = myDate.getFullYear();
    let day = daysList[myDate.getDay()];

    let today = `${date} ${month} ${year}, ${day}`;

    let amOrPm;
    let twelveHours = function (){
      if(myDate.getHours() > 12) {
          amOrPm = 'PM';
          let twentyFourHourTime = myDate.getHours();
          let conversion = twentyFourHourTime - 12;
          return `${conversion}`

      } else if(myDate.getHours() == 12) {
          amOrPm = 'PM';
          return `${myDate.getHours()}` 

      } else if(myDate.getHours() == 0) {
          amOrPm = 'AM';
          return `${myDate.getHours()}` 
                  
      } else {
          amOrPm = 'AM';
          return `${myDate.getHours()}`}
    };

    let hours = twelveHours() < 10 ? `0${twelveHours()}`: twelveHours() ;
    let minutes = myDate.getMinutes() < 10 ? `0${myDate.getMinutes()}`: myDate.getMinutes() ;

    let currentTime = `${hours}:${minutes} ${amOrPm}`;

    return `${today} ${currentTime}`
  }

  const idFound = nominalList[userID]? true:false

  if (!idFound) userID = "001"

  const [isInOffice, setIsInOffice] = useState(idFound? nominalList[userID]['isInOffice']:false);

  function checkInButton() {
    if (!nominalList[userID]['wfh'])
    return (
      <Button 
        title='Check-in to Workplace' 
        onPress={ () => { 
          nominalList[userID]['isInOffice'] = !nominalList[userID]['isInOffice'];
          setIsInOffice(!isInOffice)
        }}
      />
    )
  }

  var currentdate = timeNow()  //todo make this self updating

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.dateTime}> { currentdate } </Text>

        <Text style={styles.idName}> { nominalList[userID]['id'] }: { nominalList[userID]['name'] } </Text>

        <Text style={styles.schedule}> Schedule: { nominalList[userID]['wfh']? 'Work From Home':'Report To Office' } </Text>

        <Text style={styles.paragraph}> Status: </Text>
        <Text style={styles.status}> { isInOffice? 'OFFICE':'HOME' } </Text>
        
        <Text style={styles.cohort}> Cohort: { nominalList[userID]['cohort'] } </Text>
      </Card>
      <Card>
        <Text style={styles.dateTime}> { currentdate } </Text>
      </Card>

      {checkInButton()}

    </View>
  )
}

const styles = StyleSheet.create({
  dateTime: {
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  idName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  status: {
    // margin: 24,
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  schedule: {
    margin: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cohort: {
    margin: 12,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});