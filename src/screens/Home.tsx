import React from 'react'
import { View, Button,Text, StyleSheet} from 'react-native'

export default function Home({navigation}:any): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Movie Page</Text>
      <Button
        title="Go to MovieDetail" // Teks pada tombol
        onPress={() => navigation.navigate('MovieDetail')} // Fungsi yang dipanggil saat tombol ditekan
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', // Centered vertically
        alignItems: 'center', // Centered horizontally
        flex: 1,
      },
})
