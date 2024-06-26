import { SetStateAction, useContext, useState } from "react";
import { PokemonContext, PokemonItem } from "../context/pokemon";
import {
  Box,
  Input,
  Button,
  Flex,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";

const SearchBar = () => {
  const { pokemonList, setSelectedPokemon } = useContext(PokemonContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchType === "name") {
      const filteredPokemon: PokemonItem[] = pokemonList.filter((pokemon) =>
        pokemon.name.includes(searchTerm)
      );
      setSelectedPokemon(filteredPokemon[0]);
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedPokemon({
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
          });
        });
    }
  };

  const handleRadioChange = (value: string) => {
    setSearchType(value);
  };

  return (
    <Box
      bg="#E53E3E"
      w="90%"
      borderRadius="lg"
      p={4}
      color="white"
      width="100%"
    >
      <Input
        placeholder="Search Pokemon"
        _placeholder={{ color: "white" }}
        onChange={handleInputChange}
        border="2px"
      />
      <Flex>
        <Button colorScheme="blackAlpha" mt={2} onClick={handleSearch}>
          Search
        </Button>
        <RadioGroup onChange={handleRadioChange} value={searchType} m={2}>
          <Stack direction="row" marginTop="auto">
            <Radio size="lg" value="name">
              Name
            </Radio>
            <Radio size="lg" value="type">
              Id
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>
    </Box>
  );
};

export default SearchBar;
