import { useState, useRef } from 'react';

export const InputForm = ({captionRef, labelRef, setNewFileInfo, handleSubmit}) => {
  const [imageFile, setImageFile] = useState(null);
	const fileInputRef = useRef(null);
  const handlePreviewImage = (e) => {
		if (!e.target.files[0]) return;
    const newFileObj = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageFile(e.target.result);
			setNewFileInfo((prevInfo) => 
      ({...prevInfo, object: newFileObj, base64data: e.target.result}));
    };
    reader.readAsDataURL(e.target.files[0]);
  };
	const handleSubmitLocal = (e) => {
		e.preventDefault();
    // 全ての要素が適切に入力されていることをチェック
		if (!imageFile || !captionRef.current.value || !labelRef.current.value ) return;
    
    // プレビューを削除
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
        onChange={handlePreviewImage}
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