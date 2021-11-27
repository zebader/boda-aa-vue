<template>
    <q-form
        class="row items-stretch justify-evenly component__reset-password__form"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        >
        <div class="component__reset-password__form__section column justify-center">
            <p class="component__reset-password__intro-text">Escribe tu <span>nueva Contraseña</span></p>
        </div>
        <div class="component__reset-password__form__section column justify-center">
            <q-input
                filled
                color="indigo"
                v-model="password"
                stack-label
                label="Escribe tu nueva contraseña"
                class="q-mb-md"
                type="password"
                lazy-rules
                minlength="8"
                required
                hint='Debe contener al menos 8 caracteres'
                :rules="[
                    val => isPasswordSucces(val)[0] || 'Debe contener al menos 8 caracteres'
                ]">
                <template v-slot:append v-if="isPasswordSucces(password)[0]">
                    <q-icon name="check" color="positive" />
                </template>
            </q-input>
        </div>
        <div class="component__reset-password__form__section column justify-end">
            <q-btn
                unelevated
                no-caps
                type="button"
                color="indigo"
                label="Enviar"
                size="lg"
                :disabled="!isValidFormData"
                 @click="submitResetPasswordForm"
                class="q-ma-sm full-width"/>
        </div>
    </q-form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import './reset-password-component.scss'

export default class ResetPasswordComponent extends Vue {
    password: string | null = null

    isPasswordSucces (val: string | null): boolean[] {
      return [!!(val && val.length >= 8)]
    }

    get isValidFormData (): boolean {
      return (
        this.isPasswordSucces(this.password)[0]
      )
    }

    async submitResetPasswordForm () {
      try {
        const data = {
          password: this.password,
          id: this.$route.params.id
        }

        await this.$store.dispatch('wedding/resetPassword', data)
        this.$router.push('/login') as Promise<void>
      } catch (error) {
        console.log(error)
      }
    }
}
</script>
