
import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage' 
import { useFocusEffect } from '@react-navigation/native' 
import { FontAwesome } from '@expo/vector-icons' 
import { LinearGradient } from 'expo-linear-gradient' 


const { width } = Dimensions.get('window') 
export default function Favorite({ navigation }: any): JSX.Element {
  const [favorites, setFavorites] = useState<any[]>([]) 
  const loadFavorites = async (): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData) {
        setFavorites(JSON.parse(initialData)) 
      }
    } catch (error) {
      console.log(error) 
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadFavorites() 
    }, []),
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites} 
        keyExtractor={(item) => item.id.toString()} 
        numColumns={3}
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false} 
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('MovieDetail', { id: item.id })} 
          >
            <ImageBackground
              resizeMode="cover"
              style={styles.poster} 
              imageStyle={styles.posterImageStyle} 
              source={{
                uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
              }} 
            >
              <LinearGradient
                colors={['#00000000', 'rgba(0, 0, 0, 0.7)']} 
                locations={[0.6, 0.8]} 
                style={styles.gradientStyle} 
              >
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={16} color="yellow" />
                  <Text style={styles.rating}>
                    {item.vote_average.toFixed(1)}
                  </Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Favorites</Text>
        } 
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16, 
  },
  itemContainer: {
    flex: 1 / 3, 
    aspectRatio: 2 / 3, 
    margin: 4, 
  },
  poster: {
    flex: 1, 
    borderRadius: 8,
    overflow: 'hidden', 
  },
  posterImageStyle: {
    borderRadius: 8, 
  },
  gradientStyle: {
    padding: 8, 
    height: '100%', 
    width: '100%', 
    borderRadius: 8, 
    display: 'flex', 
    justifyContent: 'flex-end', 
  },
  title: {
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold', 
  },
  ratingContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 2, 
  },
  rating: {
    color: 'yellow', 
    fontWeight: '700', 
  },
  emptyText: {
    fontSize: 18, 
    textAlign: 'center', 
    marginTop: 20,
  },
})