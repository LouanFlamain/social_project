import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../utils/redux/hook';
import { useToken, useId, logout } from '../utils/redux/UserSlice';
import { useNavigation } from '@react-navigation/native';
import { CreateMessage, getMessages } from '../utils/services/MessageService';
import { TextInput } from 'react-native-paper';
import Header from '../components/Header';
import MessageComponent from '../components/Message';
import { ScrollView } from 'react-native-gesture-handler';
import * as SolidIcons from 'react-native-heroicons/solid';


interface ConversationProp {
  route: any
}

function Conversations<ConversationProp>({ route }): JSX.Element {
  const { id } = route.params;
  console.log(route)
  const [conversations, setConversations] = useState([]);
  const [room, setRoom] = useState();
  const [message, setMessage] = useState('');

  const isMounted = useRef(false);
  const token = useAppSelector(useToken);
  const user_id = useAppSelector(useId);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isMounted.current) {
      getConversation();
      isMounted.current = true;
    }
  }, [isMounted]);

  const getConversation = async () => {
    try {
      const response = await getMessages(token, user_id, id);
      console.log(response.data);
      setConversations(response.data.message_response.reverse());
      setRoom(response.data.room_data);
    } catch (error: any) {
      console.error('Error fetching conversations:', error);
      if (error.code === 401) {
        dispatch(logout());
        navigation.navigate('Login' as never);
      }
    }
  };

  const SendMessage = async () =>{
     if (message.length > 0){
      try {
     
        const res = await CreateMessage(token, user_id, id, message)
        console.log(res)
        const response = await getMessages(token, user_id, id);
        console.log(response.data);
  
        // Update the state with the new conversation messages
        setConversations(response.data.message_response.reverse());
        setMessage(''); // Clear the input field
        
      } catch (error) {
        console.log(error)
        
      }
     }
   
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={room?.name ? room.name : "No title"} />

      <ScrollView>
        {conversations.length > 0 ? conversations.map((conversation, index) => {
          const isMe = conversation.user_id === user_id ? true : false;
          return <MessageComponent key= {index} conversation={conversation} isMe={isMe} />;
        }) : null}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          label="Ecrire un message"
          value={message}
          onChangeText={text => setMessage(text)}
          right={<TextInput.Icon icon={SolidIcons.PaperAirplaneIcon} onPress={SendMessage}/>}
      
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputContainer: {
    margin: 16,
  },
});

export default Conversations;
