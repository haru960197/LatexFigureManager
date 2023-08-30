import {
  List,
  ListItem,
  UnorderedList,
  Flex,
  Spacer,
  Text,
  IconButton,
  Container,
  Tooltip
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon } from "@chakra-ui/icons";
export const ImageList = ({
  fileInfoList,
  upperShiftFileInfoListItem,
	lowerShiftFileInfoListItem,
  deleteFileInfoListItem
}) => { 

  const handleUpperShift = async (id) => {
    await upperShiftFileInfoListItem(id);
  };

  const handleLowerShift = async (id) => {
    const listItem = document.getElementById(`item-${id}`);
    if (!listItem) return;

    await lowerShiftFileInfoListItem(id);

    // アイテムを移動した後、スクロール位置を調整する
    listItem.scrollIntoView({ behavior: "auto", block: "nearest" });
  };

  const handleDeleteItem = async (id) => {
    await deleteFileInfoListItem(id);
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
            <Tooltip label={imageInfo.object.name} placement="top-end" fontSize="md">
              <img width="300" src={imageInfo.base64data} />
            </Tooltip>
            <Text mb="2">図{index + 1} : {imageInfo.caption}</Text>
          </Container>
          <Flex align="center" justify="flex-end">
            <Tooltip label="クリックでコピー" placement="auto">
              <Text
                fontSize="lg"
                onClick={() => navigator.clipboard.writeText(imageInfo.label)}
              >label : {imageInfo.label}</Text>
            </Tooltip>
            <Spacer />
            <IconButton
              ml="4"
              icon={<ArrowUpIcon />}
              colorScheme="blue"
              onClick={() => handleUpperShift(imageInfo.id)}
            />
            <IconButton
              ml="2"
              icon={<ArrowDownIcon/>}
              colorScheme="blue"
              onClick={() => handleLowerShift(imageInfo.id)}
            />
            <IconButton
              ml="2"
              icon={<DeleteIcon color="blackAlpha.900"/>}
              bg="gray.400"
              onClick={() => handleDeleteItem(imageInfo.id)}
            />
          </Flex>
        </ListItem>
      ))}
    </List>
  );
};