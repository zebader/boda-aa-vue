<template>
    <q-form
        class="row items-stretch justify-evenly component__forgot__form"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        >
        <div class="component__forgot__form__section column justify-center">
            <p class="component__forgot__intro-text"><span>Restaura tu contraseña</span> a partir del email:</p>
        </div>
        <div class="component__forgot__form__section column justify-center">
            <q-input
                filled
                color="indigo"
                v-model="email"
                stack-label
                label="Escribe tu email"
                class="q-mb-md"
                type="email"
                required
                lazy-rules
                :rules="[
                    val => isEmailSucces(val)[0] || 'No es un mail válido'
                ]">
                <template v-slot:append v-if="isEmailSucces(email)[0]">
                    <q-icon name="check" color="positive" />
                </template>
            </q-input>
        </div>
        <div class="component__forgot__form__section column justify-end">
            <q-btn
                unelevated
                no-caps
                type="button"
                color="indigo"
                label="Enviar"
                size="lg"
                :disabled="!isValidFormData"
                 @click="submitForgotForm"
                class="q-ma-sm full-width"/>
        <q-btn flat no-caps color="indigo" label="Volver a Login" size="md" class="q-ma-sm full-width" to="/login"/>
        </div>
    </q-form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import './forgot-component.scss'

export default class ForgotComponent extends Vue {
    email:string | null = null;

    isEmailSucces (val: string | null): boolean[] {
      return [!!(val && val.includes('@'))]
    }

    get isValidFormData (): boolean {
      return (
        this.isEmailSucces(this.email)[0]
      )
    }

    async submitForgotForm () {
      try {
        await this.$store.dispatch('wedding/forgot', this.email)
        this.$router.push('/login') as Promise<void>
      } catch (error) {
        console.log(error)
      }
    }
}
</script>
