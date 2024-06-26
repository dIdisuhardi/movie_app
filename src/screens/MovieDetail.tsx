import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons' 
import { API_URL, API_ACCESS_TOKEN } from '@env' 
import MovieList from '../components/movies//MovieList' 

const MovieDetail = ({ route, navigation }: any): JSX.Element => {
  const { id } = route.params
  const [movie, setMovie] = useState<any>(null) 
  const [recommendations, setRecommendations] = useState<any[]>([]) 

  const fetchData = (): void => {
   
    if (API_URL == null || API_ACCESS_TOKEN == null) {
      throw new Error('ENV not found')
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        Authorization: `Bearer ${API_ACCESS_TOKEN}`, 
      },
    }

    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then((response) => response.json()) 
      .then((response) => {
        setMovie(response) 
      })
      .catch((err) => {
        console.error(err) 
      })
  }

  const fetchRecommendations = (): void => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
        Authorization: `Bearer ${API_ACCESS_TOKEN}`, 
      },
    }

    fetch(
      `${API_URL}/movie/${id}/recommendations?language=en-US&page=1`,
      options,
    )
      .then((response) => response.json()) 
      .then((response) => {
        setRecommendations(response.results) 
      })
      .catch((err) => {
        console.error(err) 
      })
  }
  useEffect(() => {
    fetchData() 
    fetchRecommendations() 
  }, [id])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {movie && ( 
          <>
            <View style={styles.posterContainer}>
              <Image
                style={styles.poster}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }} 
              />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{movie.title}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="yellow" />
                <Text style={styles.rating}>
                  {movie.vote_average}
                </Text>
              </View>
            </View>
            <View style={{padding: 16}}>
            <Text style={styles.overview}>{movie.overview}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Original Language:</Text>
                <Text style={styles.value}>{movie.original_language}</Text>
                <Text style={styles.label}>Release Date:</Text>
                <Text style={styles.value}>{movie.release_date}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Popularity:</Text>
                <Text style={styles.value}>{movie.popularity}</Text>
                <Text style={styles.label}>Vote Count:</Text>
                <Text style={styles.value}>{movie.vote_count}</Text>
              </View>
            </View>
            </View>
            
          </>
        )}
        <MovieList
          title="Recommendations" 
          path={`movie/${id}/recommendations?language=en-US&page=1`} 
          coverType="poster" 
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
  },
  container: {
    
    paddingBottom: 35, 
  },
  posterContainer: {
    position: 'relative', 
    width: '100%', 
    height: 480,
  },
  poster: {
    width: '100%', 
    height: '100%',
  },
  titleContainer:{
    position: 'absolute', 
    bottom: 30, 
    left: 16, 
  },
  ratingContainer: {
    position: 'absolute', 
    bottom: 15, 
    left: 16, 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 5, 
    borderRadius: 5, 
    },
  rating: {
    fontSize: 16, 
    color: 'yellow', 
    marginLeft: 5, 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    color: 'white',
  },
  overview: {
    fontSize: 16, 
    marginBottom: 16, 
  },
  label: {
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 4, 
  },
  value: {
    fontSize: 16, 
    marginBottom: 12, 
  },
})

export default MovieDetail 