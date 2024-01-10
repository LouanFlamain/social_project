import React from 'react'
import { ScrollView } from 'react-native';
import MessageComponent from '../../components/Message';
import { ConversationItem } from '../Messages';
import { useAppSelector } from '../../utils/redux/hook';
import { useId } from '../../utils/redux/UserSlice';

interface MessageComponentsProps{
  messages : ConversationItem[] ,
}

const MessagesComponents: React.FC<MessageComponentsProps> = ( {messages} ) => {
    const id = useAppSelector(useId);
    console.log(messages)
  
    return (
      <ScrollView>
        {messages.length > 0 ? (
          messages.slice().reverse().map((conversation, index) => {
            const isMe = conversation.user_id === id ? true : false;
            return <MessageComponent key={index} conversation={conversation} isMe={isMe} />;
          })
        ) : null}
      </ScrollView>
    );
  };
  

export default MessagesComponents
