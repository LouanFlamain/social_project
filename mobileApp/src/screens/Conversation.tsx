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



interface ConversationProp {
  route: any
}

function Conversations<ConversationProp>({ route }): JSX.Element {
  const { id } = route.params;
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
      const response = await getMessages(token, user_id, route.params);
      setConversations(response.data.message_response);
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
    console.log(message.length)
     if (message.length > 0){
      try {
     
        const res = await CreateMessage(token, user_id, id, message)
        const response = await getMessages(token, user_id, id);
        console.log(response.data);
  
        // Update the state with the new conversation messages
        setConversations(response.data.message_response);
        setMessage(''); // Clear the input field
        
      } catch (error) {
        console.log(error)
        
      }
     }
   
  }

  const Onchange = (value : any) =>{
    console.log(value)

  const convs = conversations
  const newConvs = conversations.unshift(value)
  setConversations(conversations)
  console.log("done")
  }



  return (
    <View style={styles.container}>
      <Header title={room?.name ? room.name : "No title"} />

      {conversations ? 

<ScrollView>
{conversations.length > 0 ? conversations.map((conversation, index) => {
  const isMe = conversation.user_id === user_id ? true : false;
  return <MessageComponent key={conversation.id} conversation={conversation} isMe={isMe} />;
}) : null}
</ScrollView>
      
      
      : null}

        <View style={styles.inputContainer}>
          <TextInput
            label="Ecrire un message"
            value={message}
            onChangeText={(text) => setMessage(text)}
            right={
              <TextInput.Icon
                icon={SolidIcons.PaperAirplaneIcon}
                onPress={SendMessage}
              />
            }
          />
        </View>




     {id ? 
           <Mercure topic={`chat_room_${id}`} Onchange={Onchange} roomdata={id} />
     : null}

          </View>

  
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
