import { Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { formatCoin } from '@/utils/formatter';
import { Coin } from '@/types';

const { ETH } = Coin;

interface CheckoutProps {
  length: number,
  totalPrice: number,
  networkFee: number
}

export const Checkout = ({ length, totalPrice, networkFee }: CheckoutProps) => {

  return (
    <VStack
      w="full"
      bg="#2b2a2a"
      p=".5rem 1rem 1rem 1rem"
      borderRadius={8}
    >
      <HStack w="full">
        <Spacer />
        {/* <HStack bg={"#35302F"} p={2} spacing={2} borderRadius={10}>
                <ChakraButton
                  w={12}
                  h={7}
                  onClick={() => setSelectedCoin(ETH)}
                  style={{
                    backgroundColor:
                      selectedCoin === ETH ? "#32C8D9" : "#2B2827",
                    color: selectedCoin === ETH ? "#1E1F22" : "#686361",
                  }}
                >
                  {ETH}
                </ChakraButton>
                <ChakraButton
                  border="none"
                  w={12}
                  h={7}
                  onClick={() => setSelectedCoin(USD)}
                  style={{
                    backgroundColor:
                      selectedCoin === USD ? "#32C8D9" : "#2B2827",
                    color: selectedCoin === USD ? "#1E1F22" : "#686361",
                  }}
                >
                  {USD}
                </ChakraButton>
              </HStack> */}
      </HStack>

        <Flex w="full" justifyContent="space-between">
          <Text color="text.500" fontSize={{ base: "xs", md: "sm" }}>
            Handles
          </Text>
          <Text color="text.500" fontSize={{ base: "xs", md: "sm" }}>
            {formatCoin(totalPrice, ETH)}
          </Text>
        </Flex>
        <Flex w="full" justifyContent="space-between">
          <Text color="text.500" fontSize={{ base: "xs", md: "sm" }}>
            Estimated network fee
          </Text>
          <Spacer />
          <Text color="text.500" fontSize={{ base: "xs", md: "sm" }}>
            {formatCoin(networkFee, ETH)}
          </Text>
        </Flex>
        <HStack w="full">
          <Text color="text.500" fontSize={{ base: "xs", md: "sm" }} fontWeight="bold">
            Estimated total
          </Text>
          <Spacer />
          <Text color="text.500" fontSize={{ base: "xs", md: "sm" }} fontWeight="bold">
            {formatCoin(totalPrice + networkFee, ETH)}
          </Text>
        </HStack>
    </VStack>
  )
}
