import React, { useState, useEffect } from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'
import { db, uploadFile } from '../database/firebase.js'
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import  {ListItem, Avatar } from 'react-native-elements'

function UserDetailScreen(props) {

  const collectionName = "crud-native-firebase"
	const [registros, setRegistros] = useState([])
  const [loading, setLoading ] = useState(true)

	const getLinks = async () => {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const docs = [];
    
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
    
        setRegistros(docs);
        setLoading(false)
      };
    
    
      useEffect(() => {
        getLinks()
      })
      if (loading) {
        return(
          <View>
            <ActivityIndicator size= 'large' color='#9e9e9e'/>
          </View>  
        )
       }
  return (
    <View>
      <Button
        onPress={() => props.navigation.navigate("CreateUserScreen")}
        title="Create User"
      />
        {registros.map((val)=>{
            return( 
                <ListItem 
                key={val.id} 
                bottomDivider
                onPress={()=>props.navigation.navigate('UserDetailScreen',{
                  userId: val.id
                })}
                >
                    <ListItem.Chevron/> 
                    <Avatar
                    source={{ uri: 'https://tse2.mm.bing.net/th?id=OIP.cesLOS1hYBQiep5BDfDWLgHaJ5&pid=Api&P=0'}}
                    rounded
                    />
                    <ListItem.Content>
                      <ListItem.Title>{val.name}</ListItem.Title>
                      <ListItem.Subtitle>{val.email}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            )
        })}
        
    </View>
  )
}

export default UserDetailScreen