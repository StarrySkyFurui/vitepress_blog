整体使用 vue + day.js 实现
首先，需要安装 day.js
```bash
npm install dayjs --save
```

## 引入 day.js
```js
import dayjs from 'dayjs'
```

## 获取当前时间
```js
dayjs().format('YYYY-MM-DD HH:mm:ss')
```

## 获取当前时间戳
```js
dayjs().valueOf()
```

## 获取当前时间戳（秒）
```js
dayjs().unix()
```

## 年月日格式
```js
dayjs().format('YYYY-MM-DD')
```

## 时分秒格式
```js
dayjs().format('HH:mm:ss')
```

## 获取当前年份
```js
dayjs().year()
```

## 获取当前月份
```js
dayjs().month() + 1
```

## 获取当前日期
```js
dayjs().date()
```

## 获取当前小时
```js
dayjs().hour()
```

## 获取当前分钟
```js
dayjs().minute()
```

## 获取当前秒数
```js
dayjs().second()
```

## 获取当前毫秒数
```js
dayjs().millisecond()
```

## 获取当前星期几
```js
switch (dayjs().day()) {
    case 1:
        return '星期一'
    case 2:
        return '星期二'
    case 3:
        return '星期三'
    case 4:
        return '星期四'
    case 5:
        return '星期五'
    case 6:
        return '星期六'
    case 0:
        return '星期日'
    default:
        return ''   
}
```

## 计算两个日期间之差
```js
dayjs('2022-01-01').diff(dayjs('2022-01-02'), 'day')
```

## 计算是否超过某个具体的日期
```js
dayjs('2022-01-01').isAfter(dayjs('2022-01-02'))
```

## 计算是否小于某个具体的日期
```js
dayjs('2022-01-01').isBefore(dayjs('2022-01-02'))
```

## 计算是否等于某个具体的日期
```js
    dayjs('2022-01-01').isSame(dayjs('2022-01-02'))
```
