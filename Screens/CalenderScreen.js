
import React, { useState , useEffect} from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Platform
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("timetable");

export default function CalenderScreen({userID}) {
  //firebase
  const [hasAppointment, setHasAppointment] = useState(0);
  const [appointmentBooked, setAppointmentBooked] = useState(0);
  const [timetable, setTimetable] = useState([]);
  const [count, setCount] = useState(7)

  const [helptext, setHelptext] = useState(" ");
  
  // Load Firebase data on start
  //alt methods

  useEffect(() => {
    fetchTimetable();
  }, [])

  const fetchTimetable=async()=>{

    console.log("fetchTimetable " + userID + " " + date)
    const data=await db.get();
    data.docs.forEach(item=>{
      
      // console.log("test1 ")
      // var date2 = item._delegate._document.data.value.mapValue.fields.appointmentDate.integerValue
      // var itemid = item._delegate._document.data.value.mapValue.fields.id.integerValue
      // console.log("item id " + itemid + "userId " + userID)

      if(itemid == userID)
      {
        console.log("test2 ")
        setHasAppointment(true);
        // date = item._delegate._document.data.value.mapValue.fields.id.integerValue
        // console.log("date " + date)
      }

      // if(date2 - date < 3600000 || date - date2 < 3600000)
      // {
      //   console.log("test3 ")
      //   console.log(date2)
      //   setCount(count + 1)
      //   setAppointmentBooked(true);
      //   setDate(date + 3600000)
      //   setHasAppointment(true);
      // }
      // else
      // {
      //   setAppointmentBooked(false);
      //   uploadData()
      //   setHasAppointment(true);
      // }
    })
  }

  function uploadData()
  {
    setHasAppointment(true)
    console.log("uploadData " + userID + " " + date)
    const newNote = {
      appointmentDate : date.getTime(),
      id: userID,
    };
    db.add(newNote);
    updateText()
    setCount(couunt + 1)
  }
  //firebase end


  //calendar settings
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    uploadData()
    setHasAppointment(true);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  //calendar settings end

  function updateText(){
    if(hasAppointment)
    {
      setHelptext("Appointment good to go")
    }
    else if(appointmentBooked)
    {
      setHelptext("Looks like the slot is taken, ")
    }
    else if(hasAppointment == false){
      setHelptext("Looks like you have No Appointment booked, ")
    }
  }


  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 90, textAlign: 'center', color: "green"}}>{count}</Text>
      <Text style = {styles.paragraph}>Patients Currently in the CODE_EXP Clinic. Safe !</Text>
      <Text style = {styles.paragraph}>{hasAppointment? date.toLocaleString() : ""}</Text>
      <Text style = {styles.paragraph}>{helptext}</Text>
      <Button onPress={showDatepicker} title="Customise Date" />
      <Button onPress={showTimepicker} title="Customise Time" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});