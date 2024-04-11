import { Flex, Center, Container, Box, Text } from "@chakra-ui/react";
import SearchBar from "./components/searchbar";
import StatDisplay from "./components/stat-display";

import "./App.css";

function App() {
  return (
    <Flex justify="center" mt={4}>
      <Box
        borderRadius="2xl"
        bg="#E53E3E"
        p={4}
        border="8px"
        borderColor="#63171B"
        h="500px"
      >
        <Center>
          <SearchBar />
        </Center>
        <Container color="white">
          <StatDisplay />
        </Container>
      </Box>
      <Box
        w="20%"
        h="500px"
        bg="#E53E3E"
        borderRadius="2xl"
        border="8px"
        borderColor="#63171B"
      >
        <Text>Captured</Text>
      </Box>
    </Flex>
  );
}

export default App;
