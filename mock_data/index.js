var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    BASE_DIR = path.join(__dirname, './');

app.use(bodyParser.urlencoded({ extended: false })); 
// mock 功能
// app.use(require('yog-devtools')({
//     view_path: '', // 避免报错。
//     rewrite_file: [path.join(BASE_DIR, 'mock/server.conf')],
//     data_path: [path.join(BASE_DIR, 'mock')]
// }));


app.post('/api/login', function(req, res){
    console.log(req.body)
    res.json({
        'status': 0,
        'message': '暂时没有错误',
        'data': {
            'info': {
                'username': req.body.username
            }
        }
    });
});

var PORT = 2000;
/**
 * 获取当前机器的 IP
 */
function getLoaclIP() {
var ifaces = require('os').networkInterfaces();
var ifnames = Object.keys(ifaces);
var j = 0;
for (; j < ifnames.length; j++) {
    var ifname = ifnames[j];
    var i = 0;
    for (; i < ifaces[ifname].length; i++) {
        var iface = ifaces[ifname][i];
        if ('IPv4' === iface.family && !iface.internal) {
            return iface.address;
        }
    }
}
return '127.0.0.1';
}
app.listen(PORT, function() {
    console.log('Server start! http://%s:%d/', getLoaclIP(), PORT);
});
