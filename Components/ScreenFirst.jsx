import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import CardFooter from './CardFooter';

const screenWidth = Dimensions.get('window').width;

const Screen2 = ({ content, onBack }) => {
  return (
    <ScrollView style={styles.mainContainer}>
      <ImageBackground source={{ uri: content?.mainImage }} style={styles.detailImage}>
        <View style={styles.detailHeader}>
          <Text style={styles.detailTitle}>MAJOR UPDATE</Text>
          <Text style={styles.detailSubtitle}>Only I Can Call My Dream Stupid</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onBack}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </ImageBackground>

      <View style={{ backgroundColor: '#f5f5f5', paddingBottom: 2 }}>
  <CardFooter content={content} onBack={onBack} />
</View>

   <View style={styles.htmlContainer}>
  <RenderHtml
    contentWidth={screenWidth}
    source={{ html: content?.text }}
    baseStyle={{ fontSize: 16, color: '#000' }}
  />
  {content?.thumbNailImage && (
    <Image source={{ uri: content?.thumbNailImage }} style={styles.cardImage} />
  )}
</View>

      <View style={styles.cardFooterColumn}>
        <Image source={{ uri: content?.logo }} style={styles.logo} />
        <Text style={styles.cardTitle}>{content?.title}</Text>
        <Text style={styles.cardSubtitle}>{content?.subTitle}</Text>

        <TouchableOpacity style={styles.refreshButton2} onPress={onBack}>
          <Text style={{ color: "#F5F5F7", fontWeight: "500" }}>REFRESH</Text> 
        </TouchableOpacity>
        <Text>In-App Purchase</Text>
      </View>
    </ScrollView>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  detailImage: {
    width: '100%',
    height: 440,
    elevation: 5,
  },
  detailHeader: {
    marginTop: 54,
    paddingHorizontal: 25,
  },
  detailTitle: {
    color: '#E8E3E3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailSubtitle: {
    color: '#fff',
    fontSize: 27,
    width: '80%',
    fontWeight: 'bold',
    marginTop: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  htmlContainer: {
    marginTop:10,
    paddingHorizontal:15,
    backgroundColor: '#fff',
  },
  cardFooterColumn: {
    marginVertical: 20,
    paddingVertical: 18,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: 10,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#E3E1E1',
    elevation: 3,
  },
  logo: {
    width: 50,
    height: 45,
    borderRadius: 8,
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
  refreshButton2: {
    backgroundColor: '#2B2BE3',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardImage: {
    marginTop: 20,
    borderRadius: 10,
    width: '100%',
    height: 500,
  },
});
