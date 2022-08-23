import { View, Text, FlatList, StyleSheet, Pressable,  TouchableOpacity, } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Firebase from '../config/firebase';
import { firebase } from './config'
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
const auth = Firebase.auth();
const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [todosExtra, setTodosExtra] = useState([]);
  // const [liked, setLiked] = useState(false);
  const todoRef = firebase.firestore().collection('hackathon');
  const [addData, setAddData] = useState('');
  const navigation = useNavigation();

  const { user } = useContext(AuthenticatedUserContext);


  // fetch or read the data from firestore
  useEffect(() => {
    todoRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        querySnapshot => {
          const todos = []
          querySnapshot.forEach((doc) => {
            // alert(doc)
            const { title, description, tags, timestamp, user, like, createdAt, date } = doc.data()

            todos.push({
              id: doc.id,
              title: title,
              description: description,
              tags: tags,
              createdAt: createdAt?.toDate(),
              user: user,
              like: like,
            })
          })

          setTodos(todos)

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

  // like a todo from firestore db
  const likeTodo = (data, like, type,value) => {

    console.log(like, 'like value')

    // //Find index of specific object using findIndex method.    
    // objIndex = todos.findIndex((obj => data.id == obj.id));

    // if(like === undefined){
    //   todos[objIndex]?.liked = true
    // }
    // else{
    //   todos[objIndex]?.liked = !like
    // }


    // setTodosExtra(todos)
    
    todoRef
      .doc(data.id)
      .update({
        like: value + 1
      })
      .then(() => {
        // show a successful alert
        // alert("Deleted successfully");
      })
      .catch(error => {
        // show an error alert
        alert(error);
      })
  }

  // delete a todo from firestore db
  const sort = (type) => {
    todoRef
      .orderBy(type === 3 ? 'like' : 'createdAt', type === 3 ? 'desc' :  type === 1 ? 'desc' : 'asc')
      .onSnapshot(
        querySnapshot => {
          const todos = []
          querySnapshot.forEach((doc) => {
            const { title, description, tags, user, like, createdAt } = doc.data()

            todos.push({
              id: doc.id,
              title: title,
              description: description,
              tags: tags,
              createdAt: createdAt.toDate(),
              user: user,
              like: like,
            })
          })

          setTodos(todos)

        })
  }







  return (
    <View style={{ flex: 1 }}>
      <StatusBar style='light' />
      <View style={styles.row}>
        <Text style={styles.title}>Welcome {user.email.replace(/@gmail.com/, "").toUpperCase()} !</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('AddHackathon')} style={{ height: hp(5), width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: hp(1) }}>
        <View style={{ height: hp(5), width: wp('80%'), borderRadius: hp(2),elevation:5, backgroundColor: '#42855B', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white',fontSize:20 }}>Add hackathons</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sort(1)} style={{ height: 40, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
      <View style={{ height: hp(5), width: wp('80%'), borderRadius: hp(2),elevation:5, backgroundColor: '#D2D79F', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white',fontSize:20 }}>Sort Newest</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sort(2)} style={{ height: 40, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
      <View style={{ height: hp(5), width: wp('80%'), borderRadius: hp(2),elevation:5, backgroundColor: '#D2D79F', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white',fontSize:20 }}>Sort Oldest</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sort(3)} style={{ height: 40, widwhiteth: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
      <View style={{ height: hp(5), width: wp('80%'), borderRadius: hp(2),elevation:5, backgroundColor: '#D2D79F', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white',fontSize:20 }}>Sort Most Liked</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        style={{ backgroundColor: 'white', margin: 10, marginTop: 10 }}
        data={todos}
        extraData={todosExtra}
        numColumns={1}
        renderItem={({ item }) => (
          <>
            <Pressable
              style={styles.container}
              onPress={() =>  item?.user === String(user.email) && navigation.navigate('Detail', { item })}
            >
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                  {item?.user === String(user.email) && (
                    <FontAwesome name="trash-o"
                      color="red"
                      onPress={() => deleteTodo(item)}
                      style={styles.todoIcon} />
                  )}


                </View>

                <View style={{ width: '50%', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                  <>
                    <AntDesign onPress={() => likeTodo(item, item?.liked, item?.liked ? 'unlike' : 'like',item?.like)} name="like1" size={24} color={item?.liked ? "blue" : "white"} style={styles.todoIcon} />
                    <Text>{item?.like} Likes</Text>
                  </>

                </View>
              </View>
              <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.itemFeature}>
                  {item?.tags}
                </Text>
              </View>

              <Text style={styles.itemtitle}>
                {item?.title}
              </Text>
              <Text style={styles.itemHeading}>
                {item?.description}
              </Text>
            </Pressable>
          </>


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
    margin: 15,
    // flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'red',
    // marginLeft:20,
  },
  itemtitle: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    // marginRight:22
  },
  itemHeading: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 10,
    // marginRight:22
  },
  itemFeature: {
    fontSize: 8,
    color: 'white',
    margin: 5
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100
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

  todoIcon: {
    fontSize: 30,
  },
  row: {
    height: 80,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#e93b81',
  },
  title: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: '600',
    color: '#fff'
  },
});

export default HomeScreen


