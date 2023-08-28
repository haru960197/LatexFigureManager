
import { useState } from 'react';
import { ulid } from 'ulid';
import { ImageList } from "./ImageList";
import { InputForm } from './InputForm';
import { LatexFormat } from './LatexFormat';

import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function App() {
  const [fileInfoList, setFileInfoList] = useState([]);
	const [newFileInfo, setNewFileInfo] = useState(
		{ id: '', object: '', base64data: '', caption: '', label: '' }
	);

  const onSubmit = (data) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const aNewFileInfo = {
        id: ulid(),
        object: data.file[0],
        base64data: e.target.result,
        caption: data.caption,
        label: data.label
      };
      setNewFileInfo(aNewFileInfo);
      setFileInfoList([...fileInfoList, aNewFileInfo]);
    }
		reader.readAsDataURL(data.file[0])
  };

  return (
    <Container centerContent p={{ base: "4", md: "6" }} maxWidth="3xl">
      <InputForm leftIcon={<AddIcon />} onSubmit={onSubmit}/>
			<LatexFormat newFileInfo={newFileInfo} />
      <ImageList imageInfoList={fileInfoList} />
    </Container>
  );
};

export default App;