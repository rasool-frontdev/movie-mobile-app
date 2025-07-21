import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChange?: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChange }: Props) => {
  return (
    <View className="flex-row items-center rounded-full bg-dark-200 px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor={'#ab8bff'} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={'#a8b5db'}
        className="ml-2 flex-1 text-white"
      />
    </View>
  );
};

export default SearchBar;
