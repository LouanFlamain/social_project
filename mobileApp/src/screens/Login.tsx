import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../components/Button';
import { loginAsync, selectIsLoading, selectIsLoggedIn } from '../utils/redux/UserSlice';
import { useAppDispatch } from '../utils/redux/hook';
import { useAppSelector } from '../utils/redux/hook';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import BannerMessage from '../components/BannerMessage';


function Login(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState('')
  const navigation = useNavigation();
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)


  const handleLogin = async () => {
    try {
      // Pass credentials as an object
      const credentials = { username, password };
      dispatch(loginAsync(credentials));
      navigation.navigate('Home' as never)
    } catch (error) {
      console.error('Login failed:', error);
        setError("Wrong mail or password, Please try again")
  
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? 
        <ActivityIndicator animating={true} color={MD2Colors.red800} />

      :
      <View>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          autoCapitalize="none"
          value={username}
          autoComplete="email"
          inputMode="email"
          onChangeText={(text) => setUsername(text)}
        />

        {/* Champ de texte pour le mot de passe */}
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Login" onPress={handleLogin} variant="large" />

        <TouchableOpacity>
          <Text onPress={()=>navigation.navigate('Register' as never)}>Vous n'avez pas de compte ? Inscrivez vous</Text>
        </TouchableOpacity>
      </View>
      }
      
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

export default Login;
