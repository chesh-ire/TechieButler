import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

// Import the ItemDetails component from another file
import ItemDetails from './ItemDetails';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const heavyComputation = useMemo(() => {
    // Example heavy computation function, replace with your own logic
    const computeDetails = (item) => {
      // Simulating heavy computation by delaying execution
      const startTime = performance.now();
      // Your heavy computation logic here
      const details = `${item.id} - ${item.title}`;
      const endTime = performance.now();
      console.log(`Heavy computation took ${endTime - startTime} milliseconds`);
      return details;
    };

    return data.map(item => computeDetails(item));
  }, [data]);

  const fetchItemDetails = useCallback((postId) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }, []);

  // Separate rendering logic into a separate function
  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
    <Text style={styles.text}>{`ID: ${item.id}`}</Text>
    <Text style={styles.text}>{`Title: ${item.title}`}</Text>
    <Text style={styles.text}>{`Details: ${heavyComputation[index]}`}</Text>
    <ItemDetails postId={item.id} fetchData={fetchItemDetails} />
  </View>
   
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem} // Use the renderItem function
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5369ac',
    },
    itemContainer: {
      backgroundColor: '#110061',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      shadowColor: '#1100b6',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    text: {
      fontSize: 18,
      color: '#9653ac',
      marginBottom: 8,
    },
  });

export default App;







