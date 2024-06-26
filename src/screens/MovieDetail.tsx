import React from 'react'
import { View, Button,Text, StyleSheet} from 'react-native'

export default function MovieDetail({navigation}:any): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Movie Detail Page</Text>
      <Button
        title="Kembali" // Teks pada tombol
        onPress={() => navigation.navigate('Home')} // Fungsi yang dipanggil saat tombol ditekan
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
