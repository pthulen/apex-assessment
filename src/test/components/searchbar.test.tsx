import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { PokemonContext } from "../../context/pokemon";
import SearchBar from "../../components/searchbar";
import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

const mockSetSelectedPokemon = jest.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PokemonContext.Provider
    value={{
      pokemonList: [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25" },
      ],
      setSelectedPokemon: mockSetSelectedPokemon,
      setPokemonList: () => {},
      selectedPokemon: { name: "", url: "" },
      capturedPokemon: [],
      setCapturedPokemon: () => {},
    }}
  >
    {children}
  </PokemonContext.Provider>
);

describe("SearchBar Component Tests", () => {
  test("Input changes are handled correctly", async () => {
    render(<SearchBar />, { wrapper });
    const inputElement = screen.getByPlaceholderText(/search pokemon/i);

    await act(async () => {
      userEvent.type(inputElement, "pikachu");
    });
    expect(inputElement).toHaveValue("pikachu");
  });

  test("Radio button selection changes search type", () => {
    render(<SearchBar />, { wrapper });
    const radioId = screen.getByLabelText(/id/i);

    fireEvent.click(radioId);
    expect(radioId).toBeChecked();
  });

  test("Clicking search button triggers search for name", async () => {
    render(<SearchBar />, { wrapper });
    const inputElement = screen.getByPlaceholderText(/search pokemon/i);
    await act(async () => {
      userEvent.type(inputElement, "pikachu");
    });
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.click(searchButton);
    expect(mockSetSelectedPokemon).toHaveBeenCalledWith({
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/pokemon/25",
    });
  });

  test("Clicking search button triggers API call for id", async () => {
    render(<SearchBar />, { wrapper });
    const radioId = screen.getByLabelText(/id/i);
    fireEvent.click(radioId);
    const inputElement = screen.getByPlaceholderText(/search pokemon/i);
    await act(async () => {
      userEvent.type(inputElement, "25");
    });
    const searchButton = screen.getByRole("button", { name: /search/i });
    fetchMock.mockResponse(JSON.stringify({ name: "pikachu", id: 25 }));

    fireEvent.click(searchButton);

    await waitFor(() =>
      expect(mockSetSelectedPokemon).toHaveBeenCalledWith({
        name: "pikachu",
        url: "https://pokeapi.co/api/v2/pokemon/25",
      })
    );

    expect(mockSetSelectedPokemon).toHaveBeenCalledWith({
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/pokemon/25",
    });
  });
});
