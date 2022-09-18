import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Tag } from "antd";

import { MdLocalShipping } from "react-icons/md";

export default function ProductDetailCard({
  image,
  title,
  rate,
  items,
  onClick,
}) {
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={image}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              Rs: {rate}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            {/* <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>{items?.brand}</ListItem>
                 
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  
                </List>
              </SimpleGrid>
            </Box> */}
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Colors:
                  </Text>{" "}
                  {items?.colors?.map((item, index) => (
                    <Tag color={item || "orange"} className="pl-2">
                      {item}
                    </Tag>
                  ))}
                </ListItem>
                {items?.ram &&(
                <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Ram:
                </Text>{" "}
                {items?.ram}
              </ListItem>
                )}
               {items?.storage &&(
                 <ListItem>
                 <Text as={"span"} fontWeight={"bold"}>
                   Storage:
                 </Text>{" "}
                 {items?.storage}
               </ListItem>
               )}
               
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Brand:
                  </Text>{" "}
                  {items?.brand}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Warrenty Period:
                  </Text>{" "}
                  {items?.warrentyPeriod}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    year:
                  </Text>{" "}
                  {items?.year}
                </ListItem>
                {items?.camera && (
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Camera
                    </Text>{" "}
                    {items?.camera}
                  </ListItem>
                )}
                {items?.battery && (
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      battery:
                    </Text>{" "}
                    {items?.battery}
                  </ListItem>
                )}
                {items?.weight&&(
                  <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    weight:
                  </Text>{" "}
                  {items?.weight}
                </ListItem>
                )}
                
              </List>
              <br />
              <Text as={"span"} fontWeight={"bold"}>
                Description
              </Text>
              <div dangerouslySetInnerHTML={{ __html: items?.description }} />
            </Box>
          </Stack>

          <Button
            onClick={onClick}
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
