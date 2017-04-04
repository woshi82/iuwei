/*
 * @Author: zengyanling 
 * @Date: 2017-04-03 21:37:08 
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-03 21:39:37
 */

const API_ROOT = 'http://rg.test.biketo.com/api/v1/';


function callApi(endpoint, postParam, method) {

	let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
	let options = {};
//
	let parseParams = '';
	// for(var name in postParam) {
	// 	parseParams += name + '=' + postParam[name] + '&';
	// }
	if (method && method !== 'POST' ){
		for(var name in postParam) {
			parseParams += name + '=' + postParam[name] + '&';
		}
		if(method == 'GET'){
			fullUrl += '&' + parseParams;
			options = {
				method,
			};

		} else {
			options = {
				method,
				body: parseParams,
			};
		}
	} else {
		parseParams = new FormData();
		for(var name in postParam) {
			parseParams.append(name, postParam[name]);
		}

		options = {
			headers: {
				// 'Content-Type': 'text/html; charset=utf-8',
				// 'Content-Type': 'multipart/form-data; charset=utf-8',
				// 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			},
			method: method || 'POST',
			body: parseParams,
		};
	}
	console.log('请求类型', method || 'POST');
	console.log('请求链接', fullUrl);
	console.log('请求参数', parseParams);
	// return fetch(fullUrl, options)
	// 	.then(
	// 		response => {console.log(response)},
	// 		error => {console.log(error)}
	// 	);
	return fetch(fullUrl, options)
		.then(response =>
			response.json().then(json => ({ json, response }))
		).then(({ json, response }) => {

			console.log('请求链接', fullUrl, '返回值', json);
			// if (!response.ok || !json.status) {
			if (!response.ok || json.status !== 0) {
				return Promise.reject(json);
			}
			return json;
		})
		.then(
			response => ({ response }),
			error => ({ error }),
		);
}

function callImage(endpoint, postParam, method) {
	const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
	// console.log('postParam!!!!!', postParam)
	const formData = new FormData();
	formData.append('file', { type: 'image/*', name: 'file', uri: postParam.file });

	const options = {
		headers: {
			// 'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
		},
		method: method || 'POST',
		body: formData,
	};
	console.log('请求类型', method || 'POST');
	console.log('请求链接22', fullUrl);
	console.log('请求参数', formData);
	return fetch(fullUrl, options)
		.then(response =>
			response.json().then(json => ({ json, response }))
		).then(({ json, response }) => {

			console.log('返回值', json);
			if (!response.ok || json.status !== 0) {
				return Promise.reject(json);
			}
			return json;
		})
		.then(
			response => ({ response }),
			error => ({ error }),
		);
}


export const fetchLogin = (postParam, token) => callApi(`login/oauth?access_token=${token}`, postParam);
