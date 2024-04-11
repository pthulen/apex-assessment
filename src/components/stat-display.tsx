import { useContext, useEffect, useState } from "react";
import { CapturedPokemon, PokemonContext } from "../context/pokemon";
import { Container, Flex, Text, Stack, Button, Center } from "@chakra-ui/react";

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
  const { selectedPokemon, setCapturedPokemon } = useContext(PokemonContext);
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
      setCapturedPokemon((prev) => [...prev, capturedPokemon]);
    }
  };

  if (!pokemonData) {
    return (
      <Center>
        <Text fontSize="2xl">No Pokemon Selected</Text>
      </Center>
    );
  }
  return (
    <div>
      <Flex>
        <Container>
          <img
            src={pokemonData.sprites?.front_default}
            alt={selectedPokemon?.name}
          />
        </Container>
        <Stack>
          <Text fontSize="2xl" as="b" textTransform="capitalize">
            {selectedPokemon?.name}
          </Text>
          <Text fontSize="2xl" as="b">
            # {pokemonData?.id}
          </Text>
          <Text fontSize="xl">Type</Text>
          <Button colorScheme="blackAlpha">
            {pokemonData?.types[0]?.type.name}
          </Button>
        </Stack>
      </Flex>
      <Flex>
        {pokemonData.stats?.map((stat) => (
          <div key={stat.stat.name}>
            <Text textTransform="capitalize" mt={4}>
              {stat.stat.name}
            </Text>
            <p>{stat.base_stat}</p>
          </div>
        ))}
      </Flex>
      <Button
        colorScheme="blackAlpha"
        width="100%"
        m={4}
        onClick={handleCapture}
      >
        Capture
      </Button>
    </div>
  );
};

export default StatDisplay;
