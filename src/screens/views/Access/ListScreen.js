import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,TouchableWithoutFeedback, Keyboard } from 'react-native';
import Collapsible from 'react-native-collapsible';

const ListWithSearch = () => {
  const items = [
    {
      id: 1,
      name: 'Item 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      expanded: false,
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      expanded: false,
    },
    {
      id: 3,
      name: 'Item 3',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      expanded: false,
    },
  ];
  const [search, setSearch] = useState('');
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleItemPress = (id) => {
    if (id === activeItem) {
      setActiveItem(null);
    } else {
      setActiveItem(id);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      {filteredItems.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.itemHeader}
            onPress={() => handleItemPress(item.id)}
          >
            <Text style={styles.itemHeaderText}>{item.name}</Text>
          </TouchableOpacity>
          <Collapsible collapsed={activeItem !== item.id}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </Collapsible>
        </View>
      ))}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  itemHeader: {
    backgroundColor: '#e6e6e6',
    padding: 16,
  },
  itemHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    padding: 16,
  },
  itemDescription: {
    marginBottom: 8,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
});

export default ListWithSearch;