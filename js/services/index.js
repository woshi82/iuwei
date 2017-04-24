/*
 * @Author: zengyanling 
 * @Date: 2017-04-03 21:37:08 
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-17 22:20:46
 */

const API_ROOT = 'http://120.24.244.31:2000/api/';
// const API_ROOT = 'http://192.168.1.101:2000/api/';


function callApi(endpoint, postParam, method) {

	let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
	let options = {};
//
	let parseParams = '';
	// for(var name in postParam) {
	// 	parseParams += name + '=' + postParam[name] + '&';
	// }
	//   
	if (method && method !== 'POST'){
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

export const fetchLogin = (postParam, token) => callApi(`login?`, postParam, 'POST');
