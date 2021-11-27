<template>
    <q-layout view="hHh Lpr fFf" class="layout__main layout__main--marble">
            <q-page-container>
                <router-view />
            </q-page-container>
            <Footer></Footer>
    </q-layout>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import Footer from 'src/components/footer/FooterComponent.vue'

import './main.scss'
@Options({
  components: { Footer }
})
export default class CleanLayout extends Vue {}
</script>
