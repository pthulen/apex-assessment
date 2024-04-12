import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PokemonContext } from "../../context/pokemon";
import CapturedList from "../../components/captured-list";
import { act } from "react-dom/test-utils";

describe("CapturedList Component", () => {
  const mockSetCapturedPokemon = jest.fn();
  const capturedPokemon = [
    { id: 1, name: "bulbasaur", sprites: { front_default: "bulbasaur.png" } },
    { id: 2, name: "charmander", sprites: { front_default: "charmander.png" } },
  ];

  beforeEach(() => {
    render(
      <PokemonContext.Provider
        value={{
          pokemonList: [],
          setPokemonList: () => {},
          selectedPokemon: {
            name: "",
            url: "",
          },
          setSelectedPokemon: () => {},
          capturedPokemon,
          setCapturedPokemon: mockSetCapturedPokemon,
        }}
      >
        <CapturedList />
      </PokemonContext.Provider>
    );
  });

  test("displays all captured Pokémon", () => {
    const bulbasaur = screen.getByText("bulbasaur");
    const charmander = screen.getByText("charmander");

    expect(bulbasaur).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });

  test("calls setCapturedPokemon with correct id on release", async () => {
    const firstPokemonItem = screen.getByText("bulbasaur").closest("div");

    if (firstPokemonItem) {
      await act(async () => {
        fireEvent.click(firstPokemonItem);
      });
    }

    expect(mockSetCapturedPokemon).toHaveBeenCalledTimes(1);
    expect(mockSetCapturedPokemon).toHaveBeenCalledWith(expect.any(Function));
  });
});
