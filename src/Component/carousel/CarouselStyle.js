import React from 'react';
import {StyleSheet} from 'react-native';

const CarouselStyle = StyleSheet.create({
  dotView: {

    flexDirection: 'row',
    justifyContent: 'center',

  },

  activeDot: {
    height: 10,
    width: 10,
    backgroundColor: 'black',
    margin: 8,
    borderRadius: 5,
  },

  disActiveDot: {
    height: 10,
    width: 10,
    backgroundColor: 'gray',
    margin: 8,
    borderRadius: 5,
  },
});
export default CarouselStyle;
