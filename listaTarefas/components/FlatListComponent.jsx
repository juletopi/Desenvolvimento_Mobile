import React from 'react';
import { FlatList } from 'react-native';

const FlatListComponent = ({ data, renderItem, keyExtractor, style }) => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    style={style}
  />
);

export default FlatListComponent;
