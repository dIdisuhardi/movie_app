import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Dimensions, Text, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { API_ACCESS_TOKEN } from '@env';
import MovieItem from '../movies/MovieItem';
import type { Movie } from '../../types/app';

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Halaman saat ini
  const { width } = Dimensions.get('window');

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [keyword]);

  const handleSubmit = (): void => {
    if (keyword) {
      fetchMovies();
    }
  };

  const fetchMovies = (): void => {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&page=${page}`;
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
        setMovies((prevMovies) => [...prevMovies, ...response.results]);
        setPage(page + 1);
      })
      .catch((error) => console.error('Error fetching movies:', error))
      .finally(() => setLoading(false));
  };

  const renderMovieItem = ({ item }: { item: Movie }): JSX.Element => {
    return (
      <TouchableOpacity style={styles.movieItemContainer}>
        <MovieItem 
          movie={item}
          size={{ width: width / 3 - 32, height: (width / 3 - 32) * 1.5 }} // Sesuaikan ukuran
          coverType="poster" />
      </TouchableOpacity>
    );
  };

  const renderSeparator = (): JSX.Element => {
    return <View style={styles.separator} />;
  };

  const renderFooter = (): JSX.Element | null => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input title movie here"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSubmit}
        />
        <FontAwesome name="search" size={20} color="black" style={styles.icon} />
      </View>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.movieList}
        numColumns={3}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderFooter}
        onEndReached={fetchMovies}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    marginLeft: 10,
    marginRight: 5,
  },
  movieList: {
    marginTop: 10,
  },
  separator: {
    width: '100%',
    height: 4,
  },
  movieItemContainer: {
    margin: 4, 
    borderRadius: 8, 
    overflow: 'hidden', 
  },
  loading: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default KeywordSearch;