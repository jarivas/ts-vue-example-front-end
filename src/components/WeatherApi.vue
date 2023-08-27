<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWeatherStore, type State } from '@/stores/weather'

const store = useWeatherStore()
const cityName = ref('')
let data = ref<State>()

watch(cityName, (value)=>{
  if(value.length) {
    store.hydrate('localhost', value).then(state => data.value = state)
  }
})

</script>
<template>
  <div>
    <h3>Please select a city to check the weather</h3>

    <ul>
      <li>
        <select v-model="cityName">
          <option value="">Choose one option</option>
          <option value="malaga">Málaga</option>
          <option value="sevilla">Sevilla</option>
          <option value="madrid">Madrid</option>
        </select>
      </li>
    </ul>

    <div v-if="data?.today">
      <ul>
        <li>Weather: {{ data.today?.type }} </li>
        <li>{{ data.today?.temperature }} °<span v-if="data.today?.isCelsius">C</span> <span v-else>F</span></li>
      </ul>
    </div>

    <div v-if="data?.nextDays">
      <h4>Next days:</h4>
      <ul v-for="day in data?.nextDays" :key="day.dateTime">
        <li>Day: {{ day?.dateTime }} </li>
        <li>Weather: {{ day?.type }} </li>
        <li>{{ day?.temperature }} °<span v-if="day?.isCelsius">C</span> <span v-else>F</span></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0; 
  margin: 0;
}
</style>