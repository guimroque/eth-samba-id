import { useRouter } from 'next/router';
import { Button, Center, Stack, Text, VStack } from '@chakra-ui/react';
import { BuyComponents } from '@/components/buy';
// import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Domains } from '@/types';
import { calculateDomainPrice } from '@/utils/calculator.ts';
import { useAccount, useReadContract, useWalletClient, useWriteContract } from 'wagmi';
import { CONTRACT } from '@/config/addresses/contracts';
import { config } from '@/providers/walletConnector/walletConfig';

const checkDomain = (domain: string) => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(domain);
};

export default function Domain() {
  const router = useRouter()
  const domain = router.query.domain as string
  const { address,  } = useAccount()
  const { data } = useWalletClient()
  console.debug(data)
  console.debug(router.query)

  const { writeContract, isPending } = useWriteContract({
    config,
    mutation: {
      onSuccess: (data) => {
        console.log({ SUCCESS: data });
      },
      onError: (error) => {
        console.log({ ERROR: error });
      },
    },
  });

  const identityData = useReadContract({
    abi: 'identityAbi',
    address: CONTRACT.IDENTITY,
    functionName: 'getIdentity',
    args: [domain],
  });

  const [domains, setDomains] = useState<Domains[]>([{
    name: domain,
    period: 1
  }])

  const totalPrice = domains.reduce(
    (previous, current) =>
      previous + calculateDomainPrice(current.name, 1),
    0
  );

  const handleConfirmDomain = async () => {
    const isValid = checkDomain(domain);
    if (!isValid) return;

    // if should return from contract mutation
    const info = null

    // console.debug(info?.name)
    return info
  }

  const handleBuyDomain = async () => {
    const isValid = checkDomain(domain);
    // if (!isValid || ! wallet) return;
    if (!isValid) return;

    console.debug('buying')

    // registerDomainMutation.mutate({
    //   account: wallet,
    //   resolver: wallet.address.toB256(),
    //   domain: domain
    // }, {
    //   onSuccess: async (e) => {
    //     console.debug(e)
    //     await handleConfirmDomain();
    //     // domainDetailsDialog.onOpen();
    //     toast({
    //       title: 'Success!',
    //       status: 'success',
    //       duration: 2000,
    //       isClosable: true,
    //     })
    //     navigate({ to: '/checkout/$domain', params: { domain: domain }, startTransition: true }).then()
    //   },
    //   onError: e => console.log(e)
    // });
  };

  const handlePeriodChange = (index: number, newValue: number) => {
    const newItems = [...domains];
    // period not specified
    newItems[index] = { ...newItems[index], period: newValue };
    setDomains(newItems);
  };

  const button = () => {
    if (data?.account) {
      return <Button
        w="full"
        // isLoading={resolveDomainMutation.isPending || registerDomainMutation.isPending}
        // isDisabled={!wallet}
        onClick={handleBuyDomain}
        background="button.500"
        color="background.500"
        fontSize={14}
        _hover={{ bgColor: 'button.600' }}
      >Buy</Button>;
    }

    return <w3m-button />;
  }

  return (
    <Center w="full" h="full" display="flex" flexDir="column" py={2} px={{ base: 4, md: 20, xl: 40 }} zIndex={10}>
      {/*<GoBack />*/}
      <Stack
        w="full"
        h="full"
        direction={{ base: "column", md: "row"  }}
        justifyContent='center'
        alignItems={{ base: 'center', md: 'start' }}
        gap={{ base: 6, md: 28, lg: 40 }}
        mt={2}
      >
        <VStack w="full" maxW="420px" alignItems="start">
          <BuyComponents.Domains>
            {domains.map(
              ({ name }, index) =>
                <BuyComponents.Info name={name} index={index} periodHandle={handlePeriodChange} />
            )}
          </BuyComponents.Domains>
        </VStack>
        <VStack
          h="full"
          w="full"
          maxW="420px"
          alignItems="start"
          spacing={4}
        >
          <Text color="section.200" fontWeight={600}>
            Your purchase
          </Text>
          <BuyComponents.Checkout length={domains.length} totalPrice={totalPrice} networkFee={0.003872} />
          {button()}
        </VStack>
      </Stack>
    </Center>
  )
}
