import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../components/Button';
import { register } from '../utils/services/UserService';
function Register(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const navigation = useNavigation();
  const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  const validateMail = () =>{
    return mailRegex.test(email)
  }

  const validatePassword = () =>{
    if(passwordRegex.test(password) && password === checkPassword){
      return true
    }else{
      return false
    }

  }
  const handleRegister = () => {
    if(validateMail() && validatePassword()){
      try {
        const credentials ={username, email, password, check_password : checkPassword}
        const res = register(credentials)
         navigation.navigate('Login' as never);
        
      } catch (error) {
        console.log(error)
        
      }
    

    }else{
      if(!validateMail()){
        setError("Mauvais mail")
      }else if(!validatePassword()){

        setError("Mauvais mot de passe")
      }

      console.log(error)
    }
    
    
  };


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          autoComplete="email"
          inputMode="email"
          onChangeText={(text) => setEmail(text)}
        />

        {/* Champ de texte pour le mot de passe */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
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

        <TextInput
          style={styles.input}
          placeholder="Vérifiez votre mot de passe"
          secureTextEntry
          value={checkPassword}
          onChangeText={(text) => setCheckPassword(text)}
        />

        <Button title="Login" onPress={handleRegister} variant="large"/>

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
