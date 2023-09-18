import { Flex, Text } from "@chakra-ui/react";

export const Title = ({ content, fontSize }) => {
    return (
        <Flex>
            <Text ml="8" my="2" fontSize={fontSize}>{content}</Text>
        </Flex>
    );
};