# portrayal-system

> 开课啦大数据画像系统

## 文档备注
- [prd文档](https://note.youdao.com/ynoteshare1/index.html?id=998f6b3817b82a4d9a071a6aecae306c&type=note#/)
- [ue文档](http://ued.ikuko.com/78/web/%E7%94%BB%E5%83%8F%E5%88%86%E6%9E%90%E7%B3%BB%E7%BB%9F%E5%8E%9F%E5%9E%8B/index.html#g=1&p=%E7%BE%A4%E4%BD%93%E5%88%86%E6%9E%90)

## 前端技术栈
- vue & element-ui
- webpack(devServer本地开发)
- validate-commit-msg验证git提交规范，[Angular规范](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)

## 路由自动化构建配置
> 在webpack打包之前会执行process.cwd()/build/buildVueRoutesConfig.js文件，nodejs会根据process.cwd()/src/view/目录下包含index.vue文件的所有路径生成process.cwd()/src/router/buildConfig.js路由配置文件

- 文件路径为：process.cwd()/src/view/home/index.vue，
那么访问url路径为/home就可以匹配到组件内容了
- 文件路径为：process.cwd()/src/view/aa-bb/cc/index.vue，
那么访问url路径为/aa-bb/cc就可以匹配到组件内容了
- 文件路径为：process.cwd()/src/view/xx-detail/:id/index.vue，
那么访问url路径为/xx-detail/1, /xx-detail/2 就可以匹配到组件内容了，组件可以通过$route.params.id获取到url中的1和2
- 为了增加自动化路由配置的维护及可读性，需要你在index.vue首行增加路由页面注释<!-- 首页 -->
那么自动化路由配置文件将会增加一个pageNote字段，如下代码：
```js
// 该文件由webpack构建打包自动生成，请不要手动更新该文件
const config = [
  {
    "filePath": "home/index.vue",
    "routePath": "/home",
    "pageNote": "首页 "
  }
]
export default config
```