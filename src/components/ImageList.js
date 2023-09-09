import {
  List,
  ListItem,
  Flex,
  Spacer,
  Text,
  IconButton,
  Container,
  Tooltip,
  VStack,
  HStack,
  Box
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon } from "@chakra-ui/icons";

const ImageListItem = ({
  figure,
  index,
  onUpIconClick,
  onDownIconClick,
  onDeleteIconClick
}) => {
  return (
    <VStack
          justify="space-between"
          id={`item-${figure.id}`}
          borderWidth="4px"
          p="10px"
          mt="4"
          borderRadius="md"
          borderColor="gray.400"
          w="18rem" // 288px
          h="18rem" // 288px
        >
            <Container centerContent>
              <Tooltip label={figure.object.name} placement="top-end" fontSize="md">
                <img
                  src={figure.base64data}
                  alt={figure.object.name}
                  style={{ maxWidth: "250px", maxHeight:"190px"}}
                />
              </Tooltip>
              <Text fontSize="16px" mb="4px">図{index + 1} : {figure.caption}</Text>
            </Container>
          
            <Container>
              <Flex>
                <Tooltip label="クリックでコピー" placement="auto">
                  <Text
                    fontSize="16px"
                    onClick={() => navigator.clipboard.writeText(figure.label)}
                  >label: {figure.label}</Text>
                </Tooltip>
                <Spacer/>
                <IconButton
                  ml="2"
                  size="sm"
                  icon={<ArrowUpIcon />}
                  colorScheme="blue"
                  onClick={onUpIconClick}
                />
                <IconButton
                  ml="2"
                  size="sm"
                  icon={<ArrowDownIcon/>}
                  colorScheme="blue"
                  onClick={onDownIconClick}
                />
                <IconButton
                  ml="2"
                  size="sm"
                  icon={<DeleteIcon color="blackAlpha.900"/>}
                  bg="gray.400"
                  onClick={onDeleteIconClick}
                />
              </Flex>
            </Container>
        </VStack>
  )
}

function divideIntoGroup(figureList) {
  const organizedList = [];
  let bufferList = [];
  let groupId = '';
  
  figureList.forEach((figure, index) => {
    // indexプロパティを追加
    figure.index = index;
    if (figure.groupId == groupId) {
      bufferList.push(figure);
    } else {
      if (index != 0) {
        organizedList.push(bufferList);
      }
      bufferList = [figure];
      groupId = figure.groupId;
    }
  })

  console.log(organizedList);
  return organizedList;
}

export const ImageList = ({
  figureList,
  upperShiftFigureListItem,
	lowerShiftFigureListItem,
  deleteFigureListItem
}) => {
  const handleUpperShift = async (id) => {
    await upperShiftFigureListItem(id);
  };

  const handleLowerShift = async (id) => {
    const listItem = document.getElementById(`item-${id}`);
    if (!listItem) return;

    await lowerShiftFigureListItem(id);

    // アイテムを移動した後、スクロール位置を調整する
    listItem.scrollIntoView({ behavior: "auto", block: "nearest" });
  };

  const handleDeleteItem = async (id) => {
    await deleteFigureListItem(id);
  };
  
  return (
    <Container centerContent maxW="100%">
      {figureList.map((figures, index) => (
        <HStack maxW="100%" maxH="300px" key={index}>
          {figures.map((figure) => (
            <ImageListItem
              key={figure.id}
              figure={figure}
              index={figure.index}
              onUpIconClick={() => handleUpperShift(figure.id)}
              onDownIconClick={() => handleLowerShift(figure.id)}
              onDeleteIconClick={() => handleDeleteItem(figure.id)}
            />
          ))}
        </HStack>
      ))}
    </Container>
  );
};