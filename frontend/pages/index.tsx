import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import InputField from "../components/InputField";
import Questions from "../components/Questions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const IndexPage = () => {

  const router = useRouter();
  const { data: session, status } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  const [inputValues, setInputValues] = useState({
    edit_id: "",
    question_id: "",
    title: "",
    description: "",
    category: "",
    complexity: "",
  });

  const [isCreate, setIsCreate] = useState(true);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return router.push('/api/auth/signin');
  }




  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Link href="/collaboration"> collaboration </Link>
      <Flex ml="auto" pr={2} pt={2}>
        {colorMode === "light" ? (
          <Icon
            as={BsFillSunFill}
            color="orange"
            boxSize={8}
            onClick={toggleColorMode}
            marginX={2}
            marginTop={1}
          />
        ) : (
          <Icon
            as={BsFillMoonFill}
            color="yellow"
            boxSize={8}
            onClick={toggleColorMode}
            marginX={2}
            marginTop={1}
          />
        )}
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Flex
            flexDirection="column"
            align="center"
            background={colorMode == "light" ? "gray.300" : "gray.700"}
            p={6}
            borderRadius="xl"
            height="80%"
            marginX={16}
          >
            <InputField
              inputValues={inputValues}
              setInputValues={setInputValues}
              isCreate={isCreate}
              setIsCreate={setIsCreate}
              colorMode={colorMode}
            />

            <Grid
              templateColumns="repeat(6, 1fr)"
              width="100%"
              marginTop={8}
              paddingX={12}
            >
              <GridItem border="2px solid" borderRight="1px solid">
                <Flex justifyContent="center">
                  <Text fontWeight="bold">Question ID</Text>
                </Flex>
              </GridItem>
              <GridItem border="2px solid" borderRight="1px solid">
                <Flex justifyContent="center">
                  <Text fontWeight="bold">Question Title</Text>
                </Flex>
              </GridItem>
              <GridItem border="2px solid" borderRight="1px solid">
                <Flex justifyContent="center">
                  <Text fontWeight="bold">Question Description</Text>
                </Flex>
              </GridItem>
              <GridItem border="2px solid" borderRight="1px solid">
                <Flex justifyContent="center">
                  <Text fontWeight="bold">Question Category</Text>
                </Flex>
              </GridItem>
              <GridItem border="2px solid" borderRight="1px solid">
                <Flex justifyContent="center">
                  <Text fontWeight="bold">Question Complexity</Text>
                </Flex>
              </GridItem>
              <GridItem border="2px solid">
                <Flex justifyContent="center">
                  <Text fontWeight="bold">Action</Text>
                </Flex>
              </GridItem>
            </Grid>

            <Flex width="100%" alignItems="center" justify="center">
              <Questions
                inputValues={inputValues}
                setInputValues={setInputValues}
                isCreate={isCreate}
                setIsCreate={setIsCreate}
                colorMode={colorMode}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default IndexPage;
