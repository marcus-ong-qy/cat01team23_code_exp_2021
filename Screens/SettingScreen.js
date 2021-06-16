import  React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from "@expo/vector-icons";
import { Card } from 'react-native-paper';
import ultrasonic from 'react-native-ultrasonic';


export default function SettingsScreen({ navigation }) {

  useEffect(() => {
    ultrasonic.initialize({sound: ultrasonic.sounds.ultrasonic}).then(() => {
      // initialized
    }).catch(error => {
       alert(error.error);
    })
  }, [])

  const [payload, setPayload] = useEffect()

   useEffect(() => {
    const sendSound = async () => {
      setPayload(Date())
      ultrasonic.send({payload}).then(() => {
        // message has been sent
      }).catch(error => {
        alert(error);
      })
    };
  
    const t = setInterval(sendSound, 1000);
  
    return () => clearInterval(t); // clear
  }, []);


  return (
      <View style = {{flex: 1, flexDirection: 'column'}}>
      <View style = {{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}}>
          <TextInput placeholder = 'message' onChangeText = {(payload) => this.setState({payload})} style = {{borderWidth: 1, borderColor: '#eee', width: '90%'}}  />
      </View>
      <View style = {{flex: .5, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
      </View>
      <View style = {{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
          <TouchableOpacity style = {{backgroundColor: '#6C55AE', padding: 10, margin: 12, width: '90%'}} onPress = {this.onSend}>
              <Text style = {{textAlign: 'center', color: '#fff'}}>Send</Text>
          </TouchableOpacity>
      </View>

      <Button 
        title='Log Out' 
        onPress={() => navigation.navigate("LoginScreen")}
      />
    </View>
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