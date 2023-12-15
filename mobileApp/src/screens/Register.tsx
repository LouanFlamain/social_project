import React from 'react';
import { SafeAreaView, Text, View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../components/Button';

function Register(): JSX.Element {
  const navigation = useNavigation();

  const handleLogin = () => {

    navigation.navigate('Home' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
        />

        <Button title="Login" onPress={handleLogin} variant="large"/>

        <TouchableOpacity>
          <Text onPress={()=>navigation.navigate('Login' as never)}>Vous n'avez pas de compte ? Inscrivez vous</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width:"auto",
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default Register;
