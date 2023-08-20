export const getCookie = (name) => {
	//获取当前所有cookie
	let strCookies = document.cookie;
	//截取变成cookie数组
	let array = strCookies.split(';');
	//循环每个cookie
	for (let i = 0; i < array.length; i++) {
		//将cookie截取成两部分
		let item = array[i].split("=");
		//判断cookie的name 是否相等
		if (item[0].replace(/^\s+|\s+$/g, "") === name) {
			return item[1];
		}
	}
	return null;
}

export const setCookie = (name, value) => {
	document.cookie =name + "=" + value;
	return document.cookie
}


export const  deleteCookie=(name) =>{
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}