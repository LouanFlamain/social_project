import React from 'react';
import { Chip } from 'react-native-paper';
import AvatarItem from '../../components/Avatar';
import * as SolidIcons from 'react-native-heroicons/solid';
import { View, StyleSheet } from 'react-native';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface ChipUsersProps {
  users: User[];
  handleRemoveUser: (user: User) => void;
}

const ChipUsers: React.FC<ChipUsersProps> = ({ users, handleRemoveUser }) => {
  return (
    <View style={styles.container}>
      {users.length > 0 ? (
        users.map((user) => (
          <Chip
            key={user.id}
            closeIcon={SolidIcons.XMarkIcon}
            onClose={() => handleRemoveUser(user)}
            style={styles.chip}
          >
            {user.username}
          </Chip>
        ))
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  chip: {
    margin: 4,
  },
});

export default ChipUsers;
