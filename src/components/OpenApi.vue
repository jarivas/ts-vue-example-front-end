<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useOpenapiStore, type State } from '../stores/openapi'

let hydrated = ref(false)
let state: State

onMounted(() => {
  const openapi = useOpenapiStore()
  openapi.hydrate().then((data) => {

    if (data.openapi != null) {
      hydrated.value = true
      state = data
    }
    
  })
})

</script>
<template>
  <div v-if="hydrated">
    <pre>{{ JSON.stringify(state, null, 4) }}</pre>
  </div>
  
</template>