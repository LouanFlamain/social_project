import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import ListMessage from '../components/ListMessage';
import { useAppSelector } from '../utils/redux/hook';
import { useAppDispatch } from '../utils/redux/hook';
import { useToken, useId, logout } from '../utils/redux/UserSlice';
import { GetChats } from '../utils/services/ChatRoomService';
import { useNavigation } from '@react-navigation/native';
import Mercure from '../utils/Mercure/Mercure';






export interface ConversationItem{
  id: number,
  room_name: string, 
  users_id: Array<Number>,
  usernames: Array<string>,
  multi_participant: boolean, 
  last_message_value?: string,
  time: Time
}

export interface Time{
  last_message_date: string,
  last_message_hour: string, 
  last_message_day: string, 
  timestamp: number
}

function Messages(): JSX.Element {
  const [conversations, setConversations] = useState([])
  const [conversationSearch, setConversationSearch] = useState([])
  const isMounted =  useRef(false)
  const token = useAppSelector(useToken)
const id = useAppSelector(useId)
const dispatch = useAppDispatch()
const navigation = useNavigation()

const handleSearch = (searchValue: string, filtre : string) => {
  if (searchValue !== "" ) {
    setConversationSearch(conversations.filter((el) => el.usernames[0].includes(searchValue)));
  } else {
    setConversationSearch(conversations); // Clear search results when the search value is empty
  }
};

  useEffect(() => {
    if (!isMounted.current) {
      getConversations();
      isMounted.current = true;
    }
  }, [isMounted]);

  const getConversations = async () => {
    try {
      const response = await GetChats(id, token);
      setConversations(response);
    } catch (error: any) {
      console.error('Error fetching conversations:', error);
      if(error.code === 401){
        dispatch(logout());      
        navigation.navigate('Login' as never);
      }
    }
  }; 


  // Change conversations when new message where send without sending request to API.
  const Onchange = (value : any) =>{
  // const updatedConversations = conversations.map((conversation : ConversationItem) => {
  //   if (conversation.room_name === roomData) {
  //     return {
  //       ...conversation,
  //       last_message_value: value,
  //     };
  //   }
  //   return conversation;
  // });

  // setConversations(updatedConversations);
  getConversations()

  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text>Messages</Text>
      </View>
      <View style={styles.messagesContainer}>
      {/* <TabButtons buttons={tabsButtons} handleFiltres={handleFiltres}/> */}
      <SearchBar onSearch={handleSearch} variant="light" placeholder={"Cherchez une discussion"}/>
        {conversationSearch.length > 0 ? (
          conversationSearch.map((conversation: ConversationItem) => (
            <ListMessage
              key={conversation.id}
              id={conversation.id}
              pseudo={conversation?.usernames[0] ?? "Unknown User"}
              message={conversation.last_message_value ?? "Unknown User"}
              date={conversation.time.last_message_hour ?? "Unknown User"}
              multiparticipant = {conversation.multi_participant}
              room_name={conversation.room_name}

            />
          ))
        ) : conversations.map((conversation: ConversationItem) => (
          <ListMessage
            key={conversation.id}
            id={conversation.id}
            pseudo={conversation?.usernames[0] ?? "Unknown User"}
            message={conversation.last_message_value ?? "Unknown User"}
            date={conversation.time.last_message_hour ?? "Unknown User"}
            multiparticipant = {conversation.multi_participant}
            room_name={conversation.room_name}
          />
        ))}

        {conversations.map((conversation : ConversationItem)=>(
            <Mercure topic={`chat_room_${conversation.id}`} Onchange={Onchange} roomdata={conversation.id}/>
        ))}
        
       
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor:'lightblue'
  },
  title: {
    flex: 0.15, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'none',
  },
  messagesContainer: {
    flex: 0.85, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
});

export default Messages;
