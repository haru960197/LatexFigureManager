import { useState } from 'react';
import { ulid } from 'ulid';

export const useFigureList = () => {
    const [figureList, setFigureList] = useState([]);
	const [newFigure, setNewFigure] = useState(
		{ id: '', groupId: '', object: '', base64data: '', caption: '', label: '' }
	);

    const addFigureListItem = (groupId, fileInfoObj, caption, label) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const aNewFileInfo = {
				id: ulid(),
				groupId: groupId,
				object: fileInfoObj,
				base64data: e.target.result,
				caption: caption,
				label: label
			};
			setNewFigure(aNewFileInfo);
			setFigureList((prevList) => [...prevList, aNewFileInfo]);
		};
		reader.readAsDataURL(fileInfoObj)
	};

	const addFigureListItems = (figureArray) => {
		const groupId = ulid();
		figureArray.forEach((figure) => {
			addFigureListItem(groupId, figure.img.info, figure.cap, figure.label);
		});
	};

	const upperShiftFigureListItem = (id) => {
		const index = figureList.findIndex(fileInfo => fileInfo.id === id);
		if (index === 0) return;
		const newFileInfoList = figureList.map((fileInfo, i) => {
		  if (i === index - 1) return figureList[index];
		  else if (i === index) return figureList[index - 1];
		  else return fileInfo;
		});
		setFigureList(newFileInfoList);
  	};

	const lowerShiftFigureListItem = (id) => {
    	const index = figureList.findIndex(fileInfo => fileInfo.id === id);;
    	if (index === figureList.length - 1) return;
		const newFileInfoList = figureList.map((fileInfo, i) => {
			if (i === index) return figureList[index + 1];
			else if (i === index + 1) return figureList[index];
			else return fileInfo;
		});
    	setFigureList(newFileInfoList);
  	};

	const deleteFigureListItem = (id) => {
		setFigureList((prevList) => (
			prevList.filter((fileInfo) => fileInfo.id !== id)
		));
	};

	return {
		figureList,
		newFigure,
		addFigureListItems,
		upperShiftFigureListItem,
		lowerShiftFigureListItem,
		deleteFigureListItem
	};
};