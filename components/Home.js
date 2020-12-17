import React from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'

export default function Home({navigation, route}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity 
        style={styles.button}
        onPress={()=> {navigation.navigate("List")}}>
        <Text
          style={styles.text}>Restaurants nearby</Text>
      </TouchableOpacity>
      <Text style={styles.textOut}>Get a list of all the restaurants near you.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#B40000",
    padding: 20,
    borderRadius: 12
  },
  text: {
    color: "white",
    fontSize: 30,
  },
  textOut: {
    paddingTop: 10,
    fontSize: 16,
  }
})