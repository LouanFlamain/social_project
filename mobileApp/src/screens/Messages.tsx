import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import AvatarItem from '../components/Avatar';
import ListMessage from '../components/ListMessage';
import TabButtons from '../components/TabButtons';
import { useAppSelector } from '../utils/redux/hook';
import { useToken, useId } from '../utils/redux/UserSlice';
import { GetChats } from '../utils/services/ChatRoomService';


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
  const [filtre, setFiltre] = useState()
  const isMounted =  useRef(false)
  const token = useAppSelector(useToken)
const id = useAppSelector(useId)

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
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  // const handleFiltres = (filtre: string) =>{
  //   const isGroup = filtre === "groupe" ? true : false
  //   if(conversationSearch.length > 0){
  //     setConversationSearch(conversationSearch.filter((el) => el.multi_participant === isGroup))
  //   }else{
  //     setConversationSearch(conversations.filter((el) => el.multi_participant === isGroup))
  //   }
    

  // }

  // const tabsButtons = [
  //   {
  //     value : "groupe",
  //     label : "groupe"
  //   },
  //   {
  //     value : "amis",
  //     label : "amis"
  //   }
  // ]

  console.log(conversations)


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text>Messages</Text>
      </View>
      <View style={styles.messagesContainer}>
      {/* <TabButtons buttons={tabsButtons} handleFiltres={handleFiltres}/> */}
      <SearchBar onSearch={handleSearch} variant="light" placeholder={"Cherchez une discussion"}/>
        <AvatarItem size={"large"} />
        {conversationSearch.length > 0 ? (
          conversationSearch.map((conversation: ConversationItem) => (
            <ListMessage
              key={conversation.id}
              id={conversation.id}
              pseudo={conversation?.usernames[0] ?? "Unknown User"}
              message={conversation.last_message_value ?? "Unknown User"}
              date={conversation.time.last_message_hour ?? "Unknown User"}
            />
          ))
        ) : conversations.map((conversation: ConversationItem) => (
          <ListMessage
            key={conversation.id}
            id={conversation.id}
            pseudo={conversation?.usernames[0] ?? "Unknown User"}
            message={conversation.last_message_value ?? "Unknown User"}
            date={conversation.time.last_message_hour ?? "Unknown User"}
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
