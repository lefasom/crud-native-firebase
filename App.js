import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
// Components
import CreateUserScreen from "./screens/CreateUserScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import UserList from "./screens/UserList";

const MyStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
      name='UserList' 
      component={UserList}
      options={{title:'Users List'}}
      />
      <Stack.Screen 
      name='CreateUserScreen' 
      component={CreateUserScreen}
      options={{title:'User Create'}}
      />
      <Stack.Screen 
      name='UserDetailScreen' 
      component={UserDetailScreen}
      options={{title:'User Edit'}}
      />
    </Stack.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
    alignItems: 'center',
    justifyContent: 'center',
  },
});
