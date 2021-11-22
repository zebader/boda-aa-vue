<template>
    <q-page class="page__forgot row items-stretch justify-evenly q-pa-md">
        <ForgotComponent></ForgotComponent>
    </q-page>

</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import ForgotComponent from '../../components/forgot/ForgotComponent.vue'
import './forgot.scss'

@Options({
  components: { ForgotComponent }
})
export default class ForgotPage extends Vue {}
</script>
