import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import ListMessage from '../components/ListMessage';
import { useAppSelector } from '../utils/redux/hook';
import { useAppDispatch } from '../utils/redux/hook';
import { useToken, useId, logout } from '../utils/redux/UserSlice';
import { GetChats } from '../utils/services/ChatRoomService';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import RNEventSource from 'rn-eventsource-reborn';




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
  
  const options = { headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3Q6OTA5MCIsImp0aSI6ImNmMjhmNDM1NTFmNmZlZGMzY2ZiNmE4MGIyNTBlN2I4IiwiaWF0IjoxNzAzOTQ3MDAxLjUzNzY5OCwibmJmIjoxNzAzOTQ3MDAxLjUzNzcsImV4cCI6MTcwNDAzMzQwMS41Mzc3NjMsIm1lcmN1cmUiOnsicHVibGlzaCI6WyIqIl19fQ.dLtDPlM0L6oVUTIeq5KjYHNmsuZpTf_3MNIPmZIT4SI' } };

const topicUrl = 'http://10.0.2.2:9090/.well-known/mercure?topic=chat_room_2';


useEffect(() => {
  const source = new RNEventSource(topicUrl, options)

source.addEventListener('open', (event) => {
    console.log('Connection was opened!');
});
}, []);



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
