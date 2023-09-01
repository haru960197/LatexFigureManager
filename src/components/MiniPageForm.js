import { useState } from 'react';
import {
  Button,
  Container,
  HStack
} from '@chakra-ui/react';
import { FigureForm } from './FigureForm';

export const MiniPageForm = ({leftIcon, formNum = 3, onSubmit}) => {
  const [figures, setFigures] = useState([
    {img: { data: null, info: null }, cap: '', label: ''},
    {img: { data: null, info: null }, cap: '', label: ''},
    {img: { data: null, info: null }, cap: '', label: ''}
  ]);
  
  const setImg = (img, index) => {
    setFigures((prevDatas) => (
      prevDatas.map((data, i) => {
        if (i === index) {
          return ({...data, img: img})
        } else {
          return data;
        }
      })
    ));
  };

  const setCap = (cap, index) => {
    setFigures((prevDatas) => (
      prevDatas.map((data, i) => {
        if (i === index) {
          return ({...data, cap: cap});
        } else {
          return data;
        }
      })
    ));
  };

  const setLabel = (label, index) => {
    setFigures((prevDatas) => (
      prevDatas.map((data, i) => {
        if (i === index) {
          return ({...data, label: label});
        } else {
          return data;
        }
      })
    ));
  };

  function dataToInputForm(data, index) {
    
    function processFileInfo(imgInfo, index) {
      if (!imgInfo) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        setImg({data: e.target.result, info: imgInfo}, index);
      };
      reader.readAsDataURL(imgInfo);
    }

    return (
      <FigureForm
        key={index}
        img={data.img}
        cap={data.cap}
        label={data.label}
        onImgChange={(e) => processFileInfo(e.target.files[0], index)}
        onCapChange={(e) => setCap(e.target.value, index)}
        onLabelChange={(e) => setLabel(e.target.value, index)}
      />
    );
  }

  const isValid = () => {
    let ret = true;

    for (let i = 0; i < formNum; i++) {
      const data = figures[i];
      ret &= data.img.info !== null;
      ret &= data.cap !== '';
      ret &= data.label !== '' && /[ -~]+/.test(data.label);
    }
    return ret;
  };

  const handleReset = () => {
    setFigures([
      {img: {data: null, info: null}, cap: '', label: ''},
      {img: {data: null, info: null}, cap: '', label: ''},
      {img: {data: null, info: null}, cap: '', label: ''}
    ]);
  };

  const handleSubmit = () => {
    console.log(figures);

    handleReset();
  };

  return (
    <Container centerContent>
      <HStack>
        {dataToInputForm(figures[0], 0)}
        {formNum >= 2 && dataToInputForm(figures[1], 1)}
        {formNum >= 3 && dataToInputForm(figures[2], 2)}
      </HStack>
      <HStack>
        <Button m={3} colorScheme='teal' onClick={handleReset}>リセット</Button>
        <Button
          m={3}
          leftIcon={leftIcon}
          colorScheme='teal'
          onClick={handleSubmit}
          isDisabled={!isValid()}
        >追加</Button>
      </HStack>
    </Container>
  );
}