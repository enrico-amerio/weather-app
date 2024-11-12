<script>
import { store } from '../data/store';
import CurrentWeather from './CurrentWeather.vue';
import NextDays from './NextDays.vue';
import NextHours from './NextHours.vue';

export default {
  data(){
      return{
        store,
      };
    },
    components:{
      CurrentWeather,
      NextHours,
      NextDays
    },
}
</script>

<template>
  <div class="container">
    <p v-if="this.store.errorText.length > 1">{{this.store.errorText}}</p>
    <CurrentWeather/>
    <NextHours/>
    <NextDays/>
  </div>
</template>

<style>

</style>