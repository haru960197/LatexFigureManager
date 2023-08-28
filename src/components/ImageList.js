import {
  List,
  ListItem,
  UnorderedList,
  Flex,
  IconButton,
  Container } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
export const ImageList = ({imageInfoList}) => {
    return (
      <List>
        {imageInfoList.map((imageInfo) => (
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
              <Flex align="center" justify="flex-end">
                <UnorderedList>
                  <li>ファイル名: {imageInfo.object.name}</li>
                  <li>caption: {imageInfo.caption}</li>
                  <li>label: {imageInfo.label}</li>
                </UnorderedList>
                <IconButton ml="4" icon={<DeleteIcon />}/>
              </Flex>
            </Container>
          </ListItem>
        ))}
      </List>
    );
};