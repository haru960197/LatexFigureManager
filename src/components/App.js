import { useFigureList } from "../hooks/useFigureList";
import { ImageList } from "./ImageList";
import { LatexFormatBox } from './LatexFormatBox';
import { MiniPageForm } from "./MiniPageForm";
import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function App() {
  const {
		figureList,
		newFigures,
		addFigureListItems,
		upperShiftFigureListItem,
		lowerShiftFigureListItem,
    deleteFigureListItem
	} = useFigureList();

  return (
    <Container centerContent p={{ base: "4", md: "6" }} maxWidth="3xl">
      <MiniPageForm leftIcon={<AddIcon />} addFigureListItems={addFigureListItems} />
			<LatexFormatBox newFigures={newFigures} />
      <ImageList 
        figureList={figureList}
        upperShiftFigureListItem={upperShiftFigureListItem}
	      lowerShiftFigureListItem={lowerShiftFigureListItem}
        deleteFigureListItem={deleteFigureListItem}
      />
    </Container>
  );
};

export default App;