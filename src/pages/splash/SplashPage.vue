<template>
    <q-page class="page__splash column items-center justify-evenly q-pa-md">
        <q-img src="~assets/logo-boda-aa.png" width="90px" height="90px" class="q-ma-md"/>
        <div class="page__splash__title-container">
            <p class="page__splash__title-container__text">Has sido invitado a la boda de</p>
            <transition
            appear
            enter-active-class="animated fadeIn page__splash__image-animation"
            leave-active-class="animated fadeOut page__splash__image-animation">
                <p class="page__splash__title-container__title">Ángela y Adrián</p>
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
                <q-btn unelevated no-caps color="indigo" icon-right="login" label="Entrar" size="lg" class="q-ma-sm full-width" to="/signin"/>
            </transition>
            <q-btn flat no-caps color="indigo" label="Más detalles" size="md" class="q-ma-sm full-width" @click="toggleDialog"/>
        </div>
    </q-page>
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-indigo">Por fin ha llegado el día</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <p>
                Como bien sabéis (y lo sabéis de verdad) nuestro enlace lleva preparándose mucho tiempo y no siempre ha sido fácil visualizar este día: ha tenido retrasos obligatorios, pandemias mundiales inesperadas, cambios de planes impuestos, “ensayos” en Soria y así, una tras otra, situaciones que hemos tenido que superar para alcanzar la meta, finalmente, <strong>el 30 de abril de 2022.</strong>
            </p>
            <p>
                Hablando con honestidad, y cuando echamos la vista hacia atrás, en este camino “adicional” que hemos recorrido juntos desde el día que nos prometimos (para la posteridad queda la pedida que preparó Adri con todo lujo de detalles) hemos aprendido muchas cosas pero nos gustaría destacar alguna de ellas.
            </p>
            <p>
                La primera es que somos unos afortunados por tener a tantísima gente buena a nuestro lado. No seremos nunca capaces de devolver tanto cariño y amor como el que hemos recibido de nuestros amigos y familiares durante los últimos 10 años y mas concretamente en estos últimos meses. Habéis llenado de seguridad las dudas, de generosidad los vacíos y de muchísimo cariño y amor (cada uno a su manera jejeje) nuestras vidas.
            </p>
            <p>
                En segundo lugar tenemos absolutamente claro que el día 30 de abril de 2022 es nuestro enlace y por ello celebraremos una gran fiesta pero queremos que todos sintáis que esa fiesta es también para vosotros y que no solo sois los invitados sino también sois los homenajeados.
            </p>
            <p>
                Por último, deciros que llegamos a este día con muchísima ilusión y seguros del paso que vamos a dar, sin lugar a dudas lo haremos de la mano e intentando ser el mejor compañero y compañera el uno para el otro (el objetivo es llegar a viejitos juntos para tomar vinos a diario en el porche de nuestra caravana en algún lugar perdido del resto del mundo).
            </p>
            <p>
                Solo nos queda daros las gracias de nuevo por vuestra asistencia y por querer formar parte de este día para el recuerdo, os esperamos con muchas ganas el <strong>día 30 de abril de 2022.</strong>
            </p>
            <p class="text-right">
                Adri y Angie
            </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn unelevated label="Volver" color="indigo" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import './splash.scss'

export default class SplashPage extends Vue {
    showDialog = false

    toggleDialog () {
      this.showDialog = !this.showDialog
    }
}
</script>
