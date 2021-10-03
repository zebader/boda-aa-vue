<template>
    <q-header unelevated v-if="isAround" class="bg-transparent">
        <q-toolbar class="q-pa-md">
            <q-img src="~assets/logo-boda-aa.png" width="40px" height="40px"/>
            <q-toolbar-title></q-toolbar-title>
            <div>
                <p class="component__header__title">Adrián y Ángela</p>
                <p class="component__header__subtitle">30 de Abril de 2022</p>
            </div>
        </q-toolbar>
    </q-header>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import Countdown from 'src/components/countdown/CountdownComponent.vue'
import './header-component.scss'

class Props {
    public isAround!:boolean;
}

@Options({
  components: { Countdown }
})
export default class HeaderComponent extends Vue.with(Props) {}
</script>
