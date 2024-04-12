import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { CapturedPokemon, PokemonContext } from "../../context/pokemon";
import StatDisplay from "../../components/stat-display";
import { ChakraProvider } from "@chakra-ui/react";
import { act } from "react-dom/test-utils";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

const mockSetCapturedPokemon = jest.fn();
let mockPokemonContext = {
  selectedPokemon: {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1",
  },
  pokemonList: [
    { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25" },
  ],
  setCapturedPokemon: mockSetCapturedPokemon,
  capturedPokemon: [] as CapturedPokemon[],
  setPokemonList: () => {},
  setSelectedPokemon: () => {},
};

const mockPokemonData = {
  id: 1,
  stats: [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 49, stat: { name: "defense" } },
    { base_stat: 49, stat: { name: "special attack" } },
    { base_stat: 49, stat: { name: "special defense" } },
    { base_stat: 65, stat: { name: "speed" } },
  ],
  sprites: { front_default: "https://example.com/sprite.png" },
  types: [
    { type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12" } },
  ],
};

describe("StatDisplay Component", () => {
  test("fetches pokemon data and displays it", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));

    render(
      <ChakraProvider>
        <PokemonContext.Provider value={mockPokemonContext}>
          <StatDisplay />
        </PokemonContext.Provider>
      </ChakraProvider>
    );

    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("#1")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
  });

  test("captures a pokemon", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));

    render(
      <ChakraProvider>
        <PokemonContext.Provider value={mockPokemonContext}>
          <StatDisplay />
        </PokemonContext.Provider>
      </ChakraProvider>
    );

    const captureButton = await screen.findByText("Capture");
    fireEvent.click(captureButton);
    expect(mockSetCapturedPokemon).toHaveBeenCalled();
  });

  test("display a toast message if pokemon is already captured", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));
    mockPokemonContext.capturedPokemon = [
      { id: 1, name: "bulbasaur", sprites: { front_default: "bulbasaur.png" } },
    ];

    render(
      <ChakraProvider>
        <PokemonContext.Provider value={mockPokemonContext}>
          <StatDisplay />
        </PokemonContext.Provider>
      </ChakraProvider>
    );

    const captureButton = await screen.findByText("Capture");
    await act(async () => {
      fireEvent.click(captureButton);
    });

    expect(
      await screen.findByText("Pokemon is already captured")
    ).toBeInTheDocument();
  });
});
