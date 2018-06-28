const fs=require('fs');
const url=require('url');

GetUrl('http://flb8.net/wp-content/uploads/2018/06/NNPJ0623-1.png',data=>{
	//console.log(data);
	//fs.writeFile('1.png',data,function(){
	//	console.log('成功')
	//});
	
});
function GetUrl(sUrl,success){
	var urlObj=url.parse(sUrl);
	var http;
	if(urlObj.protocol=='http:'){
		 http=require('http');
	}else{
		 http=require('https');
	};
	//console.log(urlObj)
	let req=http.request({
		'hostname':urlObj.hostname,
		'path':urlObj.path
	},res=>{
		var arr=[];
		res.on('data',buffer=>{
			arr.push(buffer);
		});
		res.on('end',()=>{
			let b=Buffer.concat(arr);
			success && success(b);
		});
	});
	req.end();
	req.on('error',function(){
		console.log('error');
	});
}
