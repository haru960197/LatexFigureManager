import { useFigureList } from "../hooks/useFigureList";
import { ImageList } from "./ImageList";
import { LatexFormatBox } from './LatexFormatBox';
import { MiniPageForm } from "./MiniPageForm";
import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Title } from "./Title";

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
    <>
      <Title content="LaTeX ラベル管理アプリ" fontSize="3xl" />
      <Container centerContent p={{ base: "4", md: "6" }} maxWidth="1000px">
        <MiniPageForm leftIcon={<AddIcon />} addFigureListItems={addFigureListItems} />
        <LatexFormatBox newFigures={newFigures} />
        <ImageList 
          figureList={figureList}
          upperShiftFigureListItem={upperShiftFigureListItem}
          lowerShiftFigureListItem={lowerShiftFigureListItem}
          deleteFigureListItem={deleteFigureListItem}
        />  
      </Container>
    </>
  );
};

export default App;