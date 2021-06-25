<template>
    <q-layout view="hHh Lpr fFf">
            <Header></Header>
            <Footer></Footer>
            <q-page-container>
                <router-view />
            </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import Header from 'src/components/header/HeaderComponent.vue'
import Footer from 'src/components/footer/FooterComponent.vue'

@Options({
  components: { Header, Footer }
})
export default class MainLayout extends Vue {}
</script>
