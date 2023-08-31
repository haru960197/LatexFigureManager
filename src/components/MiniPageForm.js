import { useState, useRef, createRef, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Image,
  Container,
  HStack
} from '@chakra-ui/react';

const FigureForm = ({img, cap, label, onImgChange, onCapChange, onLabelChange}) => {
	const fileInputRef = useRef(null);
  const {
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    criteriaMode: 'all'
  });

  // ファイルinput要素のための設定 (<input/>を隠して使うため)
  const { ref, ...rest } = register("file", {
    required: "ファイルを選択してください",
    onChange: onImgChange
  });

  return (
    <form>
      <FormControl isInvalid={errors.file}>
        <Container centerContent>
          <Button mt={3} colorScheme='teal' onClick={() => fileInputRef.current.click()}>
            画像を選択
          </Button>
          <Input
            type="file"
            accept="image/*"
            hidden
            ref={(e) => {
              ref(e);
              fileInputRef.current = e;
            }}
            {...rest}
          />
          <FormErrorMessage>
            {errors.file?.message && errors.file.message}
          </FormErrorMessage>
          <Image mt={3} width="150px" src={img.data} />
        </Container>
      </FormControl>

      <FormControl isInvalid={errors.caption}>
        <Input
          id='caption'
          type="text"
          value={cap}
          placeholder='caption'
          mt={3}
          borderColor="teal"
          borderWidth="1.5px"
          {...register("caption", {
            required: "キャプションの入力は必須です",
            onChange: onCapChange
          })}
        />
        <FormErrorMessage>
          {errors.caption && errors.caption.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.label}>
        <Input
          id='label'
          type="text"
          value={label}
          placeholder='label'
          borderColor={"teal"}
          borderWidth="1.5px"
          mt={3}
          {...register("label", {
            required: "ラベルの入力は必須です",
            pattern: {
              value: /[ -~]+/,
              message: "ラベルは\"半角文字のみ\"で入力してください"
            },
            onChange: onLabelChange
          })}
        />
        <FormErrorMessage>
          {errors.label?.types?.required && errors.label.types.required}
          {errors.label?.types?.pattern && errors.label.types.pattern}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
};

export const MiniPageForm = ({leftIcon, onSubmit}) => {
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
    figures.forEach((data) => {
      ret &= data.img.info !== null;
      ret &= data.cap !== '';
      ret &= data.label !== '' && /[ -~]+/.test(data.label);
    });
    return ret;
  };

  const handleSubmit = () => {
    console.log(figures);
  };

  const handleReset = () => {
    setFigures([
      {img: {data: null, info: null}, cap: '', label: ''},
      {img: {data: null, info: null}, cap: '', label: ''},
      {img: {data: null, info: null}, cap: '', label: ''}
    ]);
  };

  return (
    <Container centerContent>
      <HStack>
        {dataToInputForm(figures[0], 0)}
        {dataToInputForm(figures[1], 1)}
        {dataToInputForm(figures[2], 2)}
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