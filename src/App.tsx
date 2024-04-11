import React from "react";
import logo from "./logo.svg";
import { useContext } from "react";
import { PokemonContext } from "./context/pokemon";
import "./App.css";

function App() {
  const { pokemonList } = useContext(PokemonContext);
  console.log("pokemmon:", pokemonList);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name}>{pokemon.name}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
