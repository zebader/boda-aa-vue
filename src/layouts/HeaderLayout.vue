<template>
    <q-layout view="hHh Lpr fFf" class="layout__main layout__main--marble">
            <Header :isAround="true" :isCounter="isCounter"></Header>
            <q-page-container class="q-pt-none">
                <router-view />
            </q-page-container>
            <Footer></Footer>
    </q-layout>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import './main.scss'
import Header from 'src/components/header/HeaderComponent.vue'
import Footer from 'src/components/footer/FooterComponent.vue'

@Options({
  components: { Header, Footer }
})
export default class MainLayout extends Vue {
    @Prop({ required: false, default: false, type: Boolean }) isCounter!:boolean;
}
</script>
