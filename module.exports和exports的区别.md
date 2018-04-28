### module.exports和exports的区别

1. 默认情况下,module.exports只想一个空的对象{},用于导出单个对象,require引入后可以直接使用

2. exports是对module.exports的一个全局引用,且exports不允许被重写,因为exports重写之后,它将不再指向module.exports,如果想维持这个链接可以使用以下的语句:

   `module.expors = exports = object`

3. 当一个模块中同时存在module.exports和exports,最终的导出结果是module.exports

```js
exports.variable = function(){}
module.exports.variable = function(){}
```

以上两种情况等价



