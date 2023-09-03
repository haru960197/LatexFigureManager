import { useFigureList } from "../hooks/useFigureList";
import { ImageList } from "./ImageList";
import { LatexFormat } from './LatexFormat';
import { MiniPageForm } from "./MiniPageForm";
import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function App() {
  const {
		figureList,
		newFigure,
		addFigureListItems,
		upperShiftFigureListItem,
		lowerShiftFigureListItem,
    deleteFigureListItem
	} = useFigureList();

  return (
    <Container centerContent p={{ base: "4", md: "6" }} maxWidth="3xl">
      <MiniPageForm leftIcon={<AddIcon />} addFigureListItems={addFigureListItems} />
			<LatexFormat newFigure={newFigure} />
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