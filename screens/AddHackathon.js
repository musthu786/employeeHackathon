import React, { useState, useContext } from 'react'
import { View, TextInput, StyleSheet, Text, Pressable, Keyboard, ActivityIndicator, } from "react-native"
import { firebase } from './config'
import { useNavigation } from '@react-navigation/native';

const AddHackathon = () => {
    const todoRef = firebase.firestore().collection('hackathon');
    const [updating, onUpdating] = useState(false);
    const [title, onChangeTitle] = useState();
    const [description, onChangeDescription] = useState();
    const [tags, onChangeTags] = useState();
    const navigation = useNavigation();

    const Pretags = [
        {
          id:0,
          name:'Tech'
        },
        {
           id:1,
            name:'Feature'
        },
        {
            id:2,
            name:'Javascript'
        },
        {
            id:3,
            name: 'Java'
        },
        

]

    

    const updateTodo = () => {
        onUpdating(true)
        // check if we have a todo.
        if (title && description && tags) {
            // get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                title: title,
                description: description,
                tags: tags,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(() => {
                    onUpdating(false)
                    // release todo state
                    onChangeTitle('');
                    onChangeDescription(''),
                        onChangeTags('');
                    navigation.goBack()
                    // release keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    onUpdating(false);
                    // show an alert in case of error
                    alert(error);
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
                    multiline={true}
                />
                <TextInput
                    style={styles.textfield}
                    onChangeText={onChangeDescription}
                    value={description}
                    multiline={true}
                    placeholder="description"
                />
                <TextInput
                    style={styles.textfield}
                    onChangeText={onChangeTags}
                    value={tags}
                    placeholder="Tags"
                />
{Pretags?.map(item =>{
 <Pressable
 style={styles.buttonUpdate}
 onPress={() => { updateTodo() }}>
 <Text>{item?.name}</Text>
</Pressable>
})}
                    


                


                {!updating ? (
                    <Pressable
                        style={styles.buttonUpdate}
                        onPress={() => { updateTodo() }}>
                        <Text>ADD HACKATHON</Text>
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
        marginLeft: 15,
        marginRight: 15,
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
        height: 80,
        // marginTop:10,
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

export default AddHackathon