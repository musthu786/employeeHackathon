import React, { useState,useContext } from 'react'
import { View, TextInput, StyleSheet, Text, Pressable,ActivityIndicator } from "react-native"
import { firebase } from './config'
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '../components';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
const Detail = ({route}) => {
    const todoRef = firebase.firestore().collection('hackathon');
    const [updating, onUpdating] = useState(false);
    const [title, onChangeTitle] = useState(route.params.item?.title);
    const [description, onChangeDescription] = useState(route.params.item.description);
    const [tags, onChangeTags] = useState(route.params.item.tags);
    const navigation = useNavigation();
    const { user } = useContext(AuthenticatedUserContext);
    const handleSignOut = async () => {
    navigation.goBack()

    };
    const updateTodo = () => {
        onUpdating(true)
        if (title && description && tags) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                title: title,
                description: description,
                tags: tags,
                createdAt: timestamp
            };
            todoRef
            .doc(route.params.item.id)
            .update(data).then(() => {
                onUpdating(false)
                navigation.navigate("Home")
            }).catch((error) => {
                onUpdating(false)
                alert(error.message)
            })
        }   
    }

    return (
        <>
          <View style={styles.row}>
        <Text style={styles.title}>Update content!</Text>
      
      </View>
        
        <View style={styles.container}>
             
        <TextInput 
                style={styles.textfield}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="title"
            />
              <TextInput 
                style={styles.textfield}
                onChangeText={onChangeDescription}
                value={description}
                placeholder="description"
            />
              <TextInput 
                style={styles.textfield}
                onChangeText={onChangeTags}
                value={tags}
                placeholder="Tags"
            />
             {!updating ? (
                   <Pressable 
                   style={styles.buttonUpdate}
                   onPress={() => {updateTodo()}}>
                   <Text>UPDATE Hackathon</Text>
               </Pressable> 
                ) : (
                    <ActivityIndicator size="large" color="#00ff00" />
                )}
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

        height:100,
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'center',
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
