import { useContext } from "react";
import { CapturedPokemon, PokemonContext } from "../context/pokemon";
import { Container, Flex, Text, Button } from "@chakra-ui/react";

const CapturedList = () => {
  const { capturedPokemon, setCapturedPokemon } = useContext(PokemonContext);

  const handleRelease = (id: number) => {
    setCapturedPokemon((prev) => prev.filter((pokemon) => pokemon.id !== id));
  };

  return (
    <Container color="white" overflowY="scroll" maxH="475px">
      {capturedPokemon.map((pokemon) => (
        <Flex
          key={pokemon.id}
          justify="space-between"
          p={2}
          onClick={() => handleRelease(pokemon.id)}
          bg="#A0AEC0"
          borderRadius="xl"
          mt={2}
          flexDirection="column"
          overflow="hidden"
        >
          <Text textTransform="capitalize">{pokemon.name}</Text>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </Flex>
      ))}
    </Container>
  );
};

export default CapturedList;
