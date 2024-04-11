import { SetStateAction, useContext, useState } from "react";
import { PokemonContext } from "../context/pokemon";
import { Box, Input, Button } from "@chakra-ui/react";

const SearchBar = () => {
  const { pokemonList, setSelectedPokemon } = useContext(PokemonContext);
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.includes(searchTerm)
    );
    setSelectedPokemon(filteredPokemon[0]);
  };

  return (
    <Box bg="#E53E3E" w="90%" borderRadius="lg" p={4} color="white">
      <Input
        placeholder="Search Pokemon"
        _placeholder={{ color: "white" }}
        onChange={handleInputChange}
      />
      <Button colorScheme="blackAlpha" mt={2} onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
