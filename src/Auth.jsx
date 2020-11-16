import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn } from './reducks/users/selectors';
import { listenAuthState } from './reducks/users/operations';

const Auth = ({children}) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

// createdidmount
  useEffect(()=> {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  },[]);

  return (
    <>
      {children}
    </>
  )
}

export default Auth;