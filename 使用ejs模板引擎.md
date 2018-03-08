##使用ejs模板引擎

模板引擎（Template Engine）将页面模板和数据结合起来生成和和html的工具。

### ejs模板的安装

```javascript
cnpm install ejs --save
```



### 前端代码

```html
<!DOCTYPE HTML>
<html>
    <body>
        <h1><%= name %  ></h1>
    </body>
</html>
```

### 后台代码

```typescript
import * as path from "path";
import * as express from "express";
import {Request, Response} from "express";
let app = express();
// 设置模板文件的目录
app.set("views", path.join(__dirname, "../views"));
// 设置模板引擎
app.set('viewv engine', 'ejs');
app.get("/test", function(req: Request, res:Response){
    res.render('test', {
        name: req.query.username
    });
})
```

