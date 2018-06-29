const superagent=require('superagent');

exports.getCookie=function(success){
	//3
    superagent.post('http://fulinono.com/wp-login.php')
        .type('form')
        .send({
            log: 'share10',
            pwd: 'share10',
            origin: "PC"
        })
        .end(function(err, res) {
            if (err) {
                handleErr(err.message);
                return;
            }
			console.log(res.header);
            cookie = res.header['set-cookie']; //从response中得到cookie
            //emitter.emit("setCookeie");
			success && success(cookie);
        })
}