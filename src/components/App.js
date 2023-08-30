import { useImageFile } from "../hooks/useImageFile";
import { ImageList } from "./ImageList";
import { InputForm } from './InputForm';
import { LatexFormat } from './LatexFormat';

import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function App() {
  const {
		fileInfoList,
		newFileInfo,
		addFileInfoListItem,
		upperShiftFileInfoListItem,
		lowerShiftFileInfoListItem,
    deleteFileInfoListItem
	} = useImageFile();

  const handleAddFileInfoListItem = (data) => {
    addFileInfoListItem(data.file[0], data.caption, data.label);
  };

  return (
    <Container centerContent p={{ base: "4", md: "6" }} maxWidth="3xl">
      <InputForm leftIcon={<AddIcon />} onSubmit={handleAddFileInfoListItem}/>
			<LatexFormat newFileInfo={newFileInfo} />
      <ImageList 
        fileInfoList={fileInfoList}
        upperShiftFileInfoListItem={upperShiftFileInfoListItem}
	      lowerShiftFileInfoListItem={lowerShiftFileInfoListItem}
        deleteFileInfoListItem={deleteFileInfoListItem}
      />
    </Container>
  );
};

export default App;