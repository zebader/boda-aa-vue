<template>
    <q-page class="page__flyer column items-start justify-start q-pa-md">
        <div class="page__flyer__title-container column justify-center q-pb-lg q-mb-lg">
            <p class="page__flyer__title-container__intro-text">
                Bienvenido,<br><span>Jesus Cebader Rodriguez</span>
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
        <div class="page__flyer__container column justify-center items-center">
            <q-carousel
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
                    <p class="page__flyer__container__carousel-text"> <span>Ayudanos</span> a empezar esta nueva aventura haciendo un ingreso en nuestra cuenta común:</p>
                    <h5 class="q-ma-none text-bold"> 1465 0100 72 2030876292</h5>
                </q-carousel-slide>
            </q-carousel>
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

    mounted () {
      setTimeout(() => {
        this.$router.push('/') as Promise<void>
      }, 7000)
    }
}
</script>
