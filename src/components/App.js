import '../theme/App.css';
import { useState } from 'react';
import { ulid } from 'ulid';
import { ImageList } from "./ImageList";
import { InputForm } from './InputForm';
import { LatexFormat } from './LatexFormat';

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
    <div className="App">
      <InputForm onSubmit={onSubmit}/>
			<LatexFormat newFileInfo={newFileInfo} />
      <ImageList imageInfoList={fileInfoList} />
    </div>
  );
};

export default App;