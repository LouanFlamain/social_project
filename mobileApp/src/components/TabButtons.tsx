import React, { useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

interface TabButtonsProp {
    buttons: ButtonType[],
    handleFiltres: any
}

interface ButtonType{
    value : string,
    label : string
}

const TabButtons:  React.FC<TabButtonsProp> = ({buttons, handleFiltres}) => {
const [value, setValue] = React.useState('');

const handleValue = (text : string) =>{
setValue(text)
handleFiltres(text)
}

  return (
    <View >
        <SegmentedButtons
        buttons={buttons}
        value={value}
        onValueChange={handleValue}
        style={styles.tab}/>

    </View>
  );
};

const styles = StyleSheet.create({
    tab:{
        width: "100%"
    }

});

export default TabButtons;
