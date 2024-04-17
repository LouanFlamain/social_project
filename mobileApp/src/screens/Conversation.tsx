import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
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
import Mercure from '../utils/Mercure/Mercure';
import { ConversationItem } from './Messages';
import MessagesComponents from './Conversation/MessagesComponents';



interface ConversationProp {
  route: any
}

function Conversations<ConversationProp>({ route }): JSX.Element {
  const { id } = route.params;
  const [conversations, setConversations] = useState([])
  const [room, setRoom] = useState();
  const [message, setMessage] = useState('');


  const isMounted = useRef(false);
  const token = useAppSelector(useToken);
  const Myid = useAppSelector(useId);
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
      const response = await getMessages(token!, Myid!, id);
      setConversations(response.data);
      setRoom(response.data.room_data);
    } catch (error: any) {
      console.error('Error fetching conversationsddddd:', error);
      if (error.code === 401) {
         dispatch(logout());
        navigation.navigate('Login' as never);
      }
    }
  };

  const SendMessage = async () =>{
    if (message.length > 0){
     try {
    
       const res = await CreateMessage(token!, Myid!, id, message)
       console.log(res)
       const response = await getMessages(token!, Myid!, id);
       console.log(response.data);
 
       // Update the state with the new conversation messages
       setConversations(response.data.message_response);
       setMessage(''); // Clear the input field
       
     } catch (error) {
       console.log(error)
       
     }
    }
  
 }

  const Onchange = (parsedObject: string) => {
    const newObject = JSON.parse(parsedObject) as ConversationItem;
    setConversations((prevConversations :  ConversationItem[]) => [ newObject, ...prevConversations]);
    console.log(conversations)
  };
  


  return (
    <>
    <Mercure topic={`chat_room_${id}`} Onchange={Onchange} roomdata={id}/>
    <View style={styles.container}>
      <Header title={room?.name ? room.name : "No title"} />

      {conversations && conversations.length > 0 ?
      <MessagesComponents messages={conversations} />
      : null}

        <View style={styles.inputContainer}>
        <TextInput
          label="Ecrire un message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          right={<TextInput.Icon icon={SolidIcons.PaperAirplaneIcon} onPress={SendMessage}/>}
      
        />
        </View>
    </View>


          </>

  
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
