import React from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, shadow, sizes, spacing } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';


const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopCarousel = ({ list }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      // keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: spacing.l,
              marginTop: spacing.xl,
              marginRight: index === list.length - 1 ? spacing.l : 0,
            }}
            onPress={() => navigation.navigate('DetailScreen', { item })}
          >
            <View style={[styles.card, shadow.dark]}>
              <View style={styles.imageBox}>
                
                {/* Componente parecido a una placa con fondo blanco y bordes redondeados */}
                <View
                  style={{
                    position: 'absolute',
                    top: spacing.m,
                    left: spacing.m,
                    right: spacing.m,
                    bottom: spacing.m,
                    backgroundColor: colors.white,
                    borderRadius: sizes.radius,
                    // Borde de la placa
                    borderWidth: 7,
                    borderColor: colors.primary,
                  }}
                />
                {/* Centrado y pequeño */}
                <Text
                  style={{
                    position: 'absolute',
                    top: 30,
                    left: spacing.m,
                    right: spacing.m,
                    bottom: spacing.m,
                    color: colors.primary,
                    fontSize: 10,
                    fontWeight: 900,
                    textAlign: 'center',
                  }}
                >
                  ECUADOR
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    top: 40,
                    left: spacing.m,
                    right: spacing.m,
                    bottom: spacing.m,
                    color: colors.primary,
                    fontSize: 55,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {/* Mostrar item con un guion despues del tercer caracter */}
                  {item.substring(0, 3)}{'-'}{item.substring(3)}
                </Text>
                

                
                
   
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title} numberOfLines={1}>
                  {item}
                </Text>
                <Text style={styles.location}>Placa Vehicular</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
    borderRadius: sizes.radius,
    backgroundColor: '#41226F',
    overflow: 'hidden',
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
  },
  imageBox: {
    width: '100%',
    height: '70%', // Ajusta la altura según tus necesidades
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: spacing.m,
    padding: spacing.m,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para el texto
    borderBottomLeftRadius: sizes.radius,
    borderBottomRightRadius: sizes.radius,
    width: '100%',
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default TopCarousel;
