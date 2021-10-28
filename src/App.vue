<template>
  <router-view />
</template>
<script lang="ts">
import { Vue } from 'vue-class-component'
import AuthManager from 'src/lib/AuthManager'

export default class App extends Vue {
  async mounted () {
    try {
      await AuthManager.getInstance().initUser()
    } catch (error) {
      console.log('App init User me error', error)
    }
  }
}
</script>
