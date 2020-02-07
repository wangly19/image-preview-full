import Vue from 'vue'
import ImagePreview from './ZoomImage'
const components: { [propsName: string]: any } = {
  ImagePreview
}

const install = (vue: typeof Vue): void => {
  // map插件
  Object.keys(components).forEach((key) => {
    vue.component(key, components[key])
  })
}

export default {
  install,
  ...components
}
