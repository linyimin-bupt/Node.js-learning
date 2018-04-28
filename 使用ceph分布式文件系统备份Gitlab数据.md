# 使用ceph分布式文件系统备份Gitlab数据

客户端有两种方式可以挂载ceph文件系统(内核挂载和fuse挂载).内核挂载的性能比fuse(用户空间文件系统)挂载性能要好,但是fuse挂载更易于文件的open,close,write等操作,所以选择fuse挂载.**挂载成功之后,客户端可以像操作本地文件一样,对挂载目录进行操作,增加,删除,修改的文件都会实时备份到ceph文件系统中.实现文件的多重备份.**

------



## 将ceph分布式文件系统挂载到Gitlab所在的服务器

### 在客户端(Gitlab所在的服务器)安装ceph-fuse

1. 编辑ceph源的配置文件vim  /etc/yum.repo.d/ceph.repo

   ```shell
   [ceph]
   name=Ceph noarch packages
   baseurl=http://mirrors.163.com/ceph/rpm-hammer/el7/x86_64/
   enabled=1
   gpgcheck=1
   type=rpm-md
   gpgkey=http://mirrors.163.com/ceph/keys/release.asc
   ```

   ​

2. 安装ceph-fuse

   ```shell
   sudo yum clean all && yum makecache
   sudo yum install -y ceph-fuse
   ```

   **安装成功的结果:**

   ```
   Installed:
     ceph-fuse.x86_64 1:0.94.10-0.el7                                                                                                           

   Dependency Installed:
     at.x86_64 0:3.1.13-22.el7_4.2                                  bc.x86_64 0:1.06.95-13.el7                                                  
     boost-program-options.x86_64 0:1.53.0-27.el7                   boost-system.x86_64 0:1.53.0-27.el7                                         
     boost-thread.x86_64 0:1.53.0-27.el7                            ceph.x86_64 1:0.94.10-0.el7                                                 
     ceph-common.x86_64 1:0.94.10-0.el7                             cryptsetup.x86_64 0:1.7.4-3.el7_4.1                                         
     cups-client.x86_64 1:1.6.3-29.el7                              cups-libs.x86_64 1:1.6.3-29.el7                                             
     ed.x86_64 0:1.9-4.el7                                          fuse-libs.x86_64 0:2.9.2-8.el7                                              
     gdisk.x86_64 0:0.8.6-5.el7                                     gperftools-libs.x86_64 0:2.4-8.el7                                          
     hdparm.x86_64 0:9.43-5.el7                                     leveldb.x86_64 0:1.12.0-11.el7                                              
     libbabeltrace.x86_64 0:1.2.4-3.el7                             libcephfs1.x86_64 1:0.94.10-0.el7                                           
     libicu.x86_64 0:50.1.2-15.el7                                  librados2.x86_64 1:0.94.10-0.el7                                            
     librbd1.x86_64 1:0.94.10-0.el7                                 libunwind.x86_64 2:1.2-2.el7                                                
     lttng-ust.x86_64 0:2.4.1-4.el7                                 m4.x86_64 0:1.4.16-10.el7                                                   
     mailx.x86_64 0:12.5-16.el7                                     patch.x86_64 0:2.7.1-8.el7                                                  
     psmisc.x86_64 0:22.20-15.el7                                   python-babel.noarch 0:0.9.6-8.el7                                           
     python-backports.x86_64 0:1.0-8.el7                            python-backports-ssl_match_hostname.noarch 0:3.4.0.2-4.el7                  
     python-cephfs.x86_64 1:0.94.10-0.el7                           python-chardet.noarch 0:2.2.1-1.el7_1                                       
     python-flask.noarch 1:0.10.1-4.el7                             python-itsdangerous.noarch 0:0.23-2.el7                                     
     python-jinja2.noarch 0:2.7.2-2.el7                             python-markupsafe.x86_64 0:0.11-10.el7                                      
     python-rados.x86_64 1:0.94.10-0.el7                            python-rbd.x86_64 1:0.94.10-0.el7                                           
     python-requests.noarch 0:2.6.0-1.el7_1                         python-six.noarch 0:1.9.0-2.el7                                             
     python-urllib3.noarch 0:1.10.2-3.el7                           python-werkzeug.noarch 0:0.9.1-2.el7                                        
     redhat-lsb-core.x86_64 0:4.1-27.el7.centos.1                   redhat-lsb-submod-security.x86_64 0:4.1-27.el7.centos.1                     
     spax.x86_64 0:1.5.2-13.el7                                     time.x86_64 0:1.7-45.el7                                                    
     userspace-rcu.x86_64 0:0.7.16-1.el7                           

   Dependency Updated:
     cryptsetup-libs.x86_64 0:1.7.4-3.el7_4.1                                                                                                   

   Complete!
   ```

### 将ceph分布式文件系统的配置拷到客户端的/etc/ceph/目录下

1. 创建新的keyring

   ```shell
   sudo ceph auth get-or-create client.cephfs mon 'allow r' osd 'allow rwx pool=cephfs' -o /etc/ceph/client.cephfs.keyring
   ```

2. 从keyring中提取密钥

   ```shell
   sudo ceph-authtool -p -n client.cephfs /etc/ceph/client.cephfs.keyring > /etc/ceph/client.cephfs
   ```

3. 拷贝到客户端,并更改文件的权限

```shell
scp /etc/ceph/ceph.conf root@客户端IP:/etc/ceph
scp /etc/ceph/client.cephfs root@客户端IP:/etc/ceph
scp /etc/ceph/client.cephfs.keyring root@客户端IP:/etc/ceph
scp /etc/ceph/ceph.client.admin.keyring root@客户端IP:/etc/ceph

## 换到Gitlab服务器
sudo chown -R /etc/ceph 
sudo chmod-R 644 -R /etc/ceph
```

### 使用ceph-fuse命令挂载ceph分布式文件系统

1. 创建挂载目录

   ```shell
   sudo mkdir /mnt/cephfs/
   ```

2. 挂载

   ```shell
   sudo ceph-fuse -m 客户端IP:6789  /mnt/cephfs
   ```

   挂载成功输出

   ```shell
   2018-04-15 16:34:02.110819 7f3ef8cc3780 -1 init, newargv = 0x46d7a70 newargc=11
   ceph-fuse[31571]: starting ceph client
   ceph-fuse[31571]: starting fuse
   ```

3. 使用df -h命令查看挂载情况

   ```shell
   df -h
   ```

   输出结果

   ```shell
   Filesystem               Size  Used Avail Use% Mounted on
   devtmpfs                  16G     0   16G   0% /dev
   tmpfs                     16G     0   16G   0% /dev/shm
   tmpfs                     16G  1.6G   15G  10% /run
   tmpfs                     16G     0   16G   0% /sys/fs/cgroup
   /dev/mapper/centos-root   50G   11G   40G  21% /
   /dev/mapper/centos-home   51G   33M   51G   1% /home
   /dev/sda1                497M  171M  327M  35% /boot
   tmpfs                    3.2G     0  3.2G   0% /run/user/0
   ceph-fuse                1.1T   70G  973G   7% /mnt/cephfs
   ```

至此,ceph分布式文件系统挂载成功,下面接着完成Gitlab的安装,并将Gitlab数据保存在挂载的目录空间里.



4. 在挂载的目录里创建一个目录test,然后到ceph分布式文件系统集群中,可以看到该文件

   ```shell
   mkdir test
   ```

   ceph分布式文件系统中的目录

   ```shell
   drwxr-xr-x 1 root root          0  4月 15 16:35 ./
   drwxr-xr-x 3 root root       4096  4月 12 18:39 ../
   drwxrwxrwx 1 root root          0  4月 15 16:35 test/
   ```

   ​

## 安装Gitlab

Gitlab可以直接使用Docker运行,只需要指定,文件的存储目录即可.

1. 拉取Gitlab镜像

   ```shell
   sudo docker pull gitlab/gitlab-ce
   ```

   **运行结果:**

   ```shell
   22dc81ace0ea: Pull complete 
   1a8b3c87dba3: Pull complete 
   91390a1c435a: Pull complete 
   07844b14977e: Pull complete 
   b78396653dae: Pull complete 
   b7b27b5a862c: Pull complete 
   b36426107b6c: Pull complete 
   3368a63e7ee5: Pull complete 
   9af48542e108: Pull complete 
   89277d2aced7: Pull complete 
   023bfed27041: Pull complete 
   Digest: sha256:194d10fcb9421517ce739fb837d8b015bb9154969466e62b0ab057264f063f58
   ```

   ​

2. 启动gitlab

   ```shell
   sudo docker run --detach \
       --publish 8080:80 --publish 30000:22 \
       --name gitlab \
       --restart always \
       --volume /mnt/cephfs/gitlab/config:/etc/gitlab \
       --volume /mnt/cephfs/gitlab/logs:/var/log/gitlab \
       --volume /mnt/cephfs/gitlab/data:/var/opt/gitlab \
       gitlab/gitlab-ce:latest
   ```

gitlab的首次启动需要几分钟的时间,通过`docker ps`命令查看

```shell
12 minutes ago      Up 7 seconds (health: starting)   22/tcp, 80/tcp, 0.0.0.0:8080->8080/tcp, 443/tcp, 0.0.0.0:30000->30000/tcp   gitlab
```

staring表示正在启动

```
14 minutes ago      Up 14 minutes (healthy)   443/tcp, 0.0.0.0:30000->22/tcp, 0.0.0.0:8080->80/tcp   gitlab
```

healthy表示启动成功

浏览器访问:http://10.108.211.22:8080登陆即可



这样就可以实现使用ceph分布式文件系统备份gitlab的数据啦.