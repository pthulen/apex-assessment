import { Flex, Box } from "@chakra-ui/react";
import SearchBar from "./components/searchbar";
import StatDisplay from "./components/stat-display";
import CapturedList from "./components/captured-list";

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
        w="500px"
      >
        <SearchBar />
        <StatDisplay />
      </Box>
      <Box
        w="200px"
        h="500px"
        bg="#E53E3E"
        borderRadius="2xl"
        border="8px"
        borderColor="#63171B"
      >
        <CapturedList />
      </Box>
    </Flex>
  );
}

export default App;
