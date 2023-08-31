import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Image,
  Container,
} from '@chakra-ui/react';

export const FigureForm = ({img, cap, label, onImgChange, onCapChange, onLabelChange}) => {
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