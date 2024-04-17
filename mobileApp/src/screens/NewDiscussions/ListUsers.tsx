/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List } from 'react-native-paper';
import AvatarItem from '../../components/Avatar';
import * as SolidIcons from "react-native-heroicons/solid";
import * as MiniIcons from "react-native-heroicons/outline";



export interface User {
    id: number;
    username: string;
    email: string;
  }


interface ListUserProps {
    users: User[];
    selectedUsers : User[];
    handleToggleUser : any

}


const ListUsers: React.FC<ListUserProps> = ({ users, handleToggleUser, selectedUsers }) => {
  return (
    <SafeAreaView>
      <View>
      
        {users
          ? users.map((user) => (
              <List.Item
                key={user.id}
                title={user.username}
                left={() => <AvatarItem size="medium" image={user.avatar} />}
                onPress={() => handleToggleUser(user)}
                right={(props) => (
                  selectedUsers.some((selectedUser) => selectedUser.id === user.id) ?
                  <List.Icon {...props} icon={SolidIcons.StarIcon} /> :
                  <List.Icon {...props} icon={MiniIcons.StarIcon} />
                )}
              />
            ))
          : null}
      </View>
    </SafeAreaView>
  );
}

  

export default ListUsers;
