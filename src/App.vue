<template>
  <div id="app">
    <div class="img-wrapper">
      <div>
        <img :src="defaultImagePath" alt="" v-if="typeof defaultImagePath === 'string'">
        <ul v-else class="img-list">
          <li v-for="(item, index) in defaultImagePath" :key="index">
            <img :src="item" :alt="item">
          </li>
        </ul>
      </div>
      <button class="chack-image" @click="lookImage">点击查看大图</button>
    </div>
    <ImagePreview :path="defaultImagePath" :isVisible.sync="visible"></ImagePreview>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  private visible: boolean = false
  private defaultImagePath: string | Array<string> = ['http://img5.imgtn.bdimg.com/it/u=4214941395,707510718&fm=26&gp=0.jpg', 'http://img5.imgtn.bdimg.com/it/u=4214941395,707510718&fm=26&gp=0.jpg']
  // private defaultImagePath: string | Array<string> = 'http://img5.imgtn.bdimg.com/it/u=4214941395,707510718&fm=26&gp=0.jpg'

  private lookImage (): void {
    this.visible = true
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .img-wrapper {
    .chack-image {
      border: none;
      padding: 10px;
      outline: none;
      background: #2bc17b;
      color: white;
      font-weight: normal;
      cursor: pointer;
      &:hover{
        opacity: .8;
      }
    }
    .img-list {
      img{
        width: 300px;
        height: 300px;
      }
    }
  }
}
</style>
