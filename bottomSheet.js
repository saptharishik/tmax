import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const bottomSheet = () => {
  return (
    <View>
      <Text>bottomSheet</Text>
    </View>
  )
}

export default bottomSheet;


const styles = StyleSheet.create({
    backdrop:{
        position:'absolute',
        flex:1,
        top:0,
        left:0,
        backgroundColor:'rgba(0,0,0,0.5)',
        width:'100%',
    }
})