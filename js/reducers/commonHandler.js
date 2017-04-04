

export const commonRequest = (reducerName) => {
	return (state = { isFetching: false }, action) => {
		switch (action.type) {
			case reducerName.REQUEST:
				return {
					...state,
					isFetching: true,
					...action,  // FIXME: except type
				};
			case reducerName.SUCCESS:
				return {
					...state,
					status: 0, // 请求成功默认为 0
					isFetching: false,
					...action, // FIXME: except type
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
