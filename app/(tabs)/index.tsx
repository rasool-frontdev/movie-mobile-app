import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
     <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold text-primary underline">
        Welcome to Nativewind!
      </Text>
      <View>
         <Link  href={{
      pathname: '/movie/[id]',
      params: { id: 'horor' }
    }}>Horor Movie</Link>
      </View>
    </View>
  );
}
