import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel_Item from '../carousel_Item/Carousel_Item';
import CarouselStyle from './CarouselStyle';
import {dummyData} from '../../data/Data';
const {width, heigth} = Dimensions.get('window');

const Carousel = () => {
  const scroll = useRef(null);
  const [imageActiv, setImageActive] = useState(0);
  const [dataList, setDataList] = useState(dummyData);
  const [offset, setOffset] = useState(0);

  const onViewableItemsChanged = useRef(({changed}) => {
    const {index} = changed.find(({isViewable}) => isViewable) || {};
    setImageActive(index);
  });

  function infiniteScroll(dataList) {
    const numberOfData = dataList.length;
    let scrollValue = 0,
          scrolled = 0;

    setInterval(function () {
      scrolled++;
      if (scrolled < numberOfData) {
        scrollValue = scrollValue + width;
      } else {
        scrollValue = 0;
        scrolled = 0;
      }

      scroll.current.scrollToOffset({animated: true, offset: scrollValue});
    }, 3000);
  }

  useEffect(() => {
    infiniteScroll(dataList);
  }, [dataList]);

  const dotIsActive = index => () => {
    const scrollDot = scroll.current.scrollToIndex({
      animated: true,
      index,
    });
    return setImageActive(index);
  };

  const dotView = useMemo(() => {
    return dataList.map((_, index) => {
      return (
        <TouchableOpacity
          onPress={dotIsActive(index)}
          key={index}
          style={
            index === imageActiv
              ? CarouselStyle.activeDot
              : CarouselStyle.disActiveDot
          }
        />
      );
    });
  }, [dataList, imageActiv]);

  return (
    <View>
      <FlatList
        ref={scroll}
        data={dataList}
        keyExtractor={(item, index) => 'key' + index}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        renderItem={({item}) => {
          return <Carousel_Item item={item} />;
        }}
      />

      <View style={CarouselStyle.dotView}>{dotView}</View>
    </View>
  );
};

export default Carousel;
