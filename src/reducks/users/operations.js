import { push } from 'connected-react-router'
import { auth,FirebaseTimestamp,db } from '../../firebase'
import {signInAction, signOutAction} from '../users/actions'

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      // 現在ログインしているユーザーを取得
      if (user) {
        const uid = user.uid
        // DBからユーザーの情報を取得
        db.collection('users').doc(uid).get()
        .then(snapshot => {
          const data = snapshot.data()

          // actionsのsignInActionのstateを変更
          dispatch(signInAction({
            isSignedIn: true,
            role: data.role,
            uid: uid,
            username: data.username
          }))
        })
      } else {
        // ユーザーが存在していない場合
        dispatch(push('/signin'))
      }
    })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert('必須項目が未入力です')
      return false
    } else {
      return auth.sendPasswordResetEmail(email)
          .then(() => {
              alert('入力されたアドレス宛にパスワードリセットのメールをお送りしましたのでご確認ください。')
              dispatch(push('/signin'))
          }).catch(() => {
              alert('登録されていないメールアドレスです。もう一度ご確認ください。')
          })
    }
  }
}


export const signIn = (email,password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      alert('必須項目が未入力です')
      return false
    }
    auth.signInWithEmailAndPassword(email,password)
        .then(result => {
          const user = result.user

          if (user) {
            const uid = user.uid

            db.collection('users').doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))

              dispatch(push('/'))
            })
          }
        })
  }
}

export const signUp = (username,email,password,confirmpassword) => {
  return async (dispatch) => {
    // バリデーション
    if (username === "" || email === "" || password === "" || confirmpassword === "") {
      alert('必須項目が未入力です')
      return false
    }
    if (password !== confirmpassword) {
      alert('パスワードが一致しません。もう一度入力してください')
      return false
    }
    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password) 
    .then(result => {
      const user = result.user

      if (user) {
        const uid = user.uid
        const timestamp = FirebaseTimestamp.now()

        const userInitalData = {
          create_at: timestamp,
          email: email,
          role: 'customer',
          uid: uid,
          updated_at: timestamp,
          username: username
        }

        db.collection('users').doc(uid).set(userInitalData)
        .then(()=> {
          dispatch(push('/'))
        })
      }
    })
  }
}

export const signOut = () => {
  return async(dispatch) => {
    auth.signOut()
      .then(()=> {
        dispatch(signOutAction())
        dispatch(push('/signin'))
      })
  }
}