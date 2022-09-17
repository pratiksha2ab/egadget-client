import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";

function ProductAddToCart({
  id,
  brand,
  image,
  title,
  price,
  onClick,
  category,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const addItemToCart = () => {
    const product = {
      id,
      title,
      category,
      image,
      price,
      quantity: 1,
    };
    //sending product as an action to REDUX STORE cart Slice
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    notification.success({
      placement: "bottomLeft",
      duration: 3,
      message: `Added ${title} to cart`,
    });
  };
  return (
    <Flex
      p={50}
      maxWidth={"500px"}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        cursor={"pointer"}
        onClick={() => router.push(`product/${id}`)}
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image src={image} alt={`Picture of ${title}`} roundedTop="lg" />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              {brand}
            </Badge>
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {title}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <chakra.a href={"#"} display={"flex"}>
                <Icon
                  onClick={!added && addItemToCart}
                  as={FiShoppingCart}
                  h={7}
                  w={7}
                  alignSelf={"center"}
                />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg"></Box>
              Rs: {price}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductAddToCart;
