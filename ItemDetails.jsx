// ItemDetails.js
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const ItemDetails = ({ postId, fetchData }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetchData(postId)
      .then(response => response.json())
      .then(json => setDetails(json))
      .catch(error => console.error('Error fetching item details:', error));
  }, [postId, fetchData]);

  return (
    <View>
    {details ? (
      <View>
        
        
      </View>
    ) : (
      <Text>Loading...</Text>
    )}
  </View>
  );
};

export default ItemDetails;

