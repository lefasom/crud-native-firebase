import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, ScrollView } from 'react-native'
import { db, uploadFile } from '../database/firebase.js'
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc } from "firebase/firestore";

function CreateUserScreen(props) {
const collectionName = 'crud-native-firebase'
const initialState = {
    name:'',
    email: '',
    phone: '',
}
const [ state, setState ] = useState(initialState)

const handleChange = (name, value) => {
    setState({ ...state, [name]: value })
}

const saveNewUser = async () => {
  await addDoc(collection(db, collectionName), state);
  props.navigation.navigate('UserList')
}

    

return (
<ScrollView style={style.container}>
    <View style={style.inputGroup}>
        <TextInput 
        placeholder='Name User'
        onChangeText={(value) => handleChange('name', value)}
        />
    </View>
    <View style={style.inputGroup}>
        <TextInput 
        placeholder='Email User' 
        onChangeText={(value) => handleChange('email', value)}
        />
    </View>
    <View style={style.inputGroup}>
        <TextInput
        placeholder='Phone User' 
        onChangeText={(value) => handleChange('phone', value)}
        />
    </View>
    <View>
        <Button 
        title='Save User' 
        onPress={()=> saveNewUser()}
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
export default CreateUserScreen