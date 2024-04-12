import { useContext, useEffect, useState } from "react";
import { CapturedPokemon, PokemonContext } from "../context/pokemon";
import {
  Flex,
  Text,
  Stack,
  Button,
  Center,
  useToast,
  Badge,
  Box,
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

  useEffect(() => {
    if (selectedPokemon) {
      fetch(selectedPokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setPokemonData(data);
        });
    } else {
      setPokemonData(null);
    }
  }, [selectedPokemon]);

  const handleCapture = () => {
    if (pokemonData) {
      const capturedPokemon: CapturedPokemon = {
        name: selectedPokemon.name,
        id: pokemonData.id,
        sprites: pokemonData.sprites,
      };
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
        <Text fontSize="2xl" color="white">
          Please select a Pokemon
        </Text>
      </Center>
    );
  }

  return (
    <div>
      <Flex justify="left" px={4}>
        <Box bg="#A0AEC0" borderRadius="2xl">
          <img
            src={pokemonData.sprites?.front_default}
            alt={selectedPokemon?.name}
            style={{ width: "175px", height: "175px" }}
          />
        </Box>
        <Stack ml={8} color="white">
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
      <Flex color="white">
        <Stack m={4}>
          <Text textTransform="capitalize" mt={4} as="b">
            HP
          </Text>
          <p>{pokemonData.stats[0].base_stat}</p>
        </Stack>
        <Stack m={4}>
          <Text textTransform="capitalize" mt={4} as="b">
            Attack
          </Text>
          <p>{pokemonData.stats[1].base_stat}</p>
        </Stack>
        <Stack m={4}>
          <Text textTransform="capitalize" mt={4} as="b">
            Defense
          </Text>
          <p>{pokemonData.stats[2].base_stat}</p>
        </Stack>
        <Stack m={4}>
          <Text textTransform="capitalize" mt={4} as="b">
            Speed
          </Text>
          <p>{pokemonData.stats[5].base_stat}</p>
        </Stack>
      </Flex>
      <Box>
        <Button
          colorScheme="blackAlpha"
          width="100%"
          onClick={handleCapture}
          border="2px"
        >
          Capture
        </Button>
      </Box>
    </div>
  );
};

export default StatDisplay;
