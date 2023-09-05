import {
  List,
  ListItem,
  Flex,
  Spacer,
  Text,
  IconButton,
  Container,
  Tooltip
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
    <ListItem
          id={`item-${figure.id}`}
          borderWidth="4px"
          p="4"
          mt="4"
          borderRadius="md"
          borderColor="gray.400"
        >
          <Container centerContent>
            <Tooltip label={figure.object.name} placement="top-end" fontSize="md">
              <img width="250" src={figure.base64data} />
            </Tooltip>
            <Text mb="2">図{index + 1} : {figure.caption}</Text>
          </Container>
          <Flex align="center" justify="flex-end">
            <Tooltip label="クリックでコピー" placement="auto">
              <Text
                fontSize="lg"
                onClick={() => navigator.clipboard.writeText(figure.label)}
              >label : {figure.label}</Text>
            </Tooltip>
            <Spacer />
            <IconButton
              ml="4"
              icon={<ArrowUpIcon />}
              colorScheme="blue"
              onClick={onUpIconClick}
            />
            <IconButton
              ml="2"
              icon={<ArrowDownIcon/>}
              colorScheme="blue"
              onClick={onDownIconClick}
            />
            <IconButton
              ml="2"
              icon={<DeleteIcon color="blackAlpha.900"/>}
              bg="gray.400"
              onClick={onDeleteIconClick}
            />
          </Flex>
        </ListItem>
  )
}

function divideIntoGroup(figureList) {
  const organizedList = [];
  let bufferList = [];
  let groupId = '';
  
  figureList.forEach((figure, index) => {
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

  return organizedList;
}

export const ImageList = ({
  figureList,
  upperShiftFigureListItem,
	lowerShiftFigureListItem,
  deleteFigureListItem
}) => {
  const groupedFigureList = divideIntoGroup(figureList);

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
    <List>
      {figureList.map((figure, index) => (
        <ImageListItem
          key={figure.id}
          figure={figure}
          index={index}
          onUpIconClick={() => handleUpperShift(figure.id)}
          onDownIconClick={() => handleLowerShift(figure.id)}
          onDeleteIconClick={() => handleDeleteItem(figure.id)}
        />
      ))}
    </List>
  );
};