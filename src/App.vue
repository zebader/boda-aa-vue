<template>
  <router-view />
</template>
<script lang="ts">
import { Vue } from 'vue-class-component'

export default class App extends Vue {
  async mounted () {
    try {
      await this.$store.dispatch('wedding/updateUser')
      if (this.$store.state.wedding.user) this.$store.commit('wedding/updateShowLogout', true)
    } catch (error) {
      console.log('App init User me error', error)
    }
  }
}
</script>
