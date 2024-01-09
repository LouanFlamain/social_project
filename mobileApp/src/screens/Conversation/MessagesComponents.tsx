import React, { useId } from 'react'
import { ScrollView } from 'react-native';
import MessageComponent from '../../components/Message';
import { ConversationItem } from '../Messages';
import { useAppSelector } from '../../utils/redux/hook';

interface MessageComponentsProps{
    messages : ConversationItem[]
}

const MessagesComponents: React.FC<MessageComponentsProps> = ({ messages }) => {
    const user_id = useAppSelector(useId);
  
    return (
      <ScrollView>
        {messages.length > 0 ? (
          messages.map((conversation, index) => {
            const isMe = conversation.user_id === user_id ? true : false;
            return <MessageComponent key={index} conversation={conversation} isMe={isMe} />;
          })
        ) : null}
      </ScrollView>
    );
  };
  

export default MessagesComponents
