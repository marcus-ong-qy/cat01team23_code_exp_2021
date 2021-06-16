import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from "@expo/vector-icons";
import nominalList from './NominalList.js' // explore using json or a database
import CalenderScreen from '../Screens/CalenderScreen'
import HomeScreen from '../Screens/HomeScreen'
import SettingsScreen from '../Screens/SettingScreen'

const Tab = createBottomTabNavigator();

export default function EmployeeApp({ route, navigation }) {
  return (
      <Tab.Navigator independent = {true}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            //Set the icon based on which route it is (name of the tab)
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Settings') {
              iconName = 'gear';
            } else if (route.name === 'Calender') {
              iconName = focused ? 'user' : 'user-o';  // if-else statement
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}

        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >

        <Tab.Screen name="Home">
          {props => <HomeScreen {...props} userID={route.params.userID}/>}
        </Tab.Screen>
        <Tab.Screen name="Calender">
          {props => <CalenderScreen {...props} userID={route.params.userID}/>}
        </Tab.Screen>
        <Tab.Screen name="Settings" component={SettingsScreen} />

      </Tab.Navigator>

  );
}

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