import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Diary = ({ navigation }) => {
  const calories = useSelector((state) => state.calorie.calories) || 0; // Default value 2000 kcal
  const meals = useSelector((state) => state.meal.meals);
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const breakfastCalories = (calories * 0.3).toFixed(0);
    const lunchCalories = (calories * 0.4).toFixed(0);
    const dinnerCalories = (calories * 0.3).toFixed(0);

    setMealPlans([
      { id: '1', name: 'Breakfast', recommended: `${breakfastCalories} kcal` },
      { id: '2', name: 'Lunch', recommended: `${lunchCalories} kcal` },
      { id: '3', name: 'Dinner', recommended: `${dinnerCalories} kcal` },
    ]);
  }, [calories]);

  const renderMeal = ({ item }) => (
    <View style={styles.mealContainer}>
      <Text style={styles.mealName}>{item.name}</Text>
      <Text style={styles.recommendedText}>Recommended: {item.recommended}</Text>
      <FlatList
        data={meals[item.name] || []}
        keyExtractor={(food) => food.food_name}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text>{item.food_name}</Text>
            <Text>{item.nf_calories} kcal</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FoodSearch', { mealType: item.name })}
      >
        <Text style={styles.buttonText}>Add {item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Guide</Text>

      <View style={styles.card}>
        <MaterialCommunityIcons name="fire" size={40} color="orange" />
        <Text style={styles.resultTitle}>Estimated Calories:</Text>
        <Text style={styles.result}>{calories} kcal/day</Text>
      </View>

      <FlatList
        data={mealPlans}
        keyExtractor={(item) => item.id}
        renderItem={renderMeal}
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
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  result: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  mealContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  mealName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendedText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  button: {
    backgroundColor: '#B2D8B2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Diary;
