import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export default function ListaAnimais() {
  const [imagem, setImagem] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const buscarImagem = async () => {
    setCarregando(true);
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setImagem(data.message);
    } catch (error) {
      console.error(error);
    }
    setCarregando(false);
  };

  useEffect(() => {
    buscarImagem();
  }, []);

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={buscarImagem}>
        Buscar Imagem de Cão
      </Button>
      {carregando && <ActivityIndicator size="large" />}
      {imagem && <Image source={{ uri: imagem }} style={styles.imagem} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imagem: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});
