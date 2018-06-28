const url=require('url');
const fs=require('fs');
const async=require('async');
var  cook=require('./cok');


var sUrl='http://fulinono.com/73986.html/2';
//var cok;
//writeFiles(sUrl,'73986.html');
//var cok='wordpress_logged_in_dcc17236cc0d83bb5c006deff65e8c33=share10%7C1530272184%7CBRfoGwYgx6xG8qRA2CqVJiZyXFj4S6TjlAJ30qeO3fL%7Cedc8520497424ca9ecb288b5a30c4849f40734f2f4f15b7afd9f66b3a76519b0; __cfduid=d9df11fd670466283002ef5ef13dcc5791530099464; __tins__18634203=%7B%22sid%22%3A%201530099381684%2C%20%22vd%22%3A%205%2C%20%22expires%22%3A%201530101261984%7D; __51cke__=; __51laig__=508; dx_current_page=http%3A//fulinono.com/73986.html/2; wordpress_test_cookie=WP+Cookie+check'
async.waterfall([//异步调用方法传参
	
    function(callback){
		cook.getCookie(data=>{
			var arr=data;
			var arr1=[];var arr2=[];
			for (i in data){
				//console.log(data[i]);
				let str=data[i].split(";")[0].replace('=+',"");
				arr1.push(str);
			}
			//console.log(arr1);
			for (i in arr1){
				if(arr2.indexOf(arr1[i]) == -1){ 
					arr2.push(arr1[i]); 
			} 
			}
			//console.log(arr2.toString().replace(/,/g,';' ));
			//console.log(arr2.toString());
			//__cfduid=d3bfdf4f594c6ba7740bbd9024eb9d9bf1530104049;wordpress_test_cookie=WP+Cookie+check;
			//callback(null, arr2.toString().replace(/,/g,';' ));
			//callback(null, ' __cfduid=dabdea4f2c8950f86953e4f85e1d070a71530104641;wordpress_test_cookie=WP+Cookie+check;wordpress_dcc17236cc0d83bb5c006deff65e8c33;wordpress_sec_dcc17236cc0d83bb5c006deff65e8c33;wordpress_logged_in_dcc17236cc0d83bb5c006deff65e8c33=share10%7C1530272184%7CBRfoGwYgx6xG8qRA2CqVJiZyXFj4S6TjlAJ30qeO3fL%7Cedc8520497424ca9ecb288b5a30c4849f40734f2f4f15b7afd9f66b3a76519b0;wordpressuser_dcc17236cc0d83bb5c006deff65e8c33;wordpresspass_dcc17236cc0d83bb5c006deff65e8c33;');
		});
		 
	},
	function(n,callback){
		getUrl(sUrl,n,data=>{
		
		callback(null, data);
	});
		 
	},
    function(n, callback){
		//console.log(n);
		writeFiles(sUrl,'73986.html',n);
		
	}
], function(err, results){
    console.log(err);
    console.log(results);
});

//Cookie

// write File
function writeFiles(sUrl,fileName,fileDate){
	
	
	fs.writeFile(fileName,fileDate,function(){
		console.log('复制文件成功')
	});
}

	//get  HTML
function getUrl(sUrl,cok,success){
	var urlObj=url.parse(sUrl);
	console.log(cok);
	var http;
	if(urlObj.protocol='http'){
		http=require('http');
	}else{
		http=require('https');
	}
	var req=http.request({
		'hostname':urlObj.hostname,
		'path':urlObj.path, 
		headers: {
			'cookie': cok
  }},res=>{
			if(res.statusCode==200){
		//var arr=[];
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
		console.log('404 未找到');
	});
}