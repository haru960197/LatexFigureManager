import { useState } from 'react';
import { ulid } from 'ulid';

export const useFigureList = () => {
    const [figureList, setFigureList] = useState([]);
	const [newFigures, setNewFigures] = useState([
		// { id: '', groupId: '', object: '', base64data: '', caption: '', label: '' }
	]);

    const addFigureListItem = (groupId, fileInfoObj, caption, label) => {
		if (!groupId || !fileInfoObj || !caption || !label) {
			console.error(`Error: at addFigureListItem
			Some of these properties may be null.

			groupId: ${groupId}
			fileInfoObj: ${fileInfoObj}
			caption: ${caption}
			label: ${label}`);
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			const aNewFigure = {
				id: ulid(),
				groupId: groupId,
				object: fileInfoObj,
				base64data: e.target.result,
				caption: caption,
				label: label
			};
			setNewFigures((prevNewFigures) => [...prevNewFigures, aNewFigure]);
			setFigureList((prevList) => [...prevList, aNewFigure]);
		};
		reader.readAsDataURL(fileInfoObj)
	};

	const addFigureListItems = (figureArray) => {
		// newFiguresを初期化
		setNewFigures([]);

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
		newFigures,
		addFigureListItems,
		upperShiftFigureListItem,
		lowerShiftFigureListItem,
		deleteFigureListItem
	};
};