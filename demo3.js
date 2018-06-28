const fs=require('fs');
const url=require('url');
var index=0;
GetUrl('https://detail.tmall.com/item.htm?id=567285567013&ali_refid=a3_430583_1006:1102515942:N:%E5%B0%8F%E7%B1%B3:a504e68f949c9c5753b92f7d17078dac&ali_trackid=1_a504e68f949c9c5753b92f7d17078dac&spm=a230r.1.14.3&sku_properties=10004:385316259;5919063:6536025',data=>{
	//console.log(index);
	//fs.writeFile('xiaomi3.html',data,function(){
	//	console.log('成功')
	//});
	console.log(data)
	
});
function GetUrl(sUrl,success){
	
	index++;
	console.log(index);
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
		console.log(res.statusCode,res.headers);
		console.log(res.statusCode==200);
		if(res.statusCode==200){
		var arr=[];
		res.on('data',buffer=>{
			arr.push(buffer);
		});
		res.on('end',()=>{
			let b=Buffer.concat(arr);
			success && success(b);
		});
	
	
	}else if(res.statusCode==302||res.statusCode==301){
		GetUrl(res.headers.location,success);
	}
	
	});
	
	
	req.end();
	req.on('error',function(){
		console.log('error');
	});
}
