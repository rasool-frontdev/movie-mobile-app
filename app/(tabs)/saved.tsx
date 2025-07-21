import { icons } from '@/constants/icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

const Saved = () => {
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex flex-1 flex-col items-center justify-center gap-5">
        <Image source={icons.save} tintColor={'#fff'} />
        <Text className="text-base text-gray-500">Profile</Text>
      </View>
    </View>
  );
};

export default Saved;
