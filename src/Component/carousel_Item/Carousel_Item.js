import React from 'react';
import Carousel_ItemStyle from '../carousel_Item/Carousel_ItemStyle';
import { Image, Text, View } from "react-native";

const Carousel_Item = ({item}) => {
  return (
    <View style={Carousel_ItemStyle.cardView}>
      <Image style={Carousel_ItemStyle.image} source={{uri: item.url}} />
      <View style={Carousel_ItemStyle.textView}>
        <Text style={Carousel_ItemStyle.itemTitle}> {item.title}</Text>
        <Text style={Carousel_ItemStyle.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );
};
export default Carousel_Item;
