
exports.aa = () => {
	return dispatch => {
		dispatch();
		net.fetch.then()
	}
}

export const commonRequest = (reducerName) => {
	return (state = { isFetching: false }, action) => {
		switch (action.type) {
			case reducerName.REQUEST:
				let params = JSON.parse(JSON.stringify(action));
				delete params.type;
				return {
					...state,
					isFetching: true,
					...params,
				};
			case reducerName.SUCCESS:
				params = JSON.parse(JSON.stringify(action));
				delete params.type;
				return {
					...state,
					status: 0, // 请求成功默认为 0
					isFetching: false,
					...params,
				};
			case reducerName.FAILURE:
				const error = action.error;
				// FIXME: 此处 error 、 message 参数多余
				return {
					...state,
					isFetching: false,
					status: error.status || -1, // -1 代表本地请求错误
					// error: error.status ? error.error : error,
					message:  error.status ? error.message : error,
				};
			default:
				return state;
		}
	};
};
