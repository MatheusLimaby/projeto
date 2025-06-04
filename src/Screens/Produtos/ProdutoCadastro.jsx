import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";

export default function ProdutoCadastro() {
  const navigation = useNavigation();
  const route = useRoute();
  const produtoEditar = route.params?.produto;

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [descricao, setDescricao] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (produtoEditar) {
      setNome(produtoEditar.nome);
      setPreco(`R$ ${produtoEditar.preco.toFixed(2).replace(".", ",")}`);
      setCategoria(produtoEditar.categoria);
      setQuantidade(produtoEditar.quantidade.toString());
      setDescricao(produtoEditar.descricao);
    }
  }, [produtoEditar]);

  const validarCampos = () => {
    const newErrors = {};

    if (!nome.trim()) newErrors.nome = "Nome é obrigatório.";
    if (!preco.trim()) newErrors.preco = "Preço é obrigatório.";
    else {
      const precoNumber = parseFloat(
        preco.replace(/[R$\s]/g, "").replace(",", ".")
      );
      if (isNaN(precoNumber) || precoNumber <= 0)
        newErrors.preco = "Preço inválido.";
    }
    if (!categoria.trim()) newErrors.categoria = "Categoria é obrigatória.";
    if (!quantidade.trim()) newErrors.quantidade = "Quantidade é obrigatória.";
    else if (isNaN(parseInt(quantidade)) || parseInt(quantidade) < 0)
      newErrors.quantidade = "Quantidade inválida.";
    if (!descricao.trim()) newErrors.descricao = "Descrição é obrigatória.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const limparPreco = (precoMask) => {
    return precoMask.replace(/[R$\s]/g, "").replace(",", ".");
  };

  const salvarProduto = async () => {
    if (!validarCampos()) {
      Alert.alert("Erro", "Por favor, corrija os erros antes de salvar.");
      return;
    }

    const novoProduto = {
      id: produtoEditar ? produtoEditar.id : Date.now().toString(),
      nome: nome.trim(),
      preco: parseFloat(limparPreco(preco)),
      categoria: categoria.trim(),
      quantidade: parseInt(quantidade),
      descricao: descricao.trim(),
    };

    try {
      const dados = await AsyncStorage.getItem("produtos");
      let produtos = dados ? JSON.parse(dados) : [];

      if (produtoEditar) {
        // Atualiza produto existente
        produtos = produtos.map((p) =>
          p.id === novoProduto.id ? novoProduto : p
        );
      } else {
        // Adiciona novo produto
        produtos.push(novoProduto);
      }

      await AsyncStorage.setItem("produtos", JSON.stringify(produtos));
      Alert.alert(
        "Sucesso",
        `Produto ${produtoEditar ? "atualizado" : "salvo"} com sucesso!`
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o produto.");
    }
  };

  return (
    <View style={styles.container}>
      {/* inputs iguais ao exemplo anterior, com erros */}
      <TextInput
        label="Nome do Produto"
        value={nome}
        onChangeText={setNome}
        mode="outlined"
        style={styles.input}
        error={!!errors.nome}
      />
      <HelperText type="error" visible={!!errors.nome}>
        {errors.nome}
      </HelperText>

      <TextInput
        label="Preço"
        value={preco}
        onChangeText={setPreco}
        mode="outlined"
        style={styles.input}
        error={!!errors.preco}
        keyboardType="numeric"
        render={(props) => (
          <MaskedTextInput
            {...props}
            mask="R$ 9999,99"
            keyboardType="numeric"
          />
        )}
      />
      <HelperText type="error" visible={!!errors.preco}>
        {errors.preco}
      </HelperText>

      <TextInput
        label="Categoria"
        value={categoria}
        onChangeText={setCategoria}
        mode="outlined"
        style={styles.input}
        error={!!errors.categoria}
      />
      <HelperText type="error" visible={!!errors.categoria}>
        {errors.categoria}
      </HelperText>

      <TextInput
        label="Quantidade em Estoque"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
        error={!!errors.quantidade}
      />
      <HelperText type="error" visible={!!errors.quantidade}>
        {errors.quantidade}
      </HelperText>

      <TextInput
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        mode="outlined"
        style={styles.input}
        error={!!errors.descricao}
      />
      <HelperText type="error" visible={!!errors.descricao}>
        {errors.descricao}
      </HelperText>

      <Button mode="contained" onPress={salvarProduto} style={styles.button}>
        {produtoEditar ? "Atualizar Produto" : "Salvar Produto"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
  },
});
