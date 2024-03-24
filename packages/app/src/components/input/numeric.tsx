import { Box, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';

interface NumericInputProps {
  index: number;
  onChange: (index: number, newValue: number) => void;
}

export const NumericInput = ({index, onChange }: NumericInputProps) => {
  const [period, setPeriod] = useState(1)
  const decrement = () => {
    const newValue = Math.max(period - 1, 1);
    setPeriod(prev => prev - 1)
    onChange(index, newValue);
  };

  const increment = () => {
    const newValue = period + 1;
    setPeriod(prev => prev + 1)
    onChange(index, newValue);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      w="fit-content"
      border="1px solid #2B2927"
      borderRadius={10}
      backgroundColor="#151413"
      p={1}
    >
      <Button
        color="#FFF"
        backgroundColor="inherit"
        fontSize={24}
        isDisabled={period <= 1}
        onClick={decrement}
        _active={{ backgroundColor: "inherit" }}
        _focus={{
          backgroundColor: "inherit",
          boxShadow: "none",
          outline: "none",
        }}
        _hover={{ bgColor: "transparent" }}
      >
        -
      </Button>
      <Input
        color="grey.200"
        value={`${period} years`}
        type="text"
        textAlign="center"
        backgroundColor="inherit"
        border="none"
        isDisabled={true}
        p={0}
      />
      <Button
        color="#FFF"
        backgroundColor="inherit"
        fontSize={24}
        onClick={increment}
        _active={{ bgColor: "inherit" }}
        _focus={{ bgColor: "inherit" }}
        _hover={{ bgColor: "transparent" }}
        // isDisabled={value >= 3}
        // isDisabled={true}
      >
        +
      </Button>
    </Box>
  );
};
