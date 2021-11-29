<template>
    <q-form
        ref="myForm"
        class="row items-stretch justify-evenly component__log-in__form"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        >
        <div class="component__log-in__form__section column justify-center">
            <p class="component__log-in__intro-text"><span>Logueate</span> para entrar:</p>
        </div>
        <div class="component__log-in__form__section column justify-center">
            <q-input
                filled
                color="indigo"
                v-model="loginData.email"
                stack-label
                label="Escribe tu email"
                class="q-mb-md"
                type="email"
                required
                lazy-rules
                :rules="[
                    val => isEmailSucces(val)[0] || 'No es un mail válido'
                ]">
                <template v-slot:append v-if="isEmailSucces(loginData.email)[0]">
                    <q-icon name="check" color="positive" />
                </template>
            </q-input>
            <q-input
                filled
                color="indigo"
                v-model="loginData.password"
                stack-label
                label="Escribe tu contraseña"
                class="q-mb-md"
                type="password"
                lazy-rules
                minlength="8"
                required
                :rules="[
                    val => isPasswordSucces(val)[0] || 'Debe contener al menos 8 caracteres'
                ]">
                <template v-slot:append v-if="isPasswordSucces(loginData.password)[0]">
                    <q-icon name="check" color="positive" />
                </template>
            </q-input>
            <q-btn flat no-caps color="indigo" label="Olvide mi contraseña" size="md" class="q-ma-sm full-width" to="/forgot"/>
        </div>
        <div class="component__log-in__form__section column justify-end">
            <q-btn
                unelevated
                no-caps
                type="button"
                color="indigo"
                label="Entrar"
                size="lg"
                :disabled="!isValidFormData"
                 @click="submitLogInForm"
                class="q-ma-sm full-width"/>
        <q-btn flat no-caps color="indigo" label="No tengo cuenta, Registrarse" size="md" class="q-ma-sm full-width" to="/signin"/>
        </div>
    </q-form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import './log-in-component.scss'
import { AuthRequest } from '../../models/AuthModels'

export default class LogInComponent extends Vue {
    loginData:AuthRequest = {
      email: null,
      password: null,
      username: null,
      phone: null
    }

    isEmailSucces (val: string | null): boolean[] {
      return [!!(val && val.includes('@'))]
    }

    isPasswordSucces (val: string | null): boolean[] {
      return [!!(val && val.length >= 8)]
    }

    get isValidFormData (): boolean {
      return (
        this.isEmailSucces(this.loginData.email)[0] &&
        this.isPasswordSucces(this.loginData.password)[0]
      )
    }

    async submitLogInForm () {
      try {
        await this.$store.dispatch('wedding/loginUser', this.loginData)
        if (this.$store.state.wedding.user) {
          if (this.$store.state.wedding.user.role === 'admin') this.$router.push('/admin') as Promise<void>
          else this.$router.push('/introduccion') as Promise<void>
        }
      } catch (error) {
        console.log(error)
      }
    }
}
</script>
