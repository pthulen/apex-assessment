import { useContext } from "react";
import { PokemonContext } from "./context/pokemon";
import { Flex, Center, Container } from "@chakra-ui/react";
import SearchBar from "./components/searchbar";
import StatDisplay from "./components/stat-display";

import "./App.css";

function App() {
  const { selectedPokemon } = useContext(PokemonContext);

  return (
    <Container>
      <Center
        bg="#E53E3E"
        w="100%"
        p={4}
        color="white"
        borderRadius="lg"
        mt={4}
      >
        <SearchBar />
      </Center>
      <Center bg="#E53E3E" w="100%" p={4} color="white" borderRadius="lg">
        <StatDisplay />
      </Center>
    </Container>
  );
}

export default App;
