<template>
  <q-page class="page__home column items-center justify-start q-py-lg">
    <HomeExpansionOptionsComponent
      title="Example component"
      active
    ></HomeExpansionOptionsComponent>
  </q-page>
</template>

<script lang="ts">
import HomeExpansionOptionsComponent from 'components/home/home-expansion-options/HomeExpansionOptionsComponent.vue'
import { Vue, Options } from 'vue-class-component'
import './home.scss'

@Options({
  components: { HomeExpansionOptionsComponent }
})
export default class HomePage extends Vue {
}
</script>
