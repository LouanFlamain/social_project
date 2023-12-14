import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import AvatarItem from './Avatar';
import { Text } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";




interface ListMessageProps {
  id: number,
  image?: string,
  pseudo: string,
  message: string,
  date : string

}


const ListMessage: React.FC<ListMessageProps> = ({id, pseudo, message, date }) => {
  const navigation = useNavigation();


  const truncate = (input:string) => input.length > 5 ? `${input.substring(0, 35)}...` : input;

  return (
    <TouchableOpacity style={styles.list} onPress={() => navigation.navigate("Conversation" as never, { id } as never)}>
      <View style={styles.message}>
      <AvatarItem size={"small"} />
      <View>
        <Text variant='bodyMedium'>
          {pseudo}
        </Text>
        <Text variant='bodySmall'>{truncate(message)}</Text>
        </View>
      </View>
      <Text variant='bodySmall'>{date}</Text>

    </TouchableOpacity>



  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: "green",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignContent: "center",
    alignItems: 'center',
    alignSelf: "center",
    paddingLeft:5
  },
  message :{
    flexDirection: "row",
    alignContent: "center",
    alignItems: 'center',
    alignSelf: "center",
    columnGap: 10,
    width:"70%",
    height: "100%"
  }

});

export default ListMessage;
