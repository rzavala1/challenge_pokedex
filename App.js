import React, { useEffect, useState, useForceUpdate } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { nullableTypeAnnotation } from '@babel/types';

const App: () => Node = () => {

  const [index, setIndex] = useState(1);
  const [list, setList] = useState(null);
  const [ability, setAbility] = useState(true);
  const [type, setType] = useState(true);


  const getListPokemons = async () => {
    await getPokemon(index);
  };

  const getPokemon = async (id) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    let pokemon= await getApi(url);
    setList(getViewCard(pokemon));
  };

  const getViewCard =(pokemon) => {
    return <View style={styles.cardPokemon} key={1}>
      <Image style={styles.imagePokemon} source={{
        uri: pokemon.sprites.front_default,
      }} />
      <Text style={styles.name}>{pokemon.name}</Text>
    </View>;
  }

  const getAbility = async () => {
    if (ability) {
      const url = 'https://pokeapi.co/api/v2/ability/' + index;
      let pokemon= await getApi(url);
      setList(getViewAbility(pokemon));
    } else {
      getPokemon(index);
    }
    setAbility(!ability);
  }

  const getViewAbility =(pokemon) => {
    return <View style={styles.cardPokemon} key={2}>
    <Text style={styles.name}>Abilities</Text>
    {pokemon.effect_entries.map((obj) => (
      <Text style={styles.abilities}>{obj.language.name=="en"?obj.effect:null}</Text>
    ))}
  </View>;
  }

  const getApi=async (url) => {
    const rest = await fetch(url);
    const response = await rest.json();
    return response;
  }

  const getType = async () => {
    if (type) {
      const url = 'https://pokeapi.co/api/v2/type/' + index;
      let response= await getApi(url);
      setList(getViewType(response));
    }
  }


  const getViewType =(pokemon) => {
    return <View style={styles.cardPokemon}>
    <Text style={styles.name}>Type</Text>
    {pokemon.damage_relations.double_damage_from.map((obj) => (
      <Text style={styles.type} key={obj.name}>{obj.name}</Text>
    ))}
  </View>;
  }

  const rigthAdd = () => {
    if (index <= 150) {
      setAbility(true);
      let cont = index + 1;
      setIndex(cont);
      getListPokemons();
    }
  }

  const leftAdd = () => {
    if (index > 1) {
      setAbility(true);
      let cont = index - 1;
      setIndex(cont);
      getListPokemons();
    }
  }

  useEffect(() => {
    getListPokemons();
    return () => {
      setList(null);
      setIndex(1);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.backgroundStyle}>
        <View>
          <Image style={styles.imgHeader} source={require('./components/images/header.png')} />
        </View>
        <View style={styles.contScreen}>
          <View style={styles.mainScreen}>
            <ImageBackground style={styles.imgScreen} resizeMode="cover" source={require('./components/images/screen.png')} >
              <View style={styles.card}>
                <View style={styles.cardCont}>
                  {list != null ? list :
                    <View style={styles.cardPokemon}>
                      <Text style={styles.name}>{"pokemon"}</Text>
                    </View>}
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.mainControls}>
          <View>
            <TouchableOpacity onPress={getAbility}>
              <Image style={styles.imgButton} source={require('./components/images/button.png')} />
            </TouchableOpacity>
          </View>
          <View>
            <Image source={require('./components/images/button2.png')} />
          </View>
          <View>
            <Image source={require('./components/images/control.png')} />
            <TouchableOpacity style={styles.rigth} onPress={rigthAdd}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.left} onPress={leftAdd}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.top} onPress={getType}>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  type:{
    marginTop:5,
    fontSize: 15,
    color: "green"
  },
  abilities: {
    fontSize: 10,
    color: "#000000"
  },
  left: {
    width: 40,
    height: 40,
    left: 10,
    top: 45,
    position: "absolute"
  },
  rigth: {
    width: 40,
    height: 40,
    right: 10,
    top: 45,
    position: "absolute",
  },
  top: {
    width: 40,
    height: 40,
    left: 45,
    position: "absolute",
  },
  name: {
    color: "#000000",
    fontSize: 20
  },
  cardPokemon: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    padding: 5,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  imagePokemon: {
    width: 150,
    height: 150
  },
  cardCont: {
    width: "65%",
    height: "60%",
    marginTop: -35,
    borderRadius: 20,
  },
  card: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imgButton: {
    width: 80
  },
  mainControls: {
    flex: 1,
    flexWrap: "wrap",
    alignContent: "space-between",
    padding: 5,
  },
  contScreen: {
    width: "100%",
    alignItems: "center",
    height: 350,
  },
  mainScreen: {
    width: "95%",
    flex: 1,
    padding: 15,
    paddingBottom: 15,
  },
  imgScreen: {
    width: "100%",
    height: "100%",
  },
  imgHeader: {
    marginLeft: -10
  },
  backgroundStyle: {
    backgroundColor: "#DE092F",
    width: "100%",
    height: "100%",
    padding: 0
  },


});

export default App;
