<template>
    <q-page class="page__splash column items-center justify-evenly q-pa-md">
        <q-img src="~assets/logo-boda-aa.png" width="90px" height="90px" class="q-ma-md"/>
        <div class="page__splash__title-container">
            <p class="page__splash__title-container__text">Has sido invitado a la boda de</p>
            <transition
            appear
            enter-active-class="animated fadeIn page__splash__image-animation"
            leave-active-class="animated fadeOut page__splash__image-animation">
                <p class="page__splash__title-container__title">Adrián y Ángela</p>
            </transition>
        </div>
        <!-- <q-img src="~assets/wedding-invitation.svg" width="65px" height="65px" class="q-ma-md"/> -->
        <transition
            appear
            enter-active-class="animated fadeIn page__splash__image-animation"
            leave-active-class="animated fadeOut page__splash__image-animation">
            <q-img src="~assets/splash-img.png" class="full-width q-mb-md"/>
        </transition>
        <div class="page__splash__date-container">
            <p class="page__splash__date-container__text page__splash__date-container__text--strong">30 de Abril de 2022</p>
            <p class="page__splash__date-container__text">Alcazar de San Juan</p>
        </div>
        <div class="q-my-sm q-px-md page__splash__button-container">
            <transition
                appear
                enter-active-class="animated bounceInUp page__splash__image-animation"
                leave-active-class="animated bounceInDown page__splash__image-animation">
                <q-btn unelevated no-caps color="indigo" icon-right="login" label="Entrar" size="lg" class="q-ma-sm full-width"/>
            </transition>
            <q-btn flat no-caps color="indigo" label="Más detalles" size="md" class="q-ma-sm full-width" @click="toggleDialog"/>
        </div>
    </q-page>
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Quienes somos y por que nos casamos</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-img src="~assets/splash-details-img.jpg" class="full-width q-mb-md"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn unelevated label="Volver" color="indigo" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import './splash.scss'

@Options({
//   components: { HomeOptionsExpansionComponent, HomeWelcomeCardComponent }
})
export default class SplashPage extends Vue {
    showDialog = false

    toggleDialog () {
      this.showDialog = !this.showDialog
    }
}
</script>
