import '../theme/App.css';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ulid } from 'ulid';
import { ImageList } from "./ImageList";
import { InputForm } from './InputForm';
import { LatexFormat } from './LatexFormat';


function App() {
  const [fileInfoList, setFileInfoList] = useState([]);
	const [newFileInfo, setNewFileInfo] = useState(
		{ id: '', object: '', base64data: '', caption: '', label: '' }
	);
  const captionRef = useRef(null);
  const labelRef = useRef(null);

  const handleSubmit = () => {
    // 必要な情報がすべて入力されていることは
    // InputForm.js内で保証されている

		const aNewFileInfo = {
			...newFileInfo,
      id: ulid(),
			caption: captionRef.current.value,
			label: labelRef.current.value
		}
    
    // 最後に追加したファイルの情報を更新
		setNewFileInfo(aNewFileInfo);
    // 新たなファイルをリストに追加
		setFileInfoList([...fileInfoList, aNewFileInfo]);

		captionRef.current.value = "";
		labelRef.current.value = "";
  };

  return (
    <div className="App">
      <InputForm 
        captionRef={captionRef}
        labelRef={labelRef}
				setNewFileInfo={setNewFileInfo}
        handleSubmit={handleSubmit}
      />
			<LatexFormat newFileInfo={newFileInfo} />
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
