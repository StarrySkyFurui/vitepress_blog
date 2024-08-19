export default {
  "/technical/": getTechnical(),
  "/engineering/": getEngineering(),
  "/security/": getSecurity(),
  "/deploy/": getDeploy(),
  "/interview/": getInterview(),
};
// 获取技术系列的侧边栏
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
      // text: "TypeScript 基础知识",
      // collapsible: true,
      // collapsed: true,
      // items: [
      //   { text: "基础知识", link: "/technical/ts/base" },
      //   { text: "内置工具", link: "/technical/ts/tool" },
      // ],
      text: "TypeScript 基础知识",
      link: "/technical/ts/base",
    },
    {
      text: "Vue 生态合集",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "Vue 基础知识", link: "/technical/vue/vue" },
        { text: "VueX 基础知识", link: "/technical/vue/vuex" },
        { text: "Pinia 基础知识", link: "/technical/vue/pinia" },
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
    { text: "Flex 布局详解", link: "/technical/flex" },
    { text: "Git 常规使用", link: "/technical/git" },
    { text: "微前端 qiankun", link: "/technical/micro" },
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
// 获取网站安全的侧边栏
function getSecurity() {
  return [
    { text: "安全基础", link: "/security/base" },
    {
      text: "网站攻击",
      link: "/security/attack",
    },
  ];
}
// 获取部署系列的侧边栏
function getDeploy() {
  return [
    { text: "nginx 反向代理", link: "/deploy/nginx" },
    // { text: "Jenkins + Rancher", link: "/deploy/jenkins" },
    // { text: "Docker镜像", link: "/deploy/docker" },
    // { text: "Git的 CI+CD", link: "/deploy/git" },
  ];
}

// 获取前端面试的侧边栏
function getInterview() {
  return [
    { text: "HTML 相关", link: "/interview/html" },
    { text: "CSS 相关", link: "/interview/css" },
    { text: "JavaScript 相关", link: "/interview/js" },
    { text: "TypeScript 相关", link: "/interview/ts" },
    { text: "Vue 全家桶相关", link: "/interview/vue" },
    { text: "Webpack 相关", link: "/interview/webpack" },
    { text: "Vite 相关", link: "/interview/vite" },
    { text: "浏览器相关", link: "/interview/browser" },
    { text: "Node 相关", link: "/interview/node" },
    { text: "性能优化相关", link: "/interview/performance" },
    { text: "网络安全相关", link: "/interview/security" },
    { text: "Git 相关", link: "/interview/git" },
    { text: "部署相关", link: "/interview/deploy" },
    { text: "场景题", link: "/interview/scene" },
    { text: "其他", link: "/interview/other" },
  ];
}
