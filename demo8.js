const fs=require('fs');
const url=require('url');
const gbk=require('gbk');
//const JSDOM=require('jsdom').JSDOM;
const cheerio = require('cheerio');
const express=require('express');
var index=0;
GetUrl('https://www.xs8.cn/book/7007061503249401#Catalog',data=>{
	//console.log(index);
	//fs.writeFile('xiaomi3.html',data,function(){
	//	console.log('成功')
	//});
	//console.log(data)
	
	//var html=gbk.toString('utf-8',data);
	//let dom=new JSDOM(html);
	//let document=dom.window.document;
	//console.log(document.getElementsByTagName('div'));
	//console.log(data);
	 $ = cheerio.load(data);
	 console.log($("div[class='read-content j_readContent'] p").innerHTML);
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
		var str='';
		res.on('data',buffer=>{
			//arr.push(buffer);
			str+=buffer;
		});
		res.on('end',()=>{
			//let b=Buffer.concat(arr);
			success && success(str);
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
