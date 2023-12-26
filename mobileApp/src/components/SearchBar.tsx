import React, { useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface SearchBarProp {
    onSearch : any,
    variant : "light" | "dark", 
    placeholder:string
}
const SearchBar:  React.FC<SearchBarProp> = ({ onSearch, variant, placeholder}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (text:string) => {
    setSearchValue(text)
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={variant === "light" ? styles.inputLight : styles.input}
        placeholder={placeholder}
        placeholderTextColor={variant === 'light' ? "#E8E8E8" : "black"}
        value={searchValue}
        onChangeText={(text) => handleSearch(text)}
        inlineImageLeft = {variant=== 'light' ?  'search_light' : 'search'}
        inlineImagePadding={10} 
        cursorColor={variant === 'light' ? "#E8E8E8" : "default"}
        clearButtonMode={"while-editing"}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    color: "black",
    borderColor:"black",
  },
  inputLight: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderColor:"#E8E8E8",
    color: "#E8E8E8",
    borderRadius: 10,
  },
});

export default SearchBar;
