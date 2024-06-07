import { defineConfig } from "vitepress";
import {
  chineseSearchOptimize,
  pagefindPlugin,
} from "vitepress-plugin-pagefind";
import nav from "./configs/nav";
import sidebar from "./configs/sidebar";

export default defineConfig({
  base: "/",
  lang: "zh-CN",
  title: "指尖微凉的博客网站",
  description: "博客",
  // cleanUrls: true,
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/images/favicon.ico" }],
  ],
  // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
  lastUpdated: true, // string | boolean
  // 主题配置
  themeConfig: {
    // 导航上的logo
    logo: "/images/favicon.png",
    // 隐藏logo右边的标题
    // siteTitle: false,
    nav: nav,
    sidebar: sidebar,
    // 站点页脚配置
    footer: {
      copyright: "Copyright © 2024-present FuRui",
    },
    // 社交和项目链接地址配置
    // socialLinks: [
    //   {
    //     icon: 'github',
    //     link: 'https://github.com/StarrySkyFurui/vitepress_blog',
    //   },
    // ],
  },
  vite: {
    plugins: [
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: "搜索",
        placeholder: "搜索文档",
        emptyText: "暂无数据！",
        heading: "共 {{searchResult}} 条结果",
      }),
    ],
  },
});
