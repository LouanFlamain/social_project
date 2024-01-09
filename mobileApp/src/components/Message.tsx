import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AvatarItem from './Avatar';

export interface conversationProps{
    username: string, 
    user_id: string, 
    value: string, 
    createdAt: createdAtTypes,
    is_image: string

}

export interface createdAtTypes{
    date: string, 
    timezone_type: number, 
    timezone : string
}

const MessageComponent = (props : { conversation: any, isMe : boolean}) => {


    // Assurez-vous que createdAt est défini
    if (!props.conversation.createdAt || !props.conversation.createdAt.date) {
      const ennui = JSON.parse(props.conversation)
      console.log(ennui)
      return null; // Ou renvoyez un composant de remplacement / vide selon vos besoins
    }

  // Parse createdAt.date into a Date object
  const dateObject = new Date(props.conversation.createdAt.date);

  // Formater la date avec JavaScript pur
  const formattedDate = formatDate(dateObject);

  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };

    return date.toLocaleDateString('en-US', options);
  }
      

  return (
    <View style={props.isMe ? styles.containerMe : styles.container}>
        <View style={styles.username}>
        <AvatarItem size="small" />
         <Text>{props.conversation.username}</Text>
         </View>
    <View style={styles.message}>
      <Text style={styles.messageText}>{props.conversation.value}</Text>
    </View>
    <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    maxWidth: 280, 
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0', 
    borderRadius: 8,
  },
  messageText: {
    fontSize: 16,
  },
  date:{
    fontSize:11
  },
  username:{
    fontSize:11,
    flexDirection:"row",
    columnGap:5
  },
  containerMe:{
    flexDirection:"column",
    alignItems:"flex-end"
  },
  container:{
    flexDirection:"column",
    alignItems:"flex-start"
  }
});

export default MessageComponent;
