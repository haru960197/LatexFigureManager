import { useState } from 'react';
import { ulid } from 'ulid';

export const useImageFile = () => {
    const [fileInfoList, setFileInfoList] = useState([]);
	const [newFileInfo, setNewFileInfo] = useState(
		{ id: '', object: '', base64data: '', caption: '', label: '' }
	);

    const addFileInfoListItem = (fileInfoObj, caption, label) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const aNewFileInfo = {
				id: ulid(),
				object: fileInfoObj,
				base64data: e.target.result,
				caption: caption,
				label: label
			};
			setNewFileInfo(aNewFileInfo);
			setFileInfoList((prevList) => [...prevList, aNewFileInfo]);
		};
		reader.readAsDataURL(fileInfoObj)
	};

	const upperShiftFileInfoListItem = (id) => {
		const index = fileInfoList.findIndex(fileInfo => fileInfo.id === id);
		if (index === 0) return;
		const newFileInfoList = fileInfoList.map((fileInfo, i) => {
		  if (i === index - 1) return fileInfoList[index];
		  else if (i === index) return fileInfoList[index - 1];
		  else return fileInfo;
		});
		setFileInfoList(newFileInfoList);
  	};

	const lowerShiftFileInfoListItem = (id) => {
    	const index = fileInfoList.findIndex(fileInfo => fileInfo.id === id);;
    	if (index === fileInfoList.length - 1) return;
		const newFileInfoList = fileInfoList.map((fileInfo, i) => {
			if (i === index) return fileInfoList[index + 1];
			else if (i === index + 1) return fileInfoList[index];
			else return fileInfo;
		});
    	setFileInfoList(newFileInfoList);
  	};

	const deleteFileInfoListItem = (id) => {
		setFileInfoList((prevList) => (
			prevList.filter((fileInfo) => fileInfo.id !== id)
		));
	};

	return {
		fileInfoList,
		newFileInfo,
		addFileInfoListItem,
		upperShiftFileInfoListItem,
		lowerShiftFileInfoListItem,
		deleteFileInfoListItem
	};
};