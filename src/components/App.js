import '../theme/App.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ulid } from 'ulid';

const ImageList = (imageInfoList) => {
  return (
    <ul>
      {imageList.map((imageInfo) => {
        <li key={ulid()}>
          <img src={imageInfo.base64data} />
        </li>
      })}
    </ul>
  );
};

function App() {


  const [fileInfo, setFileInfo] = useState({object: '', base64data: ''});
  const handleChange = (e) => {
    // fileInfo.object を上書き
    setFileInfo((prevInfo) => ({ ...prevInfo, object: e.target.files[0] }));
    
    const reader = new FileReader();
    // ファイル読み込み成功時の処理を定義(ファイル読み込みは非同期処理のため)
    reader.onload = (e) => {
      // fileInfo.base64data を上書き
      setFileInfo((prevInfo) => ({ ...prevInfo, base64data: e.target.result}));
    };

    // ファイル読み込み(非同期処理)
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="App">
      <input type="file" accept="image/*" onChange={handleChange}/>
      <img width="500" src={fileInfo.base64data} />
    </div>
  );
}

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

export default App;
