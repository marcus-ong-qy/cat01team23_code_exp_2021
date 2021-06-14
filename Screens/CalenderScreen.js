
import React, { useState , useEffect} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';

function CalenderSelect({navigation}) {
  return (
    <View style={styles.container}>
        <Calendar
  
  // Handler which gets executed on day press. Default = undefined
  onDayPress={(day) => {navigation.navigate("Timetable", {day});}}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={(day) => {navigation.navigate("Timetable", {day});}}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'MMMM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  disableMonthChange={true}
  disableArrowLeft={true}
  // Disable right arrow. Default = false
  disableArrowRight={true}
  enableSwipeMonths={false}

  markingType={'period'}
  markedDates={{
    '2021-06-16': {startingDay: true, color: '#50cebb', textColor: 'white'},
    '2021-06-17': {color: '#70d7c7', textColor: 'white'},
    '2021-06-18': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
    '2021-06-19': {color: '#70d7c7', textColor: 'white'},
    '2021-06-20': {endingDay: true, color: '#50cebb', textColor: 'white'},
  }}
/>

<TouchableOpacity
        onPress={() => {
          navigation.navigate("Timetable", {});
        }}
      >
      <Text> Test</Text>
      </TouchableOpacity>
    </View>
  )
}




function TimetableSelect({route}) {
  const {year, month, day, timestamp, dateString} = route.params



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button onPress = {() => console.log('day', day["day"])}>
    test
    </Button>

    <DropDownPicker
    items={[
        {label: 'Item 1', value: 'item1'},
        {label: 'Item 2', value: 'item2'},
    ]}
    defaultIndex={0}
    containerStyle={{height: 40}}
    onChangeItem={item => console.log(item.label, item.value)}
/>
    </View>
  );
}

const Stack = createStackNavigator();

export default function CalenderScreen({navigation}) {
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="CalenderTable" component={CalenderSelect} />
        <Stack.Screen name="Timetable" component={TimetableSelect} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
  },
});