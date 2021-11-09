<template>
    <q-page class="page__flyer column items-start justify-start q-pa-md">
        <div class="page__flyer__title-container column justify-center q-pb-lg q-mb-lg">
            <p class="page__flyer__title-container__intro-text">
                Bienvenido,<br><span>{{this.guestName}}</span>
            </p>
        </div>
        <div class="page__flyer__container column justify-start">
            <transition
                appear
                enter-active-class="animated fadeInDown page__flyer__animation">
                <p class="page__flyer__container__intro-text text-center text-green">
                        <q-icon name="check_circle" class="q-mr-sm" color="green" size="md"></q-icon> Tus preferencias han sido añadidas a la lista de boda.
                </p>
            </transition>
        </div>
        <div class="page__flyer__container column justify-center items-center q-my-md">
            <q-spinner-facebook color="indigo" size="3em"></q-spinner-facebook>
        </div>
        <div class="page__flyer__container column justify-center items-center text-center">
            <div>
                <q-icon name="redeem" class="q-mb-lg q-mt-none" color="indigo" size="5em"></q-icon>
                <p class="page__flyer__container__carousel-text">
                    Hay momentos en la vida que son especiales por si solos, compartirlos con las personas que quieres los convierte en inolvidables.
                </p>
                <p class="page__flyer__container__carousel-text">
                    Nuestro enlace será el comienzo de un nuevo viaje juntos, si queréis contribuir al comienzo de nuestra historia os facilitamos un número de cuenta
                </p>
                <h5 class="q-ma-none text-bold">ES05 1465 0100 9317 3539 3377</h5>
                <p class="page__flyer__container__carousel-text">
                    Si, os resultara más cómodo, podéis también podéis utilizar Bizum.
                </p>
            </div>
<!--             <q-carousel
                animated
                v-model="slide"
                swipeable
                infinite
                :autoplay="autoplaySpeed"
                transition-prev="slide-right"
                transition-next="slide-left"
                control-color="indigo"
                height="300px"
                class="full-width bg-transparent"
                >
                <q-carousel-slide :name="1" class="column justify-start items-center text-center">
                    <q-icon name="family_restroom" class="q-mb-lg q-mt-none" color="indigo" size="5em"></q-icon>
                    <p class="page__flyer__container__carousel-text"> Recuerda <span>añadir a tus acompañantes</span> en la siguiente pantalla</p>
                </q-carousel-slide>
                <q-carousel-slide :name="2" class="column justify-start items-center text-center">
                    <q-icon name="redeem" class="q-mb-lg q-mt-none" color="indigo" size="5em"></q-icon>
                    <p class="page__flyer__container__carousel-text">
                        Hay momentos en la vida que son especiales por si solos, compartirlos con las personas que quieres los convierte en inolvidables.
                    </p>
                    <p class="page__flyer__container__carousel-text">
                        Nuestro enlace será el comienzo de un nuevo viaje juntos, si queréis contribuir al comienzo de nuestra historia os facilitamos un número de cuenta
                    </p>
                    <h5 class="q-ma-none text-bold">ES05 1465 0100 9317 3539 3377</h5>
                    <p class="page__flyer__container__carousel-text">
                        Si, os resultara más cómodo, podéis también podéis utilizar Bizum.
                    </p>
                </q-carousel-slide>
            </q-carousel> -->
        </div>

    </q-page>

</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import './flyer.scss'

export default class flyerPage extends Vue {
    slide = 1

    get autoplaySpeed ():number {
      return this.slide === 1 ? 2000 : 5000
    }

    get guestName () :string {
      const user = this.$store.state.wedding.user
      if (user && user?.username && user.username) return user.username
      else return 'Invitado'
    }

    mounted () {
      setTimeout(() => {
        this.$router.replace('/') as Promise<void>
      }, 7000)
    }
}
</script>
