## PDF 文件预览
- `iframe` 标签
```vue
<template>
  <div>
    <iframe :src="pdfUrl" width="100%" height="500"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pdfUrl: 'path/to/your/pdf/file.pdf',
    };
  },
};
</script>
```

- `embed` 标签 【用法同 `iframe` 标签】

- `pdf.js`
  
首先需要安装库 
```bash
npm install pdfjs-dist
```
然后在需要预览的组件中引入
```js
import { getDocument } from 'pdfjs-dist';

export default {
    data() {
        return {
            pdfLoading: true,
            pdfDoc: null,
            pageNum: 1,
            scale: 1,
        };
    },
    async mounted() {
        const url = 'path/to/your/pdf/file.pdf';
        this.pdfDoc = await getDocument(url).promise;
        this.pdfLoading = false;
    },
    methods: {
        renderPage(pageNum) {
            this.pageNum = pageNum;
            this.$refs.canvas.getContext('2d').clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
            page.render({
            canvasContext: this.$refs.canvas.getContext('2d'),
            viewport: page.getViewport({ scale: this.scale }),
            });
        },
    },
};
```

## word 文档预览
- 使用 `docx-preview` 【不适用于 doc 格式的文件，且目前已不维护了】

首先需要安装库 
```bash
npm install docx-preview
```
然后在需要预览的组件中引入
```vue
<template>
    <docx-preview :file-url="wordUrl" />
</template>

<script>
import DocxPreview from 'docx-preview';

export default {
    components: {
        DocxPreview,
    },
    data() {
        return {
            wordUrl: 'path/to/your/document.docx',
        };
    },
};
</script>
```

## Excel 表格预览
- `vue-office`
首先需要安装库 
```bash
npm install vue-office
```
然后在需要预览的组件中引入
```vue
<template>
    <vue-office :file-url="excelUrl" type="xlsx" />
</template>

<script>
import VueOffice from 'vue-office';

export default {
    components: {
        VueOffice,
    },
    data() {
        return {
            excelUrl: 'path/to/your/excel.xlsx',
        };
    },
};
</script>
```
- `xlsx-style 或 sheetjs`
首先需要安装库 
```bash
npm install xlsx-style
```
然后在需要预览的组件中引入
```js
import XLSX from 'xlsx-style';

export default {
    data() {
        return {
            excelData: [],
        };
    },
    async mounted() {
        const file = await fetch('path/to/your/excel.xlsx').then(res => res.blob());
        const workbook = XLSX.read(file, { type: 'binary' });
        const sheet_name_list = workbook.SheetNames;
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        this.excelData = excelData;
    },
};
```