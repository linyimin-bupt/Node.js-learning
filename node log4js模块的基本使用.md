##node log4js模块的基本使用

**logger.js文件**

```javascript
const log4js = require('log4js');
const path = require("path");

let filename = path.join(__dirname, "./log/")
log4js.configure({
  appenders: { debug: { type: 'file', filename: path.join(filename, "debug.log") } },
  categories: { default: { appenders: ['debug'], level: 'trace' } },
  appenders: { info: { type: 'file', filename: path.join(filename, "info.log") } },
  categories: { default: { appenders: ['info'], level: 'trace' } },
  appenders: { error: { type: 'file', filename: path.join(filename, "error.log") } },
  categories: { default: { appenders: ['error'], level: 'error' } },
});


const getLogger = function(type){
    return log4js.getLogger(type);
}
module.exports = getLogger;
```

**test.js文件**

```javascript
const getLogger = require("./logger);
const logger = getLogger("error");
logger.error(new Error("这是一个错误日志测试"));
```

然后执行文件test.js

```shell
node test.js
```

