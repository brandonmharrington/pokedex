import React, { useState } from 'react';
import './App.css';

const App = () => {
  const pokemonNames = {};
  const [pokemon, setPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState('');

  const getPokemon = async function () {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await fetch(url);
      const data = await res.json();
      toArray.push(data);
      setPokemonType(
        `${data.types[0].type.name[0].toUpperCase()}${data.types[0].type.name.slice(
          1
        )}`
      );
      setPokemonData(toArray);
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

  const getPokemonNames = async function () {
    const random = randomInt(1, 898);
    const toArray = [];
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
      const fetchPro = fetch(url);
      const res = await fetchPro;
      const data = await res.json();

      for (let i = 0; i < data.results.length; i++) {
        pokemonNames[i] = data.results[i].name;
      }

      const url2 = `https://pokeapi.co/api/v2/pokemon/${pokemonNames[random]}`;
      const res2 = await fetch(url2);
      const data2 = await res2.json();

      toArray.push(data2);
      setPokemonType(
        `${data2.types[0].type.name[0].toUpperCase()}${data2.types[0].type.name.slice(
          1
        )}`
      );
      setPokemonData(toArray);
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

  const handleClick = e => {
    getPokemonNames();
  };

  return (
    <div className="tc">
      <h1 className="f2 white">Pokédex</h1>
      <form className="pa2" onSubmit={handleSubmit}>
        <label>
          <input
            className="pa2 ba b--red"
            type="text"
            placeholder="Enter pokémon name"
            onChange={handleChange}
          />
        </label>
      </form>
      <p className="white">OR</p>
      <button class="random" onClick={handleClick}>
        🔀 Random Pokémon
      </button>
      {pokemonData.map(data => {
        return (
          <div className="container">
            <img src={data.sprites['front_default']} alt="pokémon" />
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
                  <div className="divTableCell">{pokemonType}</div>
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
