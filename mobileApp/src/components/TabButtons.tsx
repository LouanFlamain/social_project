import React, { useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

interface TabButtonsProp {
    buttons: ButtonType[]
}

interface ButtonType{
    value : string,
    label : string
}

const TabButtons:  React.FC<TabButtonsProp> = ({buttons}) => {
const [value, setValue] = React.useState('');

  return (
    <View >
        <SegmentedButtons
        buttons={buttons}
        value={value}
        onValueChange={setValue}
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
