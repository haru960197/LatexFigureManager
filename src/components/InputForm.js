import { useState, useRef } from 'react';

export const InputForm = ({captionRef, labelRef, setNewFileObj, handleSubmit}) => {
  const [imageFile, setImageFile] = useState(null);
	const fileInputRef = useRef(null);
  const handleAddImageFile = (e) => {
		if (!e.target.files[0]) return;
    const newFileObj = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageFile(e.target.result);
			setNewFileObj({object: newFileObj, base64data: e.target.result});
    };
    reader.readAsDataURL(e.target.files[0]);
  };
	const handleSubmitLocal = (e) => {
		e.preventDefault();
		if (!imageFile || !captionRef.current.value || !labelRef.current.value ) return;
		setImageFile(null);
		handleSubmit();
	}
  return (
    <form onSubmit={handleSubmitLocal}>
      <button onClick={() => fileInputRef.current.click()}>
        画像を選択
      </button>
      <input
        hidden
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAddImageFile}
      />
      <img width="200" src={imageFile} />

      <div>
        <label htmlFor='caption'>キャプションを入力</label>
        <input id='caption' type="text" ref={captionRef}/>
      </div>

      <div>
        <label htmlFor='label'>ラベル名を入力</label>
        <input id='label' type="text" ref={labelRef}/>
      </div>

      <button type="reset" onClick={() => setImageFile(null)}>リセット</button>
      <button type="submit">追加</button>
    </form>
  );
};