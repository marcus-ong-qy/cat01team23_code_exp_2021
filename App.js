import * as React from 'react';
import { useEffect, useState } from "react";
import { 
  Text, 
  View, 
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer, NavigationActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

//GoogleSignin.configure();
//SIGN_IN_CANCELLED = {}

// You can import from local files
import EmployeeApp from './components/EmployeeApp'
import CalenderScreen from './Screens/CalenderScreen'

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

function LoginScreen({ navigation }) {
  const [userID, setUserID] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Login
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setUserID(text)} /* callback when text box update */
        placeholder='User ID'
        keyboardType='numeric'
      />
      <Button
        onPress={
          () => navigation.navigate("EmployeeApp", { userID })
        } // navigate to 'EmployeeApp' and pass userID to route.params of EmployeeApp
        title="Login"
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="EmployeeApp" component={EmployeeApp} />
      </Stack.Navigator>
    </NavigationContainer>
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
  textInput: {
    borderColor: "black",
    padding: 5,
    backgroundColor: "white",
    marginTop: 10,
    width: "100%",
  },
});
