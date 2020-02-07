<template>
  <div class="zoom-image-container" v-if="isVisible" :style="{'z-index': zIndex}">
    <i class="iconfont icon-times default-btn close-zoom" @click="$emit('update:isVisible', false)"/>
    <!-- <Icon type="ios-arrow-back" class="default-btn leave-last"/> -->
    <!-- <Icon v-show="isNextShow" type="ios-arrow-forward" class="default-btn leave-next" @click.stop="toNext"/> -->
    <div class="img-wrapper">
      <div class="error-view" v-show="isError">
        <i class="iconfont tip-text" :class="isLoading ? 'icon-loading loading' : 'icon-group43'"></i>
        <h4>{{!isLoading && isError ? '加载失败' : '正在加载中...'}}</h4>
      </div>
      <img v-show="!isError" :src="setImagePath" alt="图片" id="zoomImage"
      @load="imgLoad('success')" @error="imgLoad('error')">
    </div>
    <ul class="tool-wrapper">
      <li class="tool-item trigger-btn" v-show="isNextShow">
        <i class="iconfont icon-angle-left tool-item__icon" @click.stop="toNext(0)"/>
        <span class="tool-item__text">{{`${currentPathIndex + 1} / ${setPathLenText}`}}</span>
        <i class="iconfont icon-angle-right tool-item__icon" @click.stop="toNext(1)"/>
      </li>
      <li v-for="(item, index) in toolIcon" :key="index" class="tool-item">
        <i class="iconfont tool-item__icon" :class="item" @click.stop="bindBlowClick(index)"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class MaucashModel extends Vue {
  // 传入图片数据
  @Prop({ required: true }) path!: string | Array<string>
  @Prop({ default: false, required: true }) isVisible!: boolean
  @Prop({ default: 2000, required: false }) zIndex!: number

  private toolIcon: Array<string> =
  ['icon-xuanzhuan', 'icon-xuanzhuan1', 'icon-download', 'icon-compress-alt', 'icon-expand-alt', 'icon-sync-alt']
  private isLoading: boolean = true
  private isError: boolean = true
  private currentPathIndex: number = 0

  // 设置当前显示图片属性
  get setImagePath () {
    return typeof this.path === 'string' ? this.path : this.path[this.currentPathIndex]
  }

  // 设置next按钮是否显示
  get isNextShow () {
    return typeof this.path !== 'string' && this.path.length > 1
  }

  // 获取当前条数
  get setPathLenText () {
    return typeof this.path === 'string' ? '1' : this.path.length
  }

  // 绑定工具栏相应方法
  private bindBlowClick (id: number): void{
    let imgDom: any = document.getElementById('zoomImage')
    let DomArr: Array<string> = imgDom.style.transform.split(' ')
    let rotateSize: number = 0
    let scaleSize: number = 1
    if (DomArr.length >= 2) {
      scaleSize = Number(DomArr[0].replace(/[^\d|^.]/g, ''))
      rotateSize = Number(DomArr[1].replace(/[^\d|^-]/g, ''))
    }
    switch (id) {
      case 0:
        // 顺时针旋转
        imgDom.style['transform'] = `scale(${scaleSize}) rotate(${(rotateSize === 360 ? 0 : rotateSize) + 90}deg)`
        break
      case 1:
        // 逆时针旋转
        imgDom.style['transform'] = `scale(${scaleSize}) rotate(${(rotateSize === 360 ? 0 : rotateSize) - 90}deg)`
        break
      case 2:
        // 保存/下载图片
        const aDom: HTMLAnchorElement = document.createElement('a')
        const aDomEvent: MouseEvent = new MouseEvent('click')
        aDom.download = 'download'
        // aDom.href = this.path[this.currentPathIndex]
        aDom.href = imgDom.src
        aDom.dispatchEvent(aDomEvent)
        break
      case 3:
        // 缩小
        imgDom.style['transform'] = `scale(${scaleSize - 0.1}) rotate(${rotateSize})`
        break
      case 4:
        // 放大
        imgDom.style['transform'] = `scale(${scaleSize + 0.1}) rotate(${rotateSize}deg)`
        break
      case 5:
        // 放大
        imgDom.style['transform'] = `scale(1) rotate(0deg)`
        break
    }
  }

  // 侦听图片是否加载完成
  private imgLoad (state: string): void {
    if (state === 'success') {
      // success
      this.isLoading = false
      this.isError = false
    } else {
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  }

  // 下一张
  private toNext (trigger: number): void {
    if (trigger) {
      const pathLength: number = this.path.length
      this.currentPathIndex === pathLength - 1 ? this.currentPathIndex = 0 : this.currentPathIndex++
    } else {
      const pathLength: number = this.path.length
      this.currentPathIndex === 0 ? this.currentPathIndex = pathLength - 1 : this.currentPathIndex--
    }
  }
}
</script>

<style lang="scss">
@import './index.css';
@import './reset.css';
// 字体
$text: #F5F9FC;
// 图片背景
$iconBg: #222222;
$iconHover: #0071ff;
// 颜色
  .zoom-image-container{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    height: 100vh;
    width: 100vw;
    .default-btn{
      border-radius: 50%;
      padding: 15px;
      font-weight: bold;
      color: $text;
      background: $iconBg;
      cursor: pointer;
      &:hover{
        color: $iconHover;
      }
    }
    .close-zoom{
      position: fixed;
      right: 50px;
      top: 50px;
    }
    .img-wrapper {
      display: flex;
      align-items: center;
      .error-view{
        width: 400px;
        height: 400px;
        background: #FFF;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .tip-text{
          font-size: 25px;
          font-weight: bold;
          padding: 5px 0 5px 0;
        }
        .loading{
          animation: custom-loading-rotate 1s linear infinite;
        }
        @keyframes custom-loading-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
    }
    .tool-wrapper{
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      .trigger-btn{
        .icon-ban {
          cursor: pointer;
        }
        .tool-item__text{
          padding: 0 10px 0 10px;
          font-size: 20px;
          color: $text;
        }
      }
      .tool-item{
        background: $iconBg;
        padding: 10px;
        &__icon{
          color: $text;
          cursor: pointer;
          font-size: 20px;
          &:hover{
            color: $iconHover;
          }
        }
      }
    }
  }
</style>
