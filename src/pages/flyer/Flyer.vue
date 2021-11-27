<template>
    <q-page class="page__flyer column items-start justify-start q-pa-md">
        <div class="page__flyer__title-container column justify-center q-pb-lg q-mb-lg">
            <p class="page__flyer__title-container__intro-text">
                Bienvenid@,<br><span>{{this.guestName}}</span>
            </p>
        </div>
        <div class="page__flyer__container column justify-start">
            <transition
                appear
                enter-active-class="animated fadeInDown page__flyer__animation">
                <p class="page__flyer__container__intro-text text-center text-positive">
                        <q-icon name="check_circle" class="q-mr-sm" color="positive" size="md"></q-icon> Tus preferencias han sido añadidas a la lista de boda.
                </p>
            </transition>
        </div>
        <div class="page__flyer__container column justify-center items-center q-my-md">
            <q-spinner-facebook color="indigo" size="3em"></q-spinner-facebook>
        </div>
        <div class="page__flyer__container column justify-center items-center text-center">
            <div class="row no-wrap items-center justify-center">
                <q-icon name="person_add" class="q-mb-lg q-mt-none q-mr-md" color="indigo" size="3em"></q-icon>
                <p class="page__flyer__container__carousel-text">
                    Recuerda <strong>añadir a tus acompañantes</strong>
                </p>
            </div>
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
            this.$router.push('/') as Promise<void>
        }, 4000)
    }
}
</script>
