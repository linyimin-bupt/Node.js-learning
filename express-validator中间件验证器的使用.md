## express-validator中间件验证器的使用

```typescript
import * as expressValidator from "express-validator";

import * as express from "express";

const app = express();
app.use(expressValidator({
    // 自定义验证函数
    customValidators:{
        isEqual: function(username): boolean{
            console.log(username);
            if(username === "linyimin@163.com"){
                return true;
            }
            return false;
        }
    }
}));
app.get("/user", (req, res, next) => {
    // 在验证链上调用自定义验证函数
    req.check("username").isEmail().isEqual().withMessage("hahahah");
    res.json(req.validationErrors());
});

app.listen(3000, () => {
    console.log('listen port 3000');
});
```

${\color{red}{自定义验证函数如果定义了两个变量,在调用自定义验证函数时,只需传递一个参数,验证的参数会自动绑定,如果传递两个参数,第二个参数为null}}$

