import {
  List,
  ListItem,
  UnorderedList,
  Flex,
  Text,
  IconButton,
  Container } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon } from "@chakra-ui/icons";
export const ImageList = ({fileInfoList, setFileInfoList}) => { 

  const upperShiftItem = (id) => {
    const index = fileInfoList.findIndex(fileInfo => fileInfo.id === id);
    if (index === 0) return;
    const newFileInfoList = fileInfoList.map((fileInfo, i) => {
      if (i === index - 1) return fileInfoList[index];
      else if (i === index) return fileInfoList[index - 1];
      else return fileInfo;
    });
    setFileInfoList(newFileInfoList);
  };

  const lowerShiftItem = async (id) => {
    const listItem = document.getElementById(`item-${id}`);
    if (!listItem) return;

    const index = fileInfoList.findIndex(fileInfo => fileInfo.id === id);;
    if (index === fileInfoList.length - 1) return;
    await setFileInfoList((prevList) => {
      const newFileInfoList = prevList.map((fileInfo, i) => {
        if (i === index) return fileInfoList[index + 1];
        else if (i === index + 1) return fileInfoList[index];
        else return fileInfo;
      });
      return newFileInfoList;
    });

    // アイテムを移動した後、スクロール位置を調整する
    listItem.scrollIntoView({ behavior: "auto", block: "nearest" });
  };

  const deleteItem = (id) => {
    setFileInfoList((prevList) => prevList.filter((item) => item.id !== id));
  };
  
  return (
    <List>
      {fileInfoList.map((imageInfo, index) => (
        <ListItem 
          key={imageInfo.id}
          id={`item-${imageInfo.id}`}
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
                icon={<ArrowUpIcon />}
                colorScheme="blue"
                onClick={() => upperShiftItem(imageInfo.id)}
              />
              <IconButton
                ml="2"
                icon={<ArrowDownIcon/>}
                colorScheme="blue"
                onClick={() => lowerShiftItem(imageInfo.id)}
              />
              <IconButton
                ml="2"
                icon={<DeleteIcon color="blackAlpha.900"/>}
                bg="gray.400"
                onClick={() => deleteItem(imageInfo.id)}
              />
            </Flex>
          </Container>
        </ListItem>
      ))}
    </List>
  );
};