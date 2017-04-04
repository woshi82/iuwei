var express = require('express'),
    path = require('path'),
    app = express(),
    BASE_DIR = path.join(__dirname, './');

// if (process.env.NODE_ENV === 'dev') {
// mock 功能
app.use(require('yog-devtools')({
    view_path: '', // 避免报错。
    rewrite_file: [path.join(BASE_DIR, 'mock/server.conf')],
    data_path: [path.join(BASE_DIR, 'mock')]
}));
// }

var PORT = 2000;

app.listen(PORT, function() {
    console.log('Server start! http://127.0.0.1:%d/', PORT);
});
