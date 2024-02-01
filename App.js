import React, { useState, useEffect } from "react";
import { View, Text,Image } from "react-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import Svg, { Polygon } from "react-native-svg";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TopCarousel from "./components/TopCarousel";
import DetailScreen from "./DetailScreen";
import AwesomeButton from "react-native-really-awesome-button";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  orderBy
} from 'firebase/firestore/lite';
import { db } from './firebase';




const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
                  options={{ headerShown: false }}  

        />
        <Stack.Screen name="DetailScreen" component={DetailScreen} 
                  options={{ headerShown: false }} 

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {

  const [plates, setPlates] = useState([]);

  const getPlates = async () => {
    console.log("------------------");
    // Array de tipos de actividades
    const plates = collection(db, 'plates');
  
    // Modifica la consulta para ordenar por fecha de manera descendente
    const platesSnap = await getDocs(query(plates, orderBy('timestamp', 'desc')));
  
    // console.log(platesSnap)
    const data = platesSnap.docs.map((doc) => doc.data());
    const numbers = data.map((tipo) => {
      const count = tipo.count.toString(); // Convertir a cadena para facilitar la manipulación
  
      if (count.length > 3) {
        // Verificar si la longitud es mayor a 3
        const primerosTres = count.substring(0, 3);
        const restantes = count.substring(3);
  
        // Verificar si los caracteres restantes son solo tres dígitos
        if (/^\d{3}$/.test(restantes)) {
          // Agregar un cero después de la tercera letra si los caracteres restantes son solo tres dígitos
          return primerosTres + '0' + restantes;
        } else {
          // Mantener la cadena sin cambios si tiene más de tres dígitos después de la tercera letra
          return count;
        }
      } else {
        // Mantener la cadena sin cambios si tiene 3 o menos caracteres
        return count;
      }
    });
  
    setPlates(numbers);
};

// const deletePlate = async (plate) => {
//   const plateRef = doc(db, 'plates', plate);
  
//   // Eliminar placa

//   await setDoc(plateRef, {
//     count: 0,
//     timestamp: new Date(),
//   });

//   await getPlates();

// }

  useEffect(() => {
    getPlates();
    console.log('USE EFFECT')
  }
  , []);

  //

  return (
    <View style={styles.container}>
      {/* Contenido principal */}


      <Text 
        style={styles.title}
        className="text-3xl text-white font-extrabold mt-12 px-4 text-center bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-md">
        PLACAS DETECTADAS
      </Text>
      <View style={styles.content}>

  
        <TopCarousel
          list={plates}
        />
      </View>

      <View style={styles.con}>
        <AwesomeButton
          width={300}
          progress
          backgroundColor="rgb(100, 61, 136)"
          onPress={async (next) => {
            // Recargar la lista de placas
            await getPlates();
            //Posicionar el carrusel en la primera placa




            next();
          }}
        >
          Recargar
        </AwesomeButton>
      </View>
      {/* Svg con movimineto */}

      {/* Triángulo amarillo arriba */}
      <Svg
        style={styles.triangleTop}
        height="150%"
        width="100%"
        viewBox="0 0 100 150"
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" style={{ stopColor: "yellow", stopOpacity: 1 }} />
            <Stop
              offset="100%"
              style={{ stopColor: "transparent", stopOpacity: 0 }}
            />
          </LinearGradient>
        </Defs>
        <Polygon
          points="0,0 50,150 100,0"
          fill="url(#grad)"
          stroke="black" // Color del borde
          strokeWidth="2" // Ancho del borde
          strokeOpacity="0.06"
        />
      </Svg>

      {/* Triángulo morado neon abajo */}
      <Svg
        style={styles.triangleBottom}
        height="150%"
        width="100%"
        viewBox="0 0 100 150"
      >
        <Defs>
          <LinearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="100%">
            <Stop offset="0%" style={{ stopColor: "purple", stopOpacity: 1 }} />
            <Stop
              offset="100%"
              style={{ stopColor: "transparent", stopOpacity: 0 }}
            />
          </LinearGradient>
        </Defs>
        <Polygon
          points="0,150 50,0 100,150"
          fill="url(#grad2)"
          stroke="white" // Color del borde
          strokeWidth="2" // Ancho del borde
          strokeOpacity="0.06"
        />
      </Svg>
    </View>
  );
}

const styles = {
  title: {
    // text-3xl text-white font-extrabold mt-12 px-4 text-center bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-md
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginTop: 50,
    paddingHorizontal: 4,
    textAlign: "center",
    paddingVertical: 6,
    color: "#fff",

  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1a202c",
    position: "relative",
  },
  content: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  con: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  triangleTop: {
    position: "absolute",
    top: -800,
    zIndex: -1,
    transform: [{ rotate: "120deg" }],
  },
  triangleBottom: {
    position: "absolute",
    bottom: "-90%",
    zIndex: -1,
    transform: [{ rotate: "120deg" }],
  },
};
