export default {
  '/technical/': getTechnical(),
  '/security/': getSecurity(),
  '/deploy/': getDeploy(),
}
// 获取技术方面的侧边栏
function getTechnical() {
  return [
    {
      text: '技术方面',
      items: [
        { text: 'Vue', link: '/technical/vue' },
        { text: 'Vue-Router', link: '/technical/router' },
        { text: 'VueX', link: '/technical/vuex' },
        { text: 'Uniapp', link: '/technical/uniapp' },
        { text: 'H5', link: '/technical/h5' },
        { text: 'CSS', link: '/technical/css' },
        { text: 'Js', link: '/technical/js' },
        { text: 'Ts', link: '/technical/ts' },
        { text: 'Vite', link: '/technical/vite' },
        { text: 'Webpack', link: '/technical/webpack' },
        { text: 'Node', link: '/technical/node' },
        { text: 'Http && Https', link: '/technical/request' },
        { text: 'WebSocket', link: '/technical/websocket' },
        { text: 'SSE', link: '/technical/sse' },
        { text: 'Git命令', link: '/technical/git' },
        { text: '权限控制', link: '/technical/permission' },
        { text: '多类型文件预览', link: '/technical/preview' },
      ],
    },
  ]
}
// 获取网络安全的侧边栏
function getSecurity() {
  return [
    {
      text: '网络安全',
      items: [
        { text: 'XSS（跨站脚本攻击）', link: '/security/xss' },
        { text: 'CSRF（跨站请求伪造）', link: '/security/csrf' },
        { text: 'SQL注入攻击', link: '/security/sql' },
        { text: 'DNS挟持', link: '/security/dns' },
        { text: 'HTTP挟持', link: '/security/http' },
      ],
    },
  ]
}
// 获取前端部署的侧边栏
function getDeploy() {
  return [
    {
      text: '前端部署',
      items: [
        { text: 'Jenkins + Rancher', link: '/deploy/jenkins' },
        { text: 'Docker镜像', link: '/deploy/docker' },
        { text: 'nginx 反向代理', link: '/deploy/nginx' },
        { text: 'Git的 CI+CD', link: '/deploy/git' },
      ],
    },
  ]
}
