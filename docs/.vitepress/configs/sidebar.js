export default {
  "/technical/": getTechnical(),
  "/engineering/": getEngineering(),
  "/security/": getSecurity(),
  "/deploy/": getDeploy(),
};
// 获取技术方面的侧边栏
function getTechnical() {
  return [
    {
      text: "HTML / CSS",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "HTML 基础知识", link: "/technical/html/html" },
        { text: "CSS 基础知识", link: "/technical/html/css" },
      ],
    },
    {
      text: "JavaScript 基础知识",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "基础知识", link: "/technical/js/base" },
        { text: "Array 数组", link: "/technical/js/array" },
        { text: "String 字符串", link: "/technical/js/string" },
      ],
    },
    {
      text: "TypeScript 基础知识",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "基础知识", link: "/technical/ts/base" },
        { text: "内置工具", link: "/technical/ts/tool" },
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
        { text: "Vue-Router 基础知识", link: "/technical/vue/router" },
      ],
    },
    {
      text: "浏览器 / 网络",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "浏览器 基础知识", link: "/technical/browser/base" },
        { text: "HTTP & HTTPS", link: "/technical/browser/http" },
        { text: "Request 常用请求 ", link: "/technical/browser/request" },
      ],
    },
    { text: "Git 常规使用", link: "/technical/git" },
    { text: "时间日期处理", link: "/technical/time" },
    { text: "Node 基础知识", link: "/technical/node" },
    { text: "Uni-app 基础知识", link: "/technical/uniapp" },
    { text: "WebSocket", link: "/technical/websocket" },
    { text: "SSE 会话", link: "/technical/sse" },
    { text: "权限控制详解", link: "/technical/permission" },
    { text: "多类型文件预览", link: "/technical/preview" },
  ];
}
// 获取前端工程化的侧边栏
function getEngineering() {
  return [
    { text: "项目管理", link: "/engineering/project" },
    { text: "模块化 / 组件化", link: "/engineering/modules" },
    {
      text: "标准规范化",
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
      text: "自动化工具",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "脚手架", link: "/engineering/automation/cli" },
        { text: "代码检查", link: "/engineering/automation/lint" },
        {
          text: "构建工具",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "前端构建",
              link: "/engineering/automation/build/base",
            },
            {
              text: "Vite 构建",
              link: "/engineering/automation/build/vite",
            },
            {
              text: "Webpack 构建",
              link: "/engineering/automation/build/webpack",
            },
          ],
        },
      ],
    },
    {
      text: "性能优化",
      link: "/engineering/performance",
    },
  ];
}
// 获取网络安全的侧边栏
function getSecurity() {
  return [
    { text: "安全基础", link: "/security/base" },
    {
      text: "网络安全",
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: "XSS（跨站脚本攻击）",
          link: "/security/browser/xss",
        },
        {
          text: "CSRF（跨站请求伪造）",
          link: "/security/browser/csrf",
        },
        { text: "SQL注入攻击", link: "/security/browser/sql" },
        { text: "HTTP挟持", link: "/security/browser/http" },
        { text: "DNS挟持", link: "/security/browser/dns" },
      ],
    },
  ];
}
// 获取前端部署的侧边栏
function getDeploy() {
  return [
    { text: "nginx 反向代理", link: "/deploy/nginx" },
    { text: "Jenkins + Rancher", link: "/deploy/jenkins" },
    { text: "Docker镜像", link: "/deploy/docker" },
    { text: "Git的 CI+CD", link: "/deploy/git" },
  ];
}
