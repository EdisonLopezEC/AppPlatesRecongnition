import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Svg, Circle } from "react-native-svg";
import { WebView } from "react-native-webview";
// import httpx from 'httpx';

const { width, height } = Dimensions.get("window");
const CARD_SIZE = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

const DetailScreen = ({ route }) => {
  const [dataForm, setDataForm] = useState({});
  const webViewRef = useRef(null);
  const [dueno, setDueno] = useState("");

  const { item } = route.params;

  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const consultarDueno = async (item) => {
      const url =
        `https://www.ecuadorlegalonline.com/modulo/sri/matriculacion/consultar-dueno.php?placa=${item}&_=` +
        new Date().getTime();
      const headers = {
        Host: "www.ecuadorlegalonline.com",
        Referer:
          "https://www.ecuadorlegalonline.com/consultas/consultar-dueno-de-vehiculo/",
      };

      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        console.log({ a: data });
        // Hacer un split por el caracter |
        const dataSplit = data.split("|");
        // Obtener el segundo elemento
        const datad = dataSplit[0];
        setDueno(datad);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    consultarDueno(item);
  }, []);

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
    opacity: scaleValue,
  };

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url, title, loading } = newNavState;

    if (!loading) {
      // La página ha cargado completamente, ahora podemos obtener el HTML
      webViewRef.current.injectJavaScript(`
        window.ReactNativeWebView.postMessage(document.documentElement.outerHTML);
      `);
    }
  };
  const handleMessage = (event) => {
    const html = event.nativeEvent.data;
    // console.log('HTML de la página:', html);

    const modeloMatch =
      /<td class="titulo">Modelo:<\/td>\s*<td class="detalle_formulario">([^<]*)<\/td>/i.exec(
        html
      );
    const claseMatch =
      /<td class="titulo">Clase:<\/td>\s*<td class="detalle_formulario">([^<]*)<\/td>/i.exec(
        html
      );
    const fechaMatriculaMatch =
      /<td class="titulo">Fecha de Matrícula:<\/td>\s*<td class="detalle_formulario">([^<]*)<\/td>/i.exec(
        html
      );
    const anioMatch =
      /<td class="titulo">Año:<\/td>\s*<td class="detalle_formulario">([^<]*)<\/td>/i.exec(
        html
      );
    const fechaCaducidadMatch =
      /<td class="titulo">Fecha de Caducidad:<\/td>\s*<td class="detalle_formulario">([^<]*)<\/td>/i.exec(
        html
      );
    const servicioMatch =
      /<td class="titulo">Servicio:<\/td>\s*<td class="detalle_formulario">([^<]*)<\/td>/i.exec(
        html
      );
    const marcaMatch =
      /<td class="titulo">Marca:<\/td>\s*<td class="detalle_formulario">([^<]*)<\/td>/i.exec(
        html
      );
    const colorMatch =
      /<td class="titulo">Color:<\/td>\s*<td class="detalle_formulario">([^<]*)<\/td>/i.exec(
        html
      );

    const modelo = modeloMatch ? modeloMatch[1].trim() : "";
    const clase = claseMatch ? claseMatch[1].trim() : "";
    const fechaMatricula = fechaMatriculaMatch
      ? fechaMatriculaMatch[1].trim()
      : "";
    const anio = anioMatch ? anioMatch[1].trim() : "";
    const fechaCaducidad = fechaCaducidadMatch
      ? fechaCaducidadMatch[1].trim()
      : "";
    const servicio = servicioMatch ? servicioMatch[1].trim() : "";
    const marca = marcaMatch ? marcaMatch[1].trim() : "";
    const color = colorMatch ? colorMatch[1].trim() : "";

    const resultadoJSON = {
      modelo: modelo,
      clase: clase,
      fechaMatricula: fechaMatricula,
      anio: anio,
      fechaCaducidad: fechaCaducidad,
      servicio: servicio,
      marca: marca,
      color: color,
    };

    console.log("JSON obtenido:", resultadoJSON);
    //Formatear para que solo la primera letra sea mayúscula

    setDataForm(resultadoJSON);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.maskContainer, animatedStyle]}>
        <Svg height={height * 2} width={width * 2}>
          <Circle cx={width} cy={height} r={CARD_SIZE} fill="white" />
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <View style={styles.header}>
          <TouchableOpacity>
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{item}</Text>
          <Entypo name="dots-three-horizontal" size={24} color="#fff" />
        </View>
        <View style={styles.content}>
          <Text style={styles.subHeader}>DATOS DEL VEHÍCULO</Text>
          <Text style={styles.location}>Dueño</Text>
          <Text style={styles.location}>{dueno}</Text>
          <Text style={styles.location}>Placa: {item}</Text>
          <Text style={styles.location}>Modelo: {dataForm.modelo}</Text>
          <Text style={styles.location}>Clase: {dataForm.clase}</Text>
          <Text style={styles.location}>
            Fecha de Matrícula: {dataForm.fechaMatricula}
          </Text>
          <Text style={styles.location}>Año: {dataForm.anio}</Text>
          <Text style={styles.location}>
            Fecha de Caducidad: {dataForm.fechaCaducidad}
          </Text>
          <Text style={styles.location}>Servicio: {dataForm.servicio}</Text>
          <Text style={styles.location}>Marca: {dataForm.marca}</Text>
          <Text style={styles.location}>Color: {dataForm.color}</Text>

          <View
            style={{
              maxHeight: 500,
              // Ocupa todo el ancho disponible
              minWidth: "50%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              zIndex: -1,
              // Bordes superiores redondeados
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              marginTop: 20,
            }}
          >
            <WebView
              ref={webViewRef}
              source={{
                uri: `https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_grid_citaciones.jsp?ps_tipo_identificacion=PLA&ps_identificacion=${item}&ps_placa=`,
              }}
              style={{ marginTop: 40, width: 390, maxHeight: 390, zIndex: 123 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={true}
              onMessage={handleMessage}
              onNavigationStateChange={handleWebViewNavigationStateChange}
              originWhitelist={["*"]} // Permitir todas las URL (ajusta según tus necesidades)
              //zoomm inicial
              showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
              showsHorizontalScrollIndicator={false} // Oculta l
              injectedJavaScript={`
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);
    true;
    //ocultar scroll vertical
    document.body.style.overflowY = 'hidden';
   
  `}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  maskContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    position: "absolute",
    width: width * 2,
    height: height * 1.19,
    borderRadius: CARD_SIZE,
    overflow: "hidden",
    backgroundColor: "#41226F",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    // Margin top responsive
    marginTop: width * 0.3,
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    fontSize: 20,
    color: "#fff",
    zIndex: 123,
  },
});

export default DetailScreen;
