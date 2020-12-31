import React, { useState } from 'react';
import './App.css';

const App = () => {
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
      console.log(data);
    } catch (err) {
      alert("That's not a pokemon. Try again!");
      console.log(err);
    }
  };

  // const randomInt = (min, max) => {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  // const getRandom = async function () {
  //   const toArray = [];
  //   const random = randomInt(1, 898);
  //   console.log(random);
  //   console.log(Names[random]);
  //   try {
  //     const url = `https://pokeapi.co/api/v2/pokemon/${Names[random]}`;
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     toArray.push(data);
  //     setPokemonType(
  //       `${data.types[0].type.name[0].toUpperCase()}${data.types[0].type.name.slice(
  //         1
  //       )}`
  //     );
  //     setPokemonData(toArray);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleChange = e => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    getPokemon();
  };

  // const handleClick = e => {
  //   // const random = randomInt(1, 898);
  //   // console.log(Names[random]);
  //   getRandom();
  // };

  return (
    <div className="tc">
      <h1 className="f2 white">Pokedex</h1>
      <form className="pa2" onSubmit={handleSubmit}>
        <label>
          <input
            className="pa2 ba b--red"
            type="text"
            placeholder="enter pokemon name"
            onChange={handleChange}
          />
        </label>
      </form>
      {/* <p className="white">OR</p>
      <button className="pa1" onClick={handleClick}>
        Random Pokemon
      </button> */}
      {pokemonData.map(data => {
        return (
          <div className="container">
            <img src={data.sprites['front_default']} alt="pokemon" />
            <div className="divTable">
              <div className="divTableBody">
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
