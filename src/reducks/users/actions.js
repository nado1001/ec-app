//アプリからデータを送るためのpayload（データのかたまり）を渡す役割
//データをReducersへ渡す

export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState) => {
	return {
		type: 'SIGN_IN',
		payload: {
			isSignedIn: true,
			uid: userState.uid,
			role: userState.role,
			username: userState.username,
		}
	}
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => {
	return {
		type: 'SIGN_OUT',
		payload: {
			isSignedIn: false,
			uid: "",
			role: "",
			username: "",
		}
	}
};