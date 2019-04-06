const path = require('path')
const fs = require('fs')
const glob = require('glob')

// replace(/\\/g, '/')处理windows平台
const viewPath = path.resolve(__dirname, '../src/view').replace(/\\/g, '/')

// 所有的文件路径为/*/*/index.vue
const files = glob.sync(path.join(__dirname, '../src/view/**/index.vue'))

// 跨平台，不用shell命令 head -1
const readPageNote = filePath => {
  const content = fs.readFileSync(filePath, { encoding: 'utf8' })
  const note = content.match(/^(.+)[\n\r]/)[1].trim()
  const result = note.trim().match(/^\<!--\s*(.*)\s*--\>/)
  return result && result[1] || ''
}

let routes = files.map(file => {
  const componentPath = file.replace(viewPath, '')
  let routePath = componentPath.replace('/index.vue', '')

  routePath = routePath.replace(/route-param-(\w+)$/i, (match, $1) => {
    return `:${$1}`
  })

  return {
    filePath: componentPath.replace(/^\//, ''),
    routePath,
    pageNote: readPageNote(file)
  }
})

routes = JSON.stringify(routes, null, 2)

// for prettier
routes = routes.replace(/"(.+)":/g, match => {
  return match.replace(/"/g, '')
})

const buildConfig = path.join(process.cwd(), 'src/router/buildConfig.js')
const data = `\/\/ 该文件由webpack构建打包自动生成，请不要手动更新该文件\n
const config = ${routes};\n
export default config;
`
fs.writeFileSync(buildConfig, data)
