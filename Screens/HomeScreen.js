import * as React from 'react';
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Card } from 'react-native-paper';
import Checkbox from 'rc-checkbox';
import { useChecklist } from 'react-checklist';

import { nominalList } from '../components/NominalList.js'; // explore using json or a database

// List of questions
const questions = [`severe difficulty breathing (e.g., struggling for each breath, speaking in single words)`,
          `severe chest pain`,
          `having a very hard time waking up`,
          `feeling confused`,
          `lost consciousness`,
          `fever`,
          `new onset of cough or worsening of chronic cough`,
          `new or worsening shortness of breath`,
          `new or worsening difficulty breathing`,
          `sore throat`,
          `runny nose`]

var data = [];

function genData(value, index, array) {
  data.push({ _id: index+1, label: value })
}

questions.forEach(genData);

console.log(data)

// const data = [
//     { _id: 1, label: questions[0] },
//     { _id: 2, label: questions[1] },
//   ]

function CheckList(data) {
    const { handleCheck, isCheckedAll, checkedItems } = useChecklist(data, {
      key: '_id',
      keyType: 'number',
    });

    console.log(checkedItems.size)

    return (
      <ul>
        {data.map((v, i) => (
          <li key={i}>
            <input
              type="checkbox"
              data-key={v._id}                  // 3
              onChange={handleCheck}            // 4
              checked={checkedItems.has(v._id)} // 5
            />
            <label>{v.label}</label>
          </li>
        ))}
      </ul>
    );
  }


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

function submitChecklist() {} // when user presses submit button

export default function HomeScreen({ userID }) {

  const [severity, setSeverity] = useState(0);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  var currentdate = timeNow();

  const { handleCheck, isCheckedAll, checkedItems } = useChecklist(data, {
  key: '_id',
  keyType: 'number',
  });

  const [checkCounter, setCheckCounter] = useState(0);
  var Checklist = CheckList(data)

  

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.paragraph}> { currentdate } </Text>
        <Text style={styles.username}> Welcome user! </Text>  
      </Card>

    <View style={{height: 20}}/>

      <Card>
        <Text style={styles.paragraph2}> Kindly fill up questionaire to proceed </Text>
        <Text> In the past 10 days, have you experienced any of the following: </Text>
        {Checklist}
        <Text> {checkCounter} </Text>
      </Card>

    <View style={{height: 5}}/>

      <Button
        onPress={ submitChecklist }
        title="Submit"
      />
    </View>
  );
}


const styles = StyleSheet.create({
  username: {
    margin: 12,
    fontSize: 18,
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
  paragraph: {
    margin: 12,
    fontSize: 12,
    textAlign: 'center',
  },
  paragraph2: {
    margin: 12,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});