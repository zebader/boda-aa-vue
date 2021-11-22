<template>
    <q-page class="page__reset-password row items-stretch justify-evenly q-pa-md">
        <ResetPasswordComponent></ResetPasswordComponent>
    </q-page>

</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import ResetPasswordComponent from '../../components/reset-password/ResetPasswordComponent.vue'
import './reset-password.scss'

@Options({
  components: { ResetPasswordComponent }
})
export default class ResetPasswordPage extends Vue {}
</script>
