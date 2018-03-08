使用express-session做登录权限控制

```typescript
import * as session from "express-session";
app.use(session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true
}));
app.post("/user/login", function(req: Request, res: Response){
    if(req.session.user){
        res.json({data: "已经登录"});
        return;
    }
    let user: {[key: string]: string} = {
        username: req.query.username,
        password: req.query.password,
        rePassword: req.query.rePassword
    }
    req.session.user = user;
    res.json({data: "登录成功"});
});
```



