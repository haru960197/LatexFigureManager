import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

export const InputForm = ({onSubmit}) => {
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
    required: "* ファイルを選択してください",
    onChange: handlePreviewImage
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <button onClick={() => fileInputRef.current.click()}>
          画像を選択
        </button>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={(e) => {
            ref(e);
            fileInputRef.current = e;
          }}
          {...rest}
        />
        {errors.file?.message && <div>{errors.file.message}</div>}
        <img width="200" src={imageFile} />
      </div>

      <div>
        <label htmlFor='caption'>キャプションを入力</label>
        <input
          id='caption'
          type="text"
          {...register("caption", {
            required: "* キャプションの入力は必須です"
            })}
        />
        {errors.caption?.message && <div>{errors.caption.message}</div>}
      </div>

      <div>
        <label htmlFor='label'>ラベル名を入力</label>
        <input
          id='label'
          type="text"
          {...register("label", {
            required: "* ラベルの入力は必須です",
            pattern: {
              value: /[ -~]+/,
              message: "* ラベルは\"半角文字のみ\"で入力してください"
            }
          })}
        />
        {errors.label?.types?.required && <div>{errors.label.types.required}</div>}
        {errors.label?.types?.pattern && <div>{errors.label.types.pattern}</div>}
      </div>

      <button type="reset" onClick={() => setImageFile(null)}>リセット</button>
      <button type="submit" disabled={!isValid}>追加</button>
    </form>
  );
};