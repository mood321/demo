const fs=require('fs');
const url=require('url');
const gbk=require('gbk');
//const JSDOM=require('jsdom').JSDOM;
const cheerio = require('cheerio')
var index=0;
GetUrl('http://fulinono.com/',data=>{
	//console.log(index);
	//fs.writeFile('xiaomi3.html',data,function(){
	//	console.log('成功')
	//});
	//console.log(data)
	
	var html=gbk.toString('utf-8',data);
	//let dom=new JSDOM(html);
	//let document=dom.window.document;
	//console.log(document.getElementsByTagName('div'));
	 $ = cheerio.load(html);
	 console.log($("div"));
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
		//console.log(res.statusCode,res.headers);
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
