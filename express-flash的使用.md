## express-flash的使用

```typescript
import * as express from "express";
import * as flash from "express-flash";
import * as bodyParser from "body-parser";
import * as session from "express-session";

const app = express();

// 指定模板文件所在的文件夹路径
app.set("views", "./views");
// 指定使用的模板引擎
app.set("view engine", "pug");

// 使用express-flash需要的其他组件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ 
    resave: true,
    saveUninitialized: true,
    secret: "abcd"
}));

app.use(flash());

app.get("/index", function(req, res){
    req.flash('error', "this is a test");
    res.render('index', {title: "hey", message: "Hello World", authenticated: true, friends:10});
});

app.listen(3000, function(){
    console.log("listen port 3000");
});
```

在pug模板文件中使用messages.error获取传递的信息"this is a test".



由于express-flash没有相关的.d.ts声明文件,所以需要自己编写一个声明文件,以便在编写代码的过程中,编辑器给以相应的提示和避免方法不存在的错误提示.(.d.ts声明文件如下)

```typescript
/// <reference types="express" />
// Add Flash Interface on to Express's Request Interface.
declare namespace Express {
    interface Request extends Flash {}
}

interface Flash {
    flash(type: string, message: any): void;
}

declare module "express-flash";
```

使用flash信息的模板如下:

```html
html
  head
    title = title
  body
    h1=message
    a(href="www.baidu.com") 这是一个链接
    p(class=authenticated ? 'authed' : 'anon')
    - list = ["Uno", "Dos", "Tres","Cuatro", "Cinco", "Seis"]
    p= 'This code is <escaped>!'
    p= messages.error
```

------

运行结果如下图所示:

![](/home/linyimin/Pictures/Selection_023.png)