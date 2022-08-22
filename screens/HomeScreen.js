import { View, Text, FlatList, StyleSheet, Pressable, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect ,useContext} from 'react'
import Firebase from '../config/firebase';
import { firebase } from './config'
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { IconButton } from '../components';
const auth = Firebase.auth();
const HomeScreen = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('hackathon');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    const { user } = useContext(AuthenticatedUserContext);
    const handleSignOut = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };

    // fetch or read the data from firestore
    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshot( 
            querySnapshot => {
            const todos = []
            querySnapshot.forEach((doc) => {
              // alert(doc)
                const {title,description,tags,timestamp} = doc.data()
                todos.push({
                    id: doc.id,
                    title: title,
                    description: description,
                    tags: tags,
                    createdAt: timestamp
                })
            })
       
            setTodos(todos)
            //console.log(users)
        })
    }, [])

    // delete a todo from firestore db
    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() => {
                // show a successful alert
                alert("Deleted successfully");
            })
            .catch(error => {
                // show an error alert
                alert(error);
            })
    }

    // add a todo
    const addTodo = () => {
        // check if we have a todo.
        if (addData && addData.length > 0) {
            // get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(() => {
                    // release todo state
                    setAddData('');
                    // release keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    // show an alert in case of error
                    alert(error);
                })
        }
    }

    return (
        <View style={{flex:1}}>
         <View style={styles.row}>
        <Text style={styles.title}>Welcome {user.email}!</Text>
        <IconButton
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('AddHackathon')} style={{height:40,width:'100%',justifyContent:'center',alignItems:'center',marginBottom:10}}>
           {/* <Text>Click here to add hackathons</Text> */}
           <View style={{height:50,width:300,borderRadius:10,backgroundColor:'grey',justifyContent:'center',alignItems:'center'}}>
           <Text>Click here to add hackathons</Text>
           </View>
      </TouchableOpacity>
            <FlatList
                style={{}}
                data={todos}
                numColumns={1}
                renderItem={({item}) => (
                 
                    <View>
                        <Pressable
                        style={styles.container}
                        onPress={() => navigation.navigate('Detail', {item})}
                        >
                            <FontAwesome name="trash-o" 
                            color="red" 
                            onPress={() => deleteTodo(item)} 
                            style={styles.todoIcon} />
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                  {item?.title}
                                </Text>
                                <Text style={styles.itemHeading}>
                                  {item?.description}
                                </Text>
                                <Text style={styles.itemHeading}>
                                  {item?.tags}
                                </Text>
                                
                            </View> 
                            
                        </Pressable>
                    </View>
                    

                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin:5,
        marginHorizontal: 10,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft:45,
    },
    itemHeading: {
        fontWeight: 'bold',
        fontSize:18,
        marginRight:22
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft:10,
        marginRight: 10,
        marginTop:100
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    
    todoIcon:{
        marginTop:5,
        fontSize:20,
        marginRight:14,
    },
    row: {
      height:80,
      marginTop:10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      backgroundColor: '#e93b81',
    },
    title: {
      marginLeft:10,
      fontSize: 20,
      fontWeight: '600',
      color: '#fff'
    },
});

export default HomeScreen


