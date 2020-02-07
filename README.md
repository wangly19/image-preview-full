# image-preview-full组件

## 使用方式
### 1.安装
```shell
npm install image-preview-full --save
```
### 2.在vue项目中注册
```js
import ImagePreview from 'image-preview-full'
import 'image-preview-full/lib/image-preview-full.css'
Vue.use(ImagePreview)
```
### 3.组件中使用
```html
 <ImagePreview :path="defaultImagePath" :isVisible.sync="visible"></ImagePreview>
```

```js
export default {
  data: () => ({
    // 数组方式
    defaultImagePath: ['url1', 'url2'],
    // 单个图片
    // defaultImagePath: 'url',
    // 是否显示 true为是，false为否
    visible: false
  })
}
```
## 当前的props
| 参数名称 | 参数类型 | 是否必传 | 示例 |
| :-----:| :---- | :----: | :---- |
| path | 字符数组，字符串 | 是 | ['url1', 'url2'], 'url' |
| isVisible | 布尔值(真假) | 是 | true / false |
| zIndex | Integer/number | 否 | 2000 |

## 更新日志

- 2/7: 修复切换箭头的异常BUG
- 2/7: 文档书写错误