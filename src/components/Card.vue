<script>
import { store } from '../data/store';
export default {
  data(){
    return{
      store
    }
  },
  props:{
    time: String,
    temperature: Number,
    imgSrc: String
  },
  computed: {
    formattedTime() {
      const date = new Date(this.time);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true
      });
    }
  }
}
</script>

<template>
  <div class="d-flex flex-column align-content-center p-4 customCard m-2" style="width: 15rem;" >
    <p class="text-center fs-4"> {{ formattedTime }} </p>
    <img :src="imgSrc" class="" alt="...">
    <p class="text-center fs-5"> {{ temperature}} °C</p>
  </div>
</template>

<style>
.customCard{
  background-color: rgba(0,0,0,.2);
  border-radius: 15px;
}
</style>