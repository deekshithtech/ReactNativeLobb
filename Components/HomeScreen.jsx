import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, getContent } from '../apiCollections';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ onNavigate }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) await loadContent(token);
        else await refreshToken();
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    init();
  }, []);

  const refreshToken = async () => {
    const token = await getToken();
    await AsyncStorage.setItem('authToken', token);
    await loadContent(token);
  };

  const loadContent = async token => {
    try {
      const data = await getContent(token);
      setContent(data);
    } catch (err) {
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    await refreshToken();
  };

  const currentDate = new Date()
    .toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    .toUpperCase();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Text style={styles.refreshText}>RETRY</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{currentDate}</Text>
        <View style={styles.headerRow}>
          <Text style={styles.todayText}>Today</Text>
          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>VS</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => onNavigate(content)}>
          <Image
            source={{ uri: content?.mainImage }}
            style={styles.cardImage}
          />
        </TouchableOpacity>

        <View style={styles.cardFooter}>
          <View style={styles.footerLeft}>
            <Image source={{ uri: content?.logo }} style={styles.logo} />
            <View style={styles.textBlock}>
              <Text style={styles.cardTitle}>{content?.title}</Text>
              <Text style={styles.cardSubtitle}>{content?.subTitle}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshText}>REFRESH</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: '9%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  refreshText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  dateText: {
    fontSize: 15,
    color: '#BDB9B9',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  vsCircle: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  vsText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    marginTop: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: screenWidth,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  logo: {
    width: 45,
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
});
