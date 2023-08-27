import '../theme/App.css';
import { useState, useRef } from 'react';
import { ulid } from 'ulid';
import { ImageList } from "./ImageList";
import { InputForm } from './InputForm';
import { LatexFormat } from './LatexFormat';


function App() {
  const [fileInfoList, setFileInfoList] = useState([]);
	const [newFileInfo, setNewFileInfo] = useState(
		{ id: '', object: '', base64data: '', caption: '', label: '' }
	);

  const onSubmit = (data) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const aNewFileInfo = {
        id: ulid(),
        object: data.file[0],
        base64data: e.target.result,
        caption: data.caption,
        label: data.label
      };
      setNewFileInfo(aNewFileInfo);
      setFileInfoList([...fileInfoList, aNewFileInfo]);
    }
		reader.readAsDataURL(data.file[0])
  };

  return (
    <div className="App">
      <InputForm onSubmit={onSubmit}/>
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
