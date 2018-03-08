# 使用mongodb存储express-session的数据

```typescript
import * as session from "express-session";
import * as mongo from "connect-mongo";
import * as express from "express";

const MongoStore = mongo(session);
const app = express();


// 配置session相关信息
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "linyimin",
    // 使用mongodb存储session信息
    store: new MongoStore({
        url: 'mongodb://localhost:27017/session',
        autoReconnect: true
    })
}));

// 存储session信息
app.get("/user", function(req, res, next){
    let user = {
        username: "linyimin",
        password: "hahahaha"
    };
    req.session.user = user;
    res.json(user);
});
// 从session中取出用户信息
app.get('/index', (req, res, next) => {
    res.json(req.session.user);
});

app.listen(3000, function(){
    console.log("listen port 3000");
})
```

通过以上的配置即可实现简单的mongodb存储session数据功能.使用shell查询mongodb的session数据库中的sessions表，即可看到持久化存储的session数据

```shell
# 开启mongodb服务
service mongod start
# 通过shell链接mongodb
mongo --host 127.0.0.1:27017
# 选择session数据库
use session
# 查询collection sessions的内容
db.sessions.find({})
```



![](/home/linyimin/Pictures/Selection_021.png)

相关包详细信息

[connect-mongo](https://www.npmjs.com/package/connect-mongo)

[express-session](https://www.npmjs.com/package/express-session)

