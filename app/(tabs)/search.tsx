import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/usefetch';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies = [],
    loading: moviesLoading,
    error: moviesError,
    reset,
    refetch: loadMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full flex-1" resizeMode="cover" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => <MovieCard {...item} />}
        ListHeaderComponent={
          <>
            <View className="mt-20 w-full flex-row justify-center">
              <Image source={icons.logo} className="h-10 w-12" />
            </View>
            <View className="my-5">
              <SearchBar placeholder="Search movies..." value={searchQuery} onChange={(text: string) => setSearchQuery(text)} />
            </View>
            {moviesLoading && <ActivityIndicator size={'large'} color={'#0000ff'} />}
            {moviesError && <Text className="my-3 px-5 text-red-500">Error: {moviesError.message}</Text>}
            {!moviesLoading && !moviesError && searchQuery.trim() && Array.isArray(movies) && movies.length > 0 && (
              <Text className="text-xl font-bold text-white">
                Search Results for <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">{searchQuery.trim() ? 'No results found' : 'Search for a movie'}</Text>
            </View>
          ) : null
        }
      />
      <Text>Search</Text>
    </View>
  );
};

export default Search;
