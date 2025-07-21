import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import TrendingCard from '@/components/TrendingCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { getTrendingMovies } from '@/services/appwrite';
import useFetch from '@/services/usefetch';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  const { data: trendingMovies, loading: trendingLoading, error: trendingError } = useFetch(getTrendingMovies);

  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}
        className="flex-1 px-5"
      >
        <Image source={icons.logo} className="mx-auto mb-5 mt-20 h-10 w-12" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator size={'large'} color="#ab8bff" className="mt-10 self-center" />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="mt-5 flex-1">
            <SearchBar onPress={() => router.push('/search')} placeholder="Search for a movie" />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="mb-3 text-lg font-bold text-white">Trending Movies</Text>
              </View>
            )}
            <>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                className="mb-4 mt-3"
                data={trendingMovies}
                renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                keyExtractor={(item) => item?.movie_id.toString()}
              />

              <Text className="mb-3 mt-5 text-lg font-bold text-white">Lates Movies</Text>
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                data={movies}
                className="mt-2 pb-32"
                scrollEnabled={false}
                renderItem={({ item }) => <MovieCard {...item} />}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
