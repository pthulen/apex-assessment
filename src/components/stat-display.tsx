import { useContext, useEffect, useState } from "react";
import { CapturedPokemon, PokemonContext } from "../context/pokemon";
import {
  Container,
  Flex,
  Text,
  Stack,
  Button,
  Center,
  useToast,
  Badge,
} from "@chakra-ui/react";

type PokemonData = {
  id: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
      url: string;
    };
  }[];
};

const StatDisplay = () => {
  const toast = useToast();
  const {
    selectedPokemon,
    setCapturedPokemon,
    capturedPokemon: capturedPokemonList,
  } = useContext(PokemonContext);
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  //if selectedPokemon is true, then fetch the data
  useEffect(() => {
    if (selectedPokemon) {
      fetch(selectedPokemon.url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPokemonData(data);
        });
    } else {
      setPokemonData(null);
    }
    console.log(pokemonData);
  }, [selectedPokemon]);

  const handleCapture = () => {
    if (pokemonData) {
      const capturedPokemon: CapturedPokemon = {
        name: selectedPokemon.name,
        id: pokemonData.id,
        sprites: pokemonData.sprites,
      };
      //check if the pokemon is already captured
      const isCaptured = capturedPokemonList.some(
        (pokemon) => pokemon.id === capturedPokemon.id
      );
      if (isCaptured) {
        toast({
          title: "Pokemon is already captured",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      setCapturedPokemon((prev) => [...prev, capturedPokemon]);
    }
  };

  if (!pokemonData) {
    return (
      <Center>
        <Text fontSize="2xl">Please select a Pokemon</Text>
      </Center>
    );
  }
  return (
    <div>
      <Flex>
        <Container bg="#A0AEC0" borderRadius="2xl" mr={4} width={200}>
          <img
            src={pokemonData.sprites?.front_default}
            alt={selectedPokemon?.name}
            width="175px"
          />
        </Container>
        <Stack>
          <Text fontSize="2xl" as="b" textTransform="capitalize">
            {selectedPokemon?.name}
          </Text>
          <Text fontSize="2xl" as="b">
            #{pokemonData?.id}
          </Text>
          <Text fontSize="xl">Type</Text>
          <Badge>{pokemonData?.types[0]?.type.name}</Badge>
        </Stack>
      </Flex>
      <Flex>
        <Stack m={4}>
          <Text textTransform="capitalize" mt={4}>
            HP
          </Text>
          <p>{pokemonData.stats[0].base_stat}</p>
        </Stack>
        <Stack m={4}>
          <Text textTransform="capitalize" mt={4}>
            Attack
          </Text>
          <p>{pokemonData.stats[1].base_stat}</p>
        </Stack>
        <Stack m={4}>
          <Text textTransform="capitalize" mt={4}>
            Defense
          </Text>
          <p>{pokemonData.stats[2].base_stat}</p>
        </Stack>
        <Stack m={4}>
          <Text textTransform="capitalize" mt={4}>
            Speed
          </Text>
          <p>{pokemonData.stats[5].base_stat}</p>
        </Stack>
      </Flex>
      <Button
        colorScheme="blackAlpha"
        width="100%"
        m={4}
        onClick={handleCapture}
        border="2px"
      >
        Capture
      </Button>
    </div>
  );
};

export default StatDisplay;
