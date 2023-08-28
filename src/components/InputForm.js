import { useState, useRef } from 'react';
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

export const InputForm = ({leftIcon, onSubmit}) => {
  const [imageFile, setImageFile] = useState(null);
	const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm({
    defaultValues: {
      id: '',
      object: '',
      base64data: '',
      caption: '',
      label: ''
    },
    criteriaMode: 'all'
  });

  const handlePreviewImage = (e) => {
		if (!e.target.files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageFile(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // ファイルinput要素のための設定
  const { ref, ...rest } = register("file", {
    required: "ファイルを選択してください",
    onChange: handlePreviewImage
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <Image width="300px" src={imageFile} />
        </Container>
      </FormControl>

      <FormControl isInvalid={errors.caption}>
        <Input
          id='caption'
          type="text"
          placeholder='caption'
          mt={3}
          borderColor="teal"
          borderWidth="1.5px"
          {...register("caption", {
            required: "キャプションの入力は必須です"
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
          placeholder='label'
          borderColor={"teal"}
          borderWidth="1.5px"
          mt={3}
          {...register("label", {
            required: "ラベルの入力は必須です",
            pattern: {
              value: /[ -~]+/,
              message: "ラベルは\"半角文字のみ\"で入力してください"
            }
          })}
        />
        <FormErrorMessage>
          {errors.label?.types?.required && errors.label.types.required}
          {errors.label?.types?.pattern && errors.label.types.pattern}
        </FormErrorMessage>
      </FormControl>

      <Container centerContent>
        <HStack>
          <Button type="reset" m={3} colorScheme='teal' onClick={() => setImageFile(null)}>リセット</Button>
          <Button type="submit" m={3}  leftIcon={leftIcon} colorScheme='teal' disabled={!isValid}>追加</Button>
        </HStack>
      </Container>
    </form>
  );
};