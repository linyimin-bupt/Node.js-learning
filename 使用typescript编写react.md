## 使用typescript编写react

### 初始化项目

```shell
npm init
```

### 安装相关组件

```shell
# 安装typescript和awesome-typescript-loader
cnpm install typescript awesome-typescript-loader --dev
cnpm install @types/typescript --dev

# 安装react和react-dom
cnpm install react react-dom --save
cnpm install @types/react @types/react-dom  --dev


# 安装webpack,指定相关版本,不指定版本可能还会出现不兼容,无法完成编译
cnpm install webpack@3.10.0 webpack-dev-server@2.9.7 --dev

# 安装其他插件
cnpm install html-webpack-plugin
cnpm install source-map-loader
cnpm install style-loader
cnpm install css-loader
```

## 配置

**tsconfig.json**

```json
{
    "compilerOptions": {
      "module": "commonjs", //指定生成哪个模块系统代码
      "target": "es6", //目标代码类型
      "noImplicitAny": false, //在表达式和声明上有隐含的'any'类型时报错。
      "sourceMap": false, //用于debug   
      "rootDir": "./src", //仅用来控制输出的目录结构--outDir。
      "outDir": "./build", //重定向输出目录。   
      "watch": true ,//在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。
      "jsx": "react"
    },
    "include": [
      "./src/**/*"
    ],
    "exclude": [
      "views",
      "static"
    ]
  }

```

**webpack.config.js**

```js
const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./index.html"
        })
    ],
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    }
}
```

## 闯创建项目结构

```shell
cd project_name;
## 新建index.html
touch index.html
# 创建文件结构
##  存放react编写的组件
mkdir -p ./src/components
## 存放相关样式文件
mkdir -p ./src/styles
## 新建入口程序
touch ./src/index.tsx
```

## 编写示例代码

**index.tsx**

```react
import * as React from "react";
import * as ReactDom from "react-dom";
import {App} from "./components/App";
import "./styles/style.css"
const ROOT =  document.querySelector('.container');

ReactDom.render(<h1>Hello World</h1>h1>, ROOT);
```

**index.html**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Document</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <div class="container"></div>
    <script src="/bundle.js"></script>
</body>
</html>
```

### style.css文件

```css

body{
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 14px;
    line-height: 1.3rem;
    background-color: #f3f3f3;
}

```



### 修改package.json文件中的script

```json
{
  "name": "node-modules-learning",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^16.2.0",
    "react-dom": "^16.2.0"
  },
  "devDependencies": {
    "awesome-typescript-loader": "^4.0.1",
    "css-loader": "^0.28.10",
    "html-webpack-plugin": "^3.0.6",
    "source-map-loader": "^0.2.3",
    "style-loader": "^0.20.2",
    "typescript": "^2.7.2",
    "webpack": "^3.0.0",
    "webpack-dev-server": "^2.9.7"
  }
}

```



### 运行代码

```shell
npm start
```

### 运行结果

默认使用8080端口,所以在浏览器地址栏输入:`localhost:8080`

![运行结果](/home/linyimin/Pictures/Selection_024.png)

