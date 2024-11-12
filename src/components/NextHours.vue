<script>
import { store } from '../data/store';
import Card from './Card.vue';

export default {
  data(){
    return{
      store
    }
  },
  components:{
    Card
  }
}
</script>

<template>
  <div class="wrap mb-5" v-if="Object.keys(store.todaysWeather).length > 0">
    <h2 class="mb-2">Next Hours</h2>
    <div class="d-flex flex-wrap justify-content-center justify-content-md-between" >
      <Card   v-for="(item, index) in this.store.nextHours.slice(0, 4)" :key="index"
      :time="item.dt_txt"
      :temperature="item.main.temp "
      :imgSrc="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
      />
    </div>
  </div>
</template>

<style>

</style>