export default [
  {
    text: "技术方面",
    items: [
      { text: "HTML / CSS 基础知识", link: "/technical/html/html" },
      { text: "JavaScript 基础知识", link: "/technical/js/base" },
      { text: "TypeScript 基础知识", link: "/technical/ts/base" },
      // { text: "Webpack / Vite 构建", link: "/technical/build/base" },
      { text: "Vue 生态合集", link: "/technical/vue/vue" },
      // { text: '移动端 基础知识', link: '/technical/mobile' },
      // { text: 'Node 基础知识', link: '/technical/node' },
      { text: "浏览器 / 网络", link: "/technical/browser/base" },
      { text: "Git 常规使用", link: "/technical/git" },
    ],
  },
  {
    text: "前端工程化",
    items: [
      { text: "项目管理", link: "/engineering/project" },
      { text: "模块化 / 组件化", link: "/engineering/modules" },
      { text: "标准规范化", link: "/engineering/standard/named" },
      { text: "自动化工具", link: "/engineering/automation/cli" },
      { text: "性能优化", link: "/engineering/performance" },
    ],
  },
  {
    text: "网络安全",
    items: [
      { text: "安全基础", link: "/security/base" },
      { text: "安全配置", link: "/security/config" },
      { text: "安全运输", link: "/security/transport" },
      {
        text: "网络安全",
        link: "/security/browser/xss",
      },
    ],
  },
  {
    text: "前端部署",
    items: [
      { text: "Nginx 反向代理", link: "/deploy/nginx" },
      { text: "Jenkins + Rancher", link: "/deploy/jenkins" },
      {
        text: "Docker镜像",
        link: "/deploy/docker",
      },
      { text: "Git的 CI+CD", link: "/deploy/git" },
    ],
  },

  {
    text: "前端面试",
    link: "/interview/",
  },
  {
    text: "其它",
    link: "/other/",
  },
];
