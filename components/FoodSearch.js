import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const FoodSearch = ({ navigation, route }) => {
  const { mealType } = route.params;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchFood = async () => {
    try {
      const response = await axios.get(`https://trackapi.nutritionix.com/v2/search/instant`, {
        params: {
          query: query,
        },
        headers: {
          'x-app-id': '3f498e11',
          'x-app-key': '1bd7158ae10390a0485d4c7246f7e440',
        }
      });
      setResults(response.data.common);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const handleFoodSelect = (food) => {
    navigation.navigate('FoodDetails', { food });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Food</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search food..."
      />
      <TouchableOpacity style={styles.button} onPress={searchFood}>
        <Text style={styles.buttonText}>Cari</Text>
      </TouchableOpacity>
      <FlatList
        data={results}
        keyExtractor={(item) => item.food_name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFoodSelect(item)} style={styles.resultItem}>
            <Text style={styles.resultText}>{item.food_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#B2D8B2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultItem: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  resultText: {
    fontSize: 16,
  },
});

export default FoodSearch;
