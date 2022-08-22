import React, { useState,useContext } from 'react'
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native"
import { firebase } from './config'
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '../components';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
const Detail = ({route}) => {
    const todoRef = firebase.firestore().collection('todos');
    const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
    const navigation = useNavigation();
    const { user } = useContext(AuthenticatedUserContext);
    const handleSignOut = async () => {
    navigation.goBack()

    };
    const updateTodo = () => {
        if (textHeading && textHeading.length > 0) {
            todoRef
            .doc(route.params.item.id)
            .update({
                heading: textHeading,
            }).then(() => {
                navigation.navigate("Home")
            }).catch((error) => {
                alert(error.message)
            })
        }   
    }

    return (
        <>
          <View style={styles.row}>
        <Text style={styles.title}>Update content!</Text>
        <IconButton
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
        />
      </View>
        
        <View style={styles.container}>
             
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeHeadingText}
                value={textHeading}
                placeholder="Update Todo"
            />
            <Pressable 
                style={styles.buttonUpdate}
                onPress={() => {updateTodo()}}>
                <Text>UPDATE USER</Text>
            </Pressable>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginLeft:15,
        marginRight:15,
    },
    textfield: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: "#000000",
        backgroundColor: "#e0e0e0",
        borderRadius: 5
    },
    buttonUpdate: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#0de065',
    },
    row: {
        height:80,
        // marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: '#e93b81',
      },
      title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff'
      },
});

export default Detail