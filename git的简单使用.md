## 删除远程仓库分支

1.  查看本地所有分支

   ```shell
   git branch
   ```

2. 查看所有分支(包含远程分支)

   ```shell
   git brach -a
   ```

3. 选择分支

   ```shell
   git checkout branch-name
   ```

4. 删除本地分支

   ```shell
   git branch -D branch-name
   ```

5. 删除远程分支(远程分支的本地索引)

   ```shell
   git branch -r -d origin/branch-name
   ```

6. 删除远程分支内容

   ```shell
   git push origin :branch-name
   ```

   **注: 冒号前面的空格不能少，相当于把一个空分支push到server上，等于删除该分支**

## git版本回退

1. 查看历史版本

   ```shell
   git log
   ```

2. 设置head指针的指向

   ```shell
   git reset --hard 历史版本的id
   ```

3. 将修改推送到远程仓库

   ```shell
   git push -f -u origin master
   ```



## 创建新的分支

```shell
git checkout -b branch-name
```



