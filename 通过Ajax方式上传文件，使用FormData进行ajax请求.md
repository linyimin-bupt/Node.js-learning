##通过Ajax方式上传文件，使用FormData进行ajax请求

### 通过传统的form表单提交的方式上传文件	：



```html
<form id= "uploadForm" action= "http://localhost:8080/cfJAX_RS/rest/file/upload" method= "post" enctype ="multipart/form-data">  
     <h1 >测试通过Rest接口上传文件 </h1>  
     <p >指定文件名： <input type ="text" name="filename" /></p>  
     <p >上传文件： <input type ="file" name="file" /></p>  
     <p >关键字1： <input type ="text" name="keyword" /></p>  
     <p >关键字2： <input type ="text" name="keyword" /></p>  
     <p >关键字3： <input type ="text" name="keyword" /></p>  
     <input type ="submit" value="上传"/>  
</form>  
```



不过传统的form表单提交会导致页面刷新，但是在有些情况下，我们不希望页面被刷新，这种时候应该使用Ajax方式进行请求进行请求

```javascript
$ajax({
  url:"http://localhost:8000/uploads",
  type:"POST",
  data:$("uploadForm").serialize(),
  success: function(data){
    console.log(data);
  },
  error: function(data){
    console.log(data);
  }
});
```

如上，通过$("uploadForm").serialize()可以对form表单进行序列化，从而将form表单中的所有参数传递到服务器端。

但是上述方式只能传递一般的参数，上传文件的文件流是无法被序列化并传递的。这是需要使用FormData对象实现通过Ajax方式进行文件上传。



### 使用FormData，进行Ajax请求并上传文件

**html代码**

```html
<form id= "uploadForm">  
      <p >指定文件名： <input type="text" name="filename" value= ""/></p >  
      <p >上传文件： <input type="file" name="file"/></ p>  
      <input type="button" value="上传" onclick="doUpload()" />  
</form>  
```

**js代码**

```javascript
function doUpload() {  
     var formData = new FormData($( "#uploadForm" )[0]);  
     $.ajax({  
          url: 'http://localhost:8080/cfJAX_RS/rest/file/upload' ,  
          type: 'POST',  
          data: formData,  
          async: false,  
          cache: false,  
          contentType: false,  
          processData: false,  
          success: function (returndata) {  
              alert(returndata);  
          },  
          error: function (returndata) {  
              alert(returndata);  
          }  
     });  
} 
```





### 一个上传文件前后端实例

**后端代码**

```typescript
public async addProject(req: Request, res: Response): Promise<void>{
        let form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = path.join(__dirname, "../../views/img/");
        form.keepExtensions = true;
        //TODO: 判断添加是否成功，如果添加失败，则删除已经上传的图片
        form.parse(req, async function(err, fields, files){
            let projectName: string = fields.projectName;
            let projectDescription: string = fields.projectDescription;
            let publisher: string = fields.publisher;
            let imgPath: string = files.avatar.path;
  			// 其他处理逻辑
        }
}
```

**前端代码**

```html
<!DOCTYPE html>
<html lang="en">
<body>
    <script type="text/javascript" src="./jquery-3.2.1.min.js"></script>
      <form id = "uploadForm">
        <div class="field required">
          <label>项目名</label>
          <input placeholder="项目名" type="text" name="projectName">
        </div>
        <div class="field required">
          <label>项目信息简介</label>
          <input placeholder="项目信息简介" type="text" name="projectDescription">
        </div>
        <div class="field required">
          <label>发布者姓名</label>
          <input placeholder="发布者姓名" type="text" name="publisher">
        </div>
        <div class="field required">
          <label>项目logo</label>
          <input type="file" name="avatar" multiple>
        </div>
        <input type="button" value="上传" onclick="doUpload()" />  
      </form>

      <script type="text/javascript">
        function doUpload() {  
          var formData = new FormData($( "#uploadForm" )[0]);  
          $.ajax({  
                url: 'http://www.linyimin.club:8001/project/addProject' ,  
                type: 'POST',  
                data: formData,  
                async: false,  
                cache: false,  
                contentType: false,  
                processData: false,  
                success: function (returndata) {  
                    alert(returndata);  
                },  
                error: function (returndata) {  
                    alert(returndata);  
                }  
      });  
}  
    </script>
      </body>   
</html>>
  
```

