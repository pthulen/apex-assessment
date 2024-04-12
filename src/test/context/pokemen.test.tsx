import { render, act } from "@testing-library/react";
import React from "react";
import { PokemonProvider, PokemonContext } from "../../context/pokemon";

describe("PokemonProvider", () => {
  it("renders without crashing", () => {
    render(<PokemonProvider children={undefined}></PokemonProvider>);
  });

  it("provides the Pokemon context", async () => {
    const TestComponent = () => {
      const context = React.useContext(PokemonContext);
      expect(context).toHaveProperty("pokemonList");
      expect(context).toHaveProperty("setPokemonList");
      expect(context).toHaveProperty("selectedPokemon");
      expect(context).toHaveProperty("setSelectedPokemon");
      expect(context).toHaveProperty("capturedPokemon");
      expect(context).toHaveProperty("setCapturedPokemon");
      return null;
    };

    await act(async () => {
      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );
    });
  });
});
