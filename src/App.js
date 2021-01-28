import React, { useState } from 'react';
import Pagination from './Pagination';
import './App.css';

const App = () => {
  const pokemonNames = {};
  const [pokemon, setPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [currentId, setCurrentId] = useState();

  const getPokemon = async function () {
    const toArray = [];
    const pokemonTypes = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await fetch(url);
      const data = await res.json();
      toArray.push(data);
      data.types.forEach(type => pokemonTypes.push(type.type.name));
      setPokemonType(pokemonTypes);
      setPokemonData(toArray);
      setCurrentId(toArray[0].id);
    } catch (err) {
      alert(
        "We couldn't find that Pokémon. Make sure you don't have any typos and try again!"
      );
      console.log(err);
    }
  };

  const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomPokemon = async function () {
    // get a random number between 1 and 898 (all pokemon)
    const random = randomInt(1, 898);
    const pokemonTypes = [];
    const toArray = [];
    try {
      // fetch a list of all pokemon
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
      const fetchPro = fetch(url);
      const res = await fetchPro;
      const data = await res.json();

      // push all pokemon to pokemonNames with an id
      for (let i = 0; i < data.results.length; i++) {
        pokemonNames[i] = data.results[i].name;
      }

      // fetch a random pokemon from pokemonNames
      const url2 = `https://pokeapi.co/api/v2/pokemon/${
        pokemonNames[random - 1]
      }`;
      const res2 = await fetch(url2);
      const data2 = await res2.json();

      toArray.push(data2);
      data2.types.forEach(type => pokemonTypes.push(type.type.name));
      setPokemonType(pokemonTypes);
      setPokemonData(toArray);
      setCurrentId(toArray[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  const getNextPokemon = async function () {
    const pokemonTypes = [];
    const toArray = [];
    try {
      // fetch a list of all pokemon
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
      const fetchPro = fetch(url);
      const res = await fetchPro;
      const data = await res.json();

      // push all pokemon to pokemonNames with an id
      for (let i = 0; i < data.results.length; i++) {
        pokemonNames[i] = data.results[i].name;
      }

      // fetch the next pokemon from pokemonNames based on current id
      const url2 = `https://pokeapi.co/api/v2/pokemon/${pokemonNames[currentId]}`;
      const res2 = await fetch(url2);
      const data2 = await res2.json();

      toArray.push(data2);
      data2.types.forEach(type => pokemonTypes.push(type.type.name));
      setPokemonType(pokemonTypes);
      setPokemonData(toArray);
      setCurrentId(toArray[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  const getPrevPokemon = async function () {
    const pokemonTypes = [];
    const toArray = [];
    try {
      // fetch a list of all pokemon
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
      const fetchPro = fetch(url);
      const res = await fetchPro;
      const data = await res.json();

      // push all pokemon to pokemonNames with an id
      for (let i = 0; i < data.results.length; i++) {
        pokemonNames[i] = data.results[i].name;
      }

      // fetch the previous pokemon from pokemonNames based on current id
      const url2 = `https://pokeapi.co/api/v2/pokemon/${
        pokemonNames[currentId - 2]
      }`;
      const res2 = await fetch(url2);
      const data2 = await res2.json();

      toArray.push(data2);
      data2.types.forEach(type => pokemonTypes.push(type.type.name));
      setPokemonType(pokemonTypes);
      setPokemonData(toArray);
      setCurrentId(toArray[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = e => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    getPokemon();
  };

  const handleClick = () => {
    getRandomPokemon();
  };

  const goToNextPokemon = () => {
    getNextPokemon();
  };

  const goToPrevPokemon = () => {
    getPrevPokemon();
  };

  return (
    <div className="tc">
      <h1 className="f2 white">Pokédex</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter pokemon name"
          />
        </label>
      </form>
      <p className="white">OR</p>
      <button class="random" onClick={handleClick}>
        🔀 Surprise Me!
      </button>
      <Pagination
        goToNextPokemon={currentId < 898 ? goToNextPokemon : null}
        goToPrevPokemon={currentId > 1 ? goToPrevPokemon : null}
      />
      {pokemonData.map(data => {
        return (
          <div className="container">
            <img
              src={data.sprites.other['official-artwork']['front_default']}
              alt="pokémon"
            />
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">Name</div>
                  <div className="divTableCell">
                    {`${data.name[0].toUpperCase()}${data.name.slice(1)}`}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Number</div>
                  <div className="divTableCell">{data.id}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Type</div>
                  <div className="divTableCell">
                    {pokemonType.length > 1
                      ? `${pokemonType[0][0].toUpperCase()}${pokemonType[0].slice(
                          1
                        )}, ${pokemonType[1][0].toUpperCase()}${pokemonType[1].slice(
                          1
                        )}`
                      : `${pokemonType[0][0].toUpperCase()}${pokemonType[0].slice(
                          1
                        )}`}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Height</div>
                  <div className="divTableCell">
                    {' '}
                    {Math.round(data.height * 3.9)}"
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Weight</div>
                  <div className="divTableCell">
                    {' '}
                    {Math.round(data.weight / 4.3)} lbs
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
