/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { getUsers } from '../../utils/services/UserService';
import { useAppSelector } from '../../utils/redux/hook';
import { useToken, useId } from '../../utils/redux/UserSlice';
import ChipUsers from './SelectedUsers';
import ListUsers from './ListUsers';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import { TextInput } from 'react-native-paper';
import {newRoom } from '../../utils/services/ChatRoomService';
import { useNavigation } from '@react-navigation/native';

function NewDiscussion(): JSX.Element {
  const token = useAppSelector(useToken);
  const id: number | undefined = useAppSelector(useId);
  const isMounted = useRef(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [GroupName, setGroupName] = useState();
  const [Message, setMessage] = useState();
  const [newError, setErrors] = useState();
  const navigation = useNavigation()

  useEffect(() => {
    if (!isMounted.current) {
      getAllUsers();
      isMounted.current = true;
    }
  }, [isMounted]);

  const getAllUsers = async () => {
    try {
      const response = await getUsers(id, token);
      setUsers(response);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleToggleUser = (user) => {
    const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);

    if (isSelected) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    }
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
    );
  };

  const onSearch = (value: string) => {
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );

    setSearchUsers(filteredUsers);
  };

  const NewDiscuss = async() =>{
    const initialliste = [id]
    const selectedUserIds = selectedUsers.map((user) => user.id);
    const finalListe = initialliste.concat(selectedUserIds)
    const data ={
      users : finalListe,
      message_value: Message,
      name: GroupName
    }
    if(selectedUserIds.length === 1 ){
      console.log("erreur il faut choisir les utilisateur")
    }else {
      try {
        await newRoom(token, data)
        navigation.navigate('Messages' as never)
        
      } catch (error : any) {
        setErrors(error)
        console.log(error)  
      }

  }
}



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>

        <Text>Vous voulez écrire à {selectedUsers.length > 1 ? "un groupe": "un.e ami.e" }</Text>

      <SearchBar placeholder='Chercher des amis' variant='dark'  onSearch={onSearch}/>
      
      <ChipUsers users={selectedUsers} handleRemoveUser={handleRemoveUser}/>

      <ListUsers users={searchUsers.length > 0 ? searchUsers : users} selectedUsers={selectedUsers} handleToggleUser={handleToggleUser}/>
      </View>

      <View style={{ position: 'absolute', bottom: 16, alignSelf: 'center' }}>
      </View>

      <View style={{ position: 'absolute', bottom: 16, alignSelf: 'center', width:"100%"}}>
      {selectedUsers.length > 1 ? 
         <TextInput
         label="Renseigne le nom du groupe"
         value={GroupName}
         onChangeText={text => setGroupName(text)}
       />
        : null}
      <TextInput label="Ajouter un message"  value={Message} onChangeText={text => setMessage(text)}/>
        <Button title="Mon Bouton" onPress={() => NewDiscuss()} variant='medium' />
      </View>
    </SafeAreaView>
  );
}


export default NewDiscussion;
