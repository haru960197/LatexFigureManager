import {
  List,
  ListItem,
  UnorderedList,
  Flex,
  Text,
  IconButton,
  Container } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
export const ImageList = ({fileInfoList, setFileInfoList}) => {
  const deleteTodoItem = (id) => {
    setFileInfoList((prevList) => prevList.filter((item) => item.id !== id));
  };
  return (
    <List>
      {fileInfoList.map((imageInfo, index) => (
        <ListItem 
          key={imageInfo.id}
          borderWidth="4px"
          p="4"
          mt="4"
          borderRadius="md"
          borderColor="gray.400"
        >
          <Container centerContent>
            <img width="300" src={imageInfo.base64data} />
            <Text mb="2">図{index + 1} : {imageInfo.caption}</Text>
            <Flex align="center" justify="flex-end">
              <UnorderedList>
                <li>ファイル名: {imageInfo.object.name}</li>
                <li>label: {imageInfo.label}</li>
              </UnorderedList>
              <IconButton
                ml="4"
                icon={<DeleteIcon />}
                onClick={() => deleteTodoItem(imageInfo.id)}
              />
            </Flex>
          </Container>
        </ListItem>
      ))}
    </List>
  );
};