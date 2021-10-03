<template>
    <q-page class="page__login row items-stretch justify-evenly q-pa-md">
        <LogInComponent v-if="!isSignIn"></LogInComponent>
        <SignInComponent v-if="isSignIn"></SignInComponent>
    </q-page>

</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import LogInComponent from '../../components/log-in/LogInComponent.vue'
import SignInComponent from '../../components/sign-in/SignInComponent.vue'
import './login.scss'

@Options({
  components: { LogInComponent, SignInComponent }
})
export default class LoginPage extends Vue {
  @Prop({ required: false, default: false, type: Boolean }) signInRoute!:boolean;

  get isSignIn () :boolean {
    return this.signInRoute
  }
}
</script>
