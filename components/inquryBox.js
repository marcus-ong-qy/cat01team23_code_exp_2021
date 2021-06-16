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
import Checkbox from 'rc-checkbox';
import { Card } from 'react-native-paper';


export default InquryBox({props})
{
    const [disabled, setDisabled] = useState(false)

return(<Card><Text>{props.childeren}</Text><Checkbox checked = {disabled} onChange={() =>{
        setDisabled(!disabled)
        console.log(disabled)
      }} /> </Card>)
}