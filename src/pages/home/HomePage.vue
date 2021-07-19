<template>
  <q-page class="page__home column items-center justify-start">
    <HomeWelcomeCardComponent></HomeWelcomeCardComponent>
    <HomeOptionsExpansionComponent></HomeOptionsExpansionComponent>
  </q-page>
</template>

<script lang="ts">
import HomeOptionsExpansionComponent from 'components/home/home-options-expansion/HomeOptionsExpansionComponent.vue'
import HomeWelcomeCardComponent from 'components/home/home-welcome-card/HomeWelcomeCardComponent.vue'
import { Vue, Options } from 'vue-class-component'
import './home.scss'

@Options({
  components: { HomeOptionsExpansionComponent, HomeWelcomeCardComponent }
})
export default class HomePage extends Vue {}
</script>
