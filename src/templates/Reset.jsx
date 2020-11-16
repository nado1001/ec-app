import React,{useState,useCallback} from 'react';
import {TextInput,PrimaryButton} from '../components/UIkit';
import {resetPassword} from '../reducks/users/operations';
import {useDispatch} from 'react-redux'
import { push } from 'connected-react-router';

//tk.tech1001@gmail.com
//takeda0317

const Reset = ()=> {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");

  const inputEmail = useCallback((event)=> {
    setEmail(event.target.value)
  },[setEmail]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text__center">パスワードのリセット</h2>
      <div className="module-spacer--medium" />
      <TextInput fullWidth={true} label={'メールアドレス'} multiline={false} required={true} rows={1} value={email} type={'email'} onChange={inputEmail}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton 
          label={'パスワードをリセットする'}
          onClick={()=> dispatch(resetPassword(email))}
        />
      </div>

      <div className="center">
        <PrimaryButton 
          label={'ログイン画面に戻る'}
          onClick={()=> dispatch(push('/signin'))}
        />
      </div>
    </div>
  )
}

export default Reset;