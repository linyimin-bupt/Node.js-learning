
```javascript

// download-room-metrics.js

async function downloadFiles() {
  // 获取需要下载文件的ID
  const response = await $.get('/analysis/getRoomIdsOfUser')
  const roomIdsOfProject = response.roomIdsOfProject
  const projectIds = Object.keys(roomIdsOfProject)
  if (projectIds.length <= 0) {
    window.close()
    return
  }
  // 使用jszip打包
  const zip = new JSZip()
  $('#progress').css('display', 'block')
  for (let i = 0; i < projectIds.length; i++) {
    $('#detailInfo').html(`正在导出历史数据 （${i + 1}/${projectIds.length}）`)
    $('.progress-bar-aqua').css('width', `${Math.floor((i + 1) / projectIds.length * 100)}%`)
    const res = await $.get(`/analysis/downloadRoomChart?projectId=${projectIds[i]}`)
    // 将文件内容写进zip文件
    zip.file(`botChart_${roomId}.csv`, res)
    const content = await zip.generateAsync({
      type: "blob"
    })
  }
  // 使用FileSaver.js实现zip文件的下载
  saveAs(content, `${projectIds[i]}.zip`)
  await new Promise(resolve => setTimeout(resolve, 2000))
  // 下载完成自动关闭页面
  window.close()
}
```

```html
<section class="content">
  <div class="row" id="progress" style="display:block;">
    <div class="col-md-2"></div>
    <div class="col-md-8">
      <div class="progress-group">
        <p class="progress-text" id="detailInfo">正在导出历史数据...</p>
        <div class="progress sm">
          <div class="progress-bar progress-bar-aqua" style="width: 0%;"></div>
        </div>
      </div>
    </div>
    <div class="col-md-2"></div>
  </div>
</section>
<script src="https://cdn.bootcss.com/jszip/3.1.5/jszip.js"></script>
<script src="https://cdn.bootcss.com/FileSaver.js/1.3.3/FileSaver.js"></script>
<script src="/download-room-metrics.js"></script>
```