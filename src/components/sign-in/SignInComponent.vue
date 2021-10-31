<template>
    <q-form
        class="row items-stretch justify-evenly component__sign-in__form"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        >
        <div class="component__sign-in__form__section column justify-center">
            <p class="component__sign-in__intro-text"><span>Registrate</span> para ayudarnos a prepararlo todo:</p>
        </div>
        <div class="component__sign-in__form__section column justify-center">
            <q-input
                filled
                color="indigo"
                v-model="signInData.username"
                stack-label
                label="Nombre completo ( 2 apellidos)*"
                class="q-mb-md"
                placeholder="Ej. Adrian Cebader Rodriguez"
                lazy-rules
                required
                :rules="[
                    val => isNameSucces(val)[0] || 'Rellena este campo'
                ]">
                <template v-slot:append v-if="isNameSucces(signInData.username)[0]">
                    <q-icon name="check" color="green" />
                </template>
            </q-input>
            <q-input
                filled
                color="indigo"
                v-model="signInData.email"
                stack-label
                label="Escribe tu email"
                class="q-mb-md"
                type="email"
                required
                lazy-rules
                :rules="[
                    val => isEmailSucces(val)[0] || 'No es un mail válido'
                ]">
                <template v-slot:append v-if="isEmailSucces(signInData.email)[0]">
                    <q-icon name="check" color="green" />
                </template>
            </q-input>
            <q-input
                filled
                color="indigo"
                v-model="signInData.phone"
                stack-label
                label="Escribe tu teléfono"
                class="q-mb-md"
                type="tel"
                required
                lazy-rules
                :rules="[
                    val => isPhoneSucces(val)[0] || 'El teléfono debe contener solo números'
                ]">
                <template v-slot:append v-if="isPhoneSucces(signInData.phone)[0]">
                    <q-icon name="check" color="green" />
                </template>
            </q-input>
            <q-input
                filled
                color="indigo"
                v-model="signInData.password"
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
                <template v-slot:append v-if="isPasswordSucces(signInData.password)[0]">
                    <q-icon name="check" color="green" />
                </template>
            </q-input>
        </div>
        <div class="component__sign-in__form__section column justify-end">
            <q-btn
                unelevated
                no-caps
                type="button"
                color="indigo"
                label="Registrarse"
                size="lg"
                :disabled="!isValidFormData"
                class="q-ma-sm full-width"
                @click="submitSignInForm"/>
                <q-btn flat no-caps color="indigo" label="Ya tengo cuenta, Loguearse" size="md" class="q-ma-sm full-width" to="/login"/>
        </div>
    </q-form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import AuthService from '../../services/AuthService'
import { AuthRequest, AuthResponse } from '../../models/AuthModels'
import './sign-in-component.scss'

export default class SignInComponent extends Vue {
    signInData:AuthRequest = {
      username: null,
      email: null,
      phone: null,
      password: null,
      role: 'user'
    }

    get isValidFormData (): boolean {
      return (
        this.isEmailSucces(this.signInData.email)[0] &&
        this.isNameSucces(this.signInData.username)[0] &&
        this.isPhoneSucces(this.signInData.phone)[0] &&
        this.isPasswordSucces(this.signInData.password)[0]
      )
    }

    isNameSucces (val: string | null): boolean[] {
      return [!!(val && val.length > 0)]
    }

    isEmailSucces (val: string | null): boolean[] {
      return [!!(val && val.includes('@'))]
    }

    isPhoneSucces (val: string | null): boolean[] {
      return [!!(val && !isNaN(Number(val.replace(/\s+/g, ''))))]
    }

    isPasswordSucces (val: string | null): boolean[] {
      return [!!(val && val.length >= 8)]
    }

    async submitSignInForm () {
      const authService:AuthService = new AuthService()
      let response:AuthResponse | null
      try {
        response = await authService.createUser(this.signInData)
        console.log('usuario creado,', response)
      } catch (error) {
        console.log('error al crear usuario', error)
      }
    }
}
</script>
