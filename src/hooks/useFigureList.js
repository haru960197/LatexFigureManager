import { useState } from 'react';
import { ulid } from 'ulid';

export const useFigureList = () => {
    const [figureList, setFigureList] = useState(
		localStorage.getItem('figureList')
			? JSON.parse(localStorage.getItem('figureList'))
			: []
	);
	const [newFigures, setNewFigures] = useState([
		// { id: '', object: '', base64data: '', caption: '', label: '', number: '' }
	]);

	function renewFigureNumber(figureList) {
		let curNumber = 1;
		figureList.forEach((figures) => {
			figures.forEach((figure) => {
				figure.number = curNumber;
				curNumber++;
			});
		});
	}

	function findDetailedIndex(id) {
		/*
			figureList = [
							[1, 2],
							[3, 4, 5],
							[7]
			]
			findDetailedIndex(5) => [1, 2]
		*/
		const retArray = [-1, -1];
		figureList.forEach((figures, i) => {
			const j = figures.findIndex((figure) => figure.id === id);
			if (j !== -1) {
				retArray[0] = i;
				retArray[1] = j;
			}
		});
		return retArray;
	}

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
				const newFigureList = [...figureList, newFigureListItem];
				renewFigureNumber(newFigureList);
				setFigureList(newFigureList);
				localStorage.setItem('figureList', JSON.stringify(newFigureList));
				setNewFigures(newFigureListItem);
			})
	};

	const upperShiftFigureListItem = (id) => {
		/*
		const [i, j] = findDetailedIndex(id);
		if (i === -1 && j === -1) return;

		let newFigureList = null;
		if (j === 0) {
			// 要素はgroupの先頭の要素 [[ -> 1], [ -> 2, 4, 6], ...]
			if (i === 0) return;
			if (figureList[i].length === 1) {
				// -> [1]
				newFigureList = [...figureList];
				newFigureList.splice(i, 0, figureList[i][0]);
				newFigureList[i + 1].splice(0, 1);
			} else {

			}
		}	

		const index = figureList.findIndex(fileInfo => fileInfo.id === id);
		if (index === 0) return;
		const newFileInfoList = figureList.map((fileInfo, i) => {
		  if (i === index - 1) return figureList[index];
		  else if (i === index) return figureList[index - 1];
		  else return fileInfo;
		});
		setFigureList(newFileInfoList);
		*/
  	};

	const lowerShiftFigureListItem = (id) => {
		/*
    	const index = figureList.findIndex(fileInfo => fileInfo.id === id);;
    	if (index === figureList.length - 1) return;
		const newFileInfoList = figureList.map((fileInfo, i) => {
			if (i === index) return figureList[index + 1];
			else if (i === index + 1) return figureList[index];
			else return fileInfo;
		});
    	setFigureList(newFileInfoList);
		*/
  	};

	const deleteFigureListItem = (id) => {
		function removeEmptyArray(figureList) {
			const newFigureList = figureList.filter((figures) => figures.length > 0);
			return newFigureList;
		}

		const [i, j] = findDetailedIndex(id);
		if ([i, j].toString() === [-1, -1].toString()) {
			console.error("id: " + id + " does not exist in the list");
			return;
		}
		let newFigureList = [...figureList];
		newFigureList[i].splice(j, 1);
		newFigureList = removeEmptyArray(newFigureList);
		renewFigureNumber(newFigureList);
		setFigureList(newFigureList);
		localStorage.setItem('figureList', JSON.stringify(newFigureList));
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