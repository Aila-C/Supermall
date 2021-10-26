<template>
  <div class="params-info" v-if="Object.keys(paramInfo).length !== 0" >
    <table v-for="(item, index) in paramInfo.rule" :key="index">
      <tr v-for="(list, indey) in item"  :key="indey">
        <td v-for="(listitem, indez) in list"  :key="indez">{{listitem}}</td>
      </tr>
    </table>
    <table class="info-param" >
           <tr v-for="(info, index) in paramInfo.info" :key="index">
             <td class="info-param-key">{{info.key}}</td>
             <td class="param-value">{{info.value}}</td>
           </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.params-info{
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.params-info table{
  width: 100%;
  border-collapse: collapse;
}
.params-info table tr{
  height: 42px;
}
.params-info table tr td{
  border-bottom: 1px solid rgba(100, 100, 100, .1);
}

.info-param{
  border-top: 1px solid rgba(0, 0, 0, .1)
}

.info-param-key{
/*  当value的数据量比较大的时候，会挤到key，所以给一个固定的宽度*/
  width: 95px
}

.param-value{
  color: #eb4868
}

.info-img{
  width: 100%
}
</style>
