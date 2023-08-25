import '../theme/App.css';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ulid } from 'ulid';
import { ImageList } from "./ImageList";

const InputForm = ({captionRef, labelRef, setNewFileObj, handleSubmit}) => {
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

function App() {
  const [fileInfoList, setFileInfoList] = useState([]);
  const [newFileObj, setNewFileObj] = useState({object: '', base64data: ''});

  const captionRef = useRef(null);
  const labelRef = useRef(null);
  const handleSubmit = () => {
		if (!newFileObj.object) return;

		const newfileInfo = {
			id: ulid(),
			object: newFileObj.object,
			base64data: newFileObj.base64data,
			caption: captionRef.current.value,
			label: labelRef.current.value
		}
		setFileInfoList([...fileInfoList, newfileInfo]);

		setNewFileObj({object: '', base64data: ''});
		captionRef.current.value = "";
		labelRef.current.value = "";
  };

  return (
    <div className="App">
      <InputForm 
        captionRef={captionRef}
        labelRef={labelRef}
				setNewFileObj={setNewFileObj}
        handleSubmit={handleSubmit}
      />
      <ImageList imageInfoList={fileInfoList} />
    </div>
  );
};

export default App;

/*
function InputForm() {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
    useForm({
      mode: 'onBlur',
      defaultValues: { email: "", name: "", birthday: "", password: ""},
      criteriaMode: 'all'
    });
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data) => console.log(data);
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          <label htmlFor='email'>メールアドレス</label>
          <input
            id='email'
            {...register("email", { required: "入力が必須の項目です"})}
            placeholder='oo@gmail.com'
          />
          {errors.email?.message && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor='name'>名前</label>
          <input id='name' type='text' {...register('name')} />
        </div>
        <div>
          <label htmlFor='birthday'>誕生日</label>
          <input id='birthday' type='date' {...register('birthday')}/>
        </div>
        <div>
          <label htmlFor='password'>パスワード</label>
          <div>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='6文字以上の英数字'
              {...register('password', {
                required: {
                  value: true,
                  message: "入力が必須の項目です"
                },
                minLength: {
                  value: 6,
                  message: "6文字以上入力してください"
                }
              })}
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "非表示" : "表示"}
            </button>
          </div>
          {errors.password?.types?.required && <div>{errors.password.types.required}</div>} 
          {errors.password?.types?.minLength && <div>{errors.password.types.minLength}</div>}
        </div>
        <button type='reset' >リセット</button>
        <button type='submit' disabled={!isDirty || !isValid} >提出</button>
      </form>
    </div>
  );
}
*/
