import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button,  } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Detail from '../screens/Detail';
import AddHackathon from '../screens/AddHackathon';
import Firebase from '../config/firebase';
const Stack = createStackNavigator();
const auth = Firebase.auth();
export default function HomeStack() {

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Stack.Navigator  options={({ route }) => ({ title: route.params.name })}>
      {/* <Stack.Screen  options={{ title: 'My home' }} name='Home' component={HomeScreen} /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => handleSignOut()}
              title="Logout"
              color="blue"
            />
          ),
          headerRightContainerStyle:{
            marginRight:20
          },
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name='Detail' component={Detail} />
      <Stack.Screen name='AddHackathon' component={AddHackathon} />
    </Stack.Navigator>
  );
}
