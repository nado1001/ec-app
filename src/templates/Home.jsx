import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserId,getUserName} from '../reducks/users/selectors';
import {PrimaryButton} from '../components/UIkit';
import { signOut } from '../reducks/users/operations';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return(
    <div className="c-section-container">
      <h2>Home</h2> 
      <p>ユーザーID : {uid}</p>
      <p>ユーザー名 : {username}</p>
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton 
          label={'サインアウト'}
          onClick={()=> dispatch(signOut())}
        />
      </div>
    </div>
  )

}

export default Home;