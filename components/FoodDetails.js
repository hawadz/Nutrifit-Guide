import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const FoodDetails = ({ route }) => {
  const { food } = route.params;
  const [foodDetails, setFoodDetails] = useState(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.post(
          'https://trackapi.nutritionix.com/v2/natural/nutrients',
          {
            query: food.food_name,
          },
          {
            headers: {
              'x-app-id': '3f498e11',
              'x-app-key': '1bd7158ae10390a0485d4c7246f7e440',
              'Content-Type': 'application/json',
            },
          }
        );
        setFoodDetails(response.data.foods[0]);
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    };

    fetchFoodDetails();
  }, [food.food_name]);

  if (!foodDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Memuat...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {foodDetails.photo && (
        <Image
          source={{ uri: foodDetails.photo.highres }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{foodDetails.food_name}</Text>
      <Text style={styles.detail}>Kalori: {foodDetails.nf_calories}</Text>
      <Text style={styles.detail}>Protein: {foodDetails.nf_protein}g</Text>
      <Text style={styles.detail}>Karbohidrat: {foodDetails.nf_total_carbohydrate}g</Text>
      <Text style={styles.detail}>Lemak: {foodDetails.nf_total_fat}g</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Center text
  },
  detail: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center', // Center text
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default FoodDetails;
