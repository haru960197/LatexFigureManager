import { useState } from 'react';
import { ulid } from 'ulid';

export const useFigureList = () => {
    const [figureList, setFigureList] = useState([]);
	const [newFigures, setNewFigures] = useState([
		// { id: '', object: '', base64data: '', caption: '', label: '' }
	]);

	const addFigureListItems = async (figureArray) => {

		function readFigureImgData(figure) {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onload = (e) => {
					const aNewFigure = {
						id: ulid(),
						object: figure.img.info,
						base64data: e.target.result,
						caption: figure.cap,
						label: figure.label
					};
					resolve(aNewFigure);
				};
				reader.readAsDataURL(figure.img.info);
			});
		}

		const figurePromises = figureArray.map((figure) => readFigureImgData(figure));
		Promise.all(figurePromises)
			.then((newFigureListItem) => {
				setFigureList((prevList) => [...prevList, newFigureListItem]);
				setNewFigures(newFigureListItem);
			})
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