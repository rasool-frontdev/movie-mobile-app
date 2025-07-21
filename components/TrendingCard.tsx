import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TrendingCard = ({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild className="flex-1">
      <TouchableOpacity className="relative w-32 pl-5">
        <Image source={{ uri: poster_url }} resizeMode="cover" className="h-48 w-32 rounded-lg" />
        <View className="absolute -left-3.5 bottom-9 rounded-full px-2 py-1">
          <MaskedView maskElement={<Text className="text-6xl font-bold text-white">{index + 1}</Text>}>
            <Image source={images.rankingGradient} className="size-14" resizeMode="cover" />
          </MaskedView>
        </View>
        <Text className="mt-2 text-sm font-bold text-light-200" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
