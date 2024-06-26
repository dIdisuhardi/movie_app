import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity,} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import type { Genre } from '../../types/app';
import { API_ACCESS_TOKEN } from '@env';

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = (): void => {
    const url = `https://api.themoviedb.org/3/genre/movie/list`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setGenres(response.genres);
      })
      .catch((error) => console.error('Error fetching genres:', error));
  };

  const handlePress = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const navigation = useNavigation();
  
  const handleSearch = () => {

    navigation.dispatch(StackActions.push('CategorySearchResult', { selectedGenres }));
    console.log('Searching for movies with genres:', selectedGenres);
  };

  return (
    <View style={styles.container}>
      {genres.map((genre) => (
        <TouchableOpacity
          key={genre.id}
          activeOpacity={0.9}
          style={{
            ...styles.topBar,
            backgroundColor: selectedGenres.includes(genre.id) ? '#8978A4' : '#dfd7ec',
            borderRadius: 10,
          }}
          onPress={() => handlePress(genre.id)}
        >
          <Text style={styles.topBarLabel}>{genre.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 45,
    marginBottom: 4,
  },
  topBarLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  searchButton: {
    backgroundColor: '#8c77a7',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
    marginTop: 16,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default CategorySearch;