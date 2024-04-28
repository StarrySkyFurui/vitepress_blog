export default {
  "/technical/": getTechnical(),
  "/engineering/": getEngineering(),
};
// 获取技术方面的侧边栏
function getTechnical() {
  return [
    {
      text: "HTML / CSS",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "HTML 基础知识", link: "/technical/html" },
        { text: "CSS 基础知识", link: "/technical/css" },
      ],
    },
    {
      text: "JavaScript 基础知识",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "数据类型", link: "/technical/js/dataType" },
        { text: "Array 常用方法合集", link: "/technical/js/array" },
        { text: "String 常用方法合集", link: "/technical/js/string" },
        { text: "ES6 特性", link: "/technical/js/es6" },
        { text: "ES10 特性", link: "/technical/js/es10" },
      ],
    },
    {
      text: "TypeScript 基础知识",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "基础知识", link: "/technical/ts/basic" },
        { text: "内置工具", link: "/technical/ts/tool" },
      ],
    },
    {
      text: "Webpack / Vite 打包",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "Webpack 基础知识", link: "/technical/webpack" },
        { text: "Vite 基础知识", link: "/technical/vite" },
      ],
    },
    {
      text: "Vue 生态合集",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "Vue 基础知识", link: "/technical/vue/vue" },
        { text: "VueX 基础知识", link: "/technical/vue/vuex" },
        { text: "Axios 基础知识", link: "/technical/vue/axios" },
        { text: "Vue-Cli 脚手架", link: "/technical/vue/vuecli" },
        { text: "Vue-Router 基础知识", link: "/technical/vue/router" },
      ],
    },
    {
      text: "浏览器 / 网络",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "浏览器 基础知识", link: "/technical/browser/basic" },
        { text: "HTTP & HTTPS", link: "/technical/browser/http" },
        { text: "Request 常用请求 ", link: "/technical/browser/request" },
        {
          text: "网络安全 基础知识",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "XSS（跨站脚本攻击）",
              link: "/technical/browser/security/xss",
            },
            {
              text: "CSRF（跨站请求伪造）",
              link: "/technical/browser/security/csrf",
            },
            { text: "SQL注入攻击", link: "/technical/browser/security/sql" },
            { text: "DNS挟持", link: "/technical/browser/security/dns" },
            { text: "HTTP挟持", link: "/technical/browser/security/http" },
          ],
        },
      ],
    },
    {
      text: "Git 常规使用",
      link: "/technical/git",
    },
    { text: "Node 基础知识", link: "/technical/node" },
    { text: "WebSocket", link: "/technical/websocket" },
    { text: "SSE 会话", link: "/technical/sse" },
    { text: "权限控制详解", link: "/technical/permission" },
    { text: "多类型文件预览", link: "/technical/preview" },
  ];
}
// 获取前端工程化的侧边栏
function getEngineering() {
  return [
    {
      text: "模块化",
      link: "/engineering/modules",
    },
    {
      text: "规范化",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "命名规范", link: "/engineering/standard/named" },
        { text: "编码规范", link: "/engineering/standard/code" },
        { text: "样式规范", link: "/engineering/standard/style" },
        { text: "Git 提交规范", link: "/engineering/standard/git" },
      ],
    },
    {
      text: "性能优化",
      link: "/engineering/performance",
    },
    {
      text: "前端部署",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "Jenkins + Rancher", link: "/engineering/deploy/jenkins" },
        { text: "Docker镜像", link: "/engineering/deploy/docker" },
        { text: "nginx 反向代理", link: "/engineering/deploy/nginx" },
        { text: "Git的 CI+CD", link: "/engineering/deploy/git" },
      ],
    },
  ];
}
