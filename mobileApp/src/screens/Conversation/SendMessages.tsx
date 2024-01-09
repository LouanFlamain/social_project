import React, { useId } from 'react'
import { StyleSheet, View } from 'react-native'
import { CreateMessage, getMessages } from '../../utils/services/MessageService'
import { useAppSelector } from '../../utils/redux/hook'
import { useToken } from '../../utils/redux/UserSlice'
import * as SolidIcons from 'react-native-heroicons/solid';
import { TextInput } from 'react-native-paper'


interface SendComponentsProps{
    setConversations: any,
    chat_id : number

}

const SendMessages: React.FC<SendComponentsProps> = ({ setConversations, chat_id }) => {
    const [message, setMessage] = React.useState('');
    const token = useAppSelector(useToken);
    const user_id = useAppSelector(useId);
  
    const Send = async () => {
      console.log(message.length);
      if (message.length > 0) {
        try {
          const res = await CreateMessage(token, user_id, chat_id, message);
          const response = await getMessages(token, user_id, chat_id);
  
          // Vérifier si response.data.message_response est défini avant de l'utiliser
          if (response.data && response.data.message_response) {
            // Update the state with the new conversation messages
            setConversations(response.data.message_response);
          }
  
          setMessage(''); // Clear the input field
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    return (
      <View style={styles.inputContainer}>
        <TextInput
          label="Ecrire un message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          right={<TextInput.Icon icon={SolidIcons.PaperAirplaneIcon} onPress={Send} />}
        />
      </View>
    );
  };
  
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
  
  export default SendMessages;
  
