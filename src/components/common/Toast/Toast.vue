<template>
<div class="toast" v-show="isshow">
  <div>{{message}}</div>
</div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data(){
    return {
      message: '',
      isshow: false
    }
  },
  methods: {
    //duration传过来一个时间
    show(message, duration){
      this.isshow = true;
      this.message = message;

      setTimeout(() => {
        this.isshow = false;
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  color: #fff;
  z-index: 99;

  background-color: rgba(0,0,0,.8)
}
</style>
