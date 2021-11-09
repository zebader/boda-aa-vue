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
                label="Nombre completo ( 2 apellidos) *"
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
                label="Escribe tu email *"
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
                label="Escribe tu contraseña *"
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
                <template v-slot:hint>
                        Debe contener al menos 8 caracteres
                </template>
            </q-input>
        </div>
        <div class="component__sign-in__form__section column justify-end">
                <div class="row items-center">
                    <q-checkbox v-model="terms" color="indigo"/>
                    <p class="q-ma-none">Aceptar <span class="text-indigo component__sign-in__form__section__terms" @click="openTermsDialog = true">terminos y condiciones de datos</span></p>
                </div>
            <q-btn
                unelevated
                no-caps
                type="button"
                color="indigo"
                label="Registrarse"
                size="lg"
                :disabled="!isValidFormData && !submitButtonDisabled"
                :loading="submitButtonDisabled"
                class="q-ma-sm full-width"
                @click="submitSignInForm"
                />
                <q-btn flat no-caps color="indigo" label="Ya tengo cuenta, Loguearse" size="md" class="q-ma-sm full-width" to="/login"/>
        </div>
    </q-form>
    <q-dialog v-model="openTermsDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Términos y condiciones Protección de Datos</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <p>
                Le informamos que, de conformidad con la normativa sobre protección de datos, sus datos serán objeto de tratamiento por los administradores de esta web como Responsables de los mismos con la finalidad de gestionar los datos facilitados para la organización del enlace. Contamos con su consentimiento para el tratamiento de los datos que nos ha facilitado, de forma voluntaria, libre e informada a los efectos ya mencionados. Podrá ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación al tratamiento, portabilidad, transparencia en la información y a no ser objeto de decisiones individualizadas automatizadas, comunicándolo por escrito.
            </p>
            <p>
                Todos los datos facilitados de carácter personal serán eliminados en el plazo de 6 meses (una vez celebrado el enlace).
            </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn unelevated label="Cerrar" color="indigo" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { AuthRequest } from '../../models/AuthModels'
import './sign-in-component.scss'

export default class SignInComponent extends Vue {
    signInData:AuthRequest = {
      username: null,
      email: null,
      phone: null,
      password: null,
      role: 'user'
    }

    submitButtonDisabled = false

    terms = false

    openTermsDialog = false

    get isValidFormData (): boolean {
      return (
        this.isEmailSucces(this.signInData.email)[0] &&
        this.isNameSucces(this.signInData.username)[0] &&
        // this.isPhoneSucces(this.signInData.phone)[0] &&
        this.isPasswordSucces(this.signInData.password)[0] &&
        this.terms
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
      this.submitButtonDisabled = true

      try {
        await this.$store.dispatch('wedding/createUser', this.signInData)

        this.$router.push('/onboarding') as Promise<void>
      } catch (error) {
        console.log(error)
      }
    }
}
</script>
