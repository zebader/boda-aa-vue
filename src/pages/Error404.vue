<template>
  <div class="fullscreen text-center q-pa-md flex flex-center column">
        <div class="row">
            <q-img src="~assets/logo-boda-aa.png" width="80px" height="80px"/>
        </div>
        <div style="font-size: 10vh">
            404
        </div>

        <div class="text-h6">
            La pagina no existe
        </div>

        <q-btn
            class="q-mt-xl"
            color="indigo"
            unelevated
            to="/"
            label="Ir a inicio"
            no-caps
        />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Error404 extends Vue {}
</script>
