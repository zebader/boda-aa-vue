<template>
    <q-header unelevated>
        <q-toolbar>
            <q-img src="~assets/logo-boda-aa.svg" width="30px" height="30px" class="q-mr-xs"/>
            <q-toolbar-title>
                <Countdown :date="weddingDate"></Countdown>
            </q-toolbar-title>
            <q-btn flat round dense icon="menu" class="q-mr-sm" color="dark"/>

        </q-toolbar>
    </q-header>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import Countdown from 'src/components/countdown/CountdownComponent.vue'

@Options({
  components: { Countdown }
})

export default class HeaderComponent extends Vue {
  get weddingDate () :string {
    return 'Mon Apr 11 2022 23:59:459 GMT+0200'
  }
}
</script>
