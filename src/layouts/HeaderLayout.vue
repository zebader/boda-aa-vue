<template>
    <q-layout view="hHh Lpr fFf" class="layout__main layout__main--marble">
            <Header :isAround="true"></Header>
            <q-page-container>
                <router-view />
            </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import './main.scss'
import Header from 'src/components/header/HeaderComponent.vue'
import Footer from 'src/components/footer/FooterComponent.vue'

@Options({
  components: { Header, Footer }
})
export default class MainLayout extends Vue {}
</script>
