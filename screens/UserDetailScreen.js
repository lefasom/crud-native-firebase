import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TextInput, Button, ScrollView, ActivityIndicator} from 'react-native'

import { db, uploadFile } from '../database/firebase.js'
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

function UserDetailScreen(props) {

const IDuser = props.route.params.userId
const collectionName = 'crud-native-firebase'

const getUsuariosById = async (id) =>{
  const usuario = await getDoc(doc (db, collectionName, id));
  const user = usuario.data()
  setState({ ...user, id:IDuser })
  setLoading(false)

}

useEffect(()=>{
  getUsuariosById(IDuser)
},[])

const initialState = {
    name:'',
    email: '',
    phone: '',
}
const [ state, setState ] = useState(initialState)
const [loading, setLoading ] = useState(true)
const handleChange = (name, value) => {
    setState({ ...state, [name]: value })
}

const onDeleteLink = async (id) => {
  await deleteDoc(doc(db, collectionName, id))
  props.navigation.navigate('UserList')
};  

const Update = async (id) => {
  await setDoc(doc(db, collectionName, id), {
    name: state.name,
    email: state.email,
    phone: state.phone
  })
  props.navigation.navigate('UserList')
};    
 if (loading) {
  return(
    <View>
      <ActivityIndicator size= 'large' color='#9e9e9e'/>
    </View>  
  )
 }
  return (
    <ScrollView style={style.container}>
        <View style={style.inputGroup}>
            <TextInput 
            placeholder='Name User'
            value={state.name}
            onChangeText={(value) => handleChange('name', value)}
            />
        </View>
        <View style={style.inputGroup}>
            <TextInput 
            placeholder='Email User' 
            value={state.email}
            onChangeText={(value) => handleChange('email', value)}
            />
        </View>
        <View style={style.inputGroup}>
            <TextInput
            placeholder='Phone User'
            value={state.phone}
            onChangeText={(value) => handleChange('phone', value)}
            />
        </View>
        <View>
            <Button
            color='#19AC52' 
            title='Update' 
            onPress={()=> Update(state.id)}
            />
        </View>
        <View>
            <Button 
            color='#E37399' 
            title='Delete' 
            onPress={()=> onDeleteLink(state.id)}
            />
        </View>
    
    </ScrollView>
    
    )
    
    
    }
    const style = StyleSheet.create({
      container : {
          flex: 1,
          padding: 35,
      },
      inputGroup: {
          flex: 1,
          padding: 0,
          marginBottom: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#cccccc'
      }
    })
    export default UserDetailScreen