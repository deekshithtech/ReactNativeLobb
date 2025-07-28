import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CardFooter = ({ content, onBack }) => {
  return (
    <View style={styles.cardFooter}>
      <View style={styles.footerLeft}>
        <Image source={{ uri: content?.logo }} style={styles.logo} />
        <View style={styles.textBlock}>
          <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
            {content?.title}
          </Text>
          <Text style={styles.cardSubtitle} numberOfLines={1} ellipsizeMode="tail">
            {content?.subTitle}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={onBack}>
        <Text style={styles.refreshText}>REFRESH</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardFooter;

const styles = StyleSheet.create({
  cardFooter: {
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 45,
    borderRadius: 8,
  },
  textBlock: {
    marginLeft: 10,
    flexShrink: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  refreshText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3B67EB',
  },
  refreshButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
// deekshith reference