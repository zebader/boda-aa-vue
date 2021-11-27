<template>
    <transition
    appear
    enter-active-class="animated slideInUp">
        <q-footer flat v-if="showMenu" class="component__footer bg-transparent">

                    <div class="q-pa-md full-width row justify-center items-center" v-if="showOnlyGift">
                        <q-btn unelevated rounded color="accent" @click="openGiftDialog = true" no-caps class="q-px-ms" type="button">
                            <div class="row no-wrap justify-center items-center">
                                <q-icon name="redeem" color="white" size="sm"/>
                                <h6 class="text-center q-ma-none text-bold text-white q-mx-sm">Regalo de bodas</h6>
                                <q-icon name="chevron_right" color="white" size="sm" class="animated headShake component__footer__arrow"/>
                            </div>
                        </q-btn>
                    </div>

                <q-toolbar class="bg-white" v-if="showMenuButton">
                    <div class="row justify-evenly component__footer__toolbar">

                    <q-btn flat dense color="secondary" to="/">
                        <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="restaurant_menu" />
                            <p class="q-ma-none">Inicio</p>
                        </div>
                    </q-btn>
                    <q-btn  flat dense color="secondary" to="/hoteles">
                        <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="bed" />
                            <p class="q-ma-none">Hoteles</p>
                        </div>
                    </q-btn>
                    <q-btn  flat dense color="secondary" to="/info">
                        <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="commute" />
                            <p class="q-ma-none">+Info</p>
                        </div>
                    </q-btn>
                    <q-btn color="secondary" flat dense @click="doLogout" v-if="showLogout">
                    <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="logout" />
                            <p class="q-ma-none">Salir</p>
                        </div>
                    </q-btn>
                    </div>
                </q-toolbar>
        </q-footer>
    </transition>
    <q-dialog v-model="openGiftDialog">
        <q-card flat unelevated>
        <q-toolbar class="bg-primary q-py-sm q-px-md">
            <q-toolbar-title>
                <q-icon name="redeem" color="indigo" size="sm" class="q-mr-md"/>
                <span class="text-h6 text-indigo">Regalo de Bodas</span>
            </q-toolbar-title>

            <q-btn flat round icon="close" color="secondary" v-close-popup></q-btn>
        </q-toolbar>
        <div class="component__footer__container column justify-center items-center text-center q-pa-md">
            <div>
                <p class="component__footer__container__carousel-text">
                    Hay momentos en la vida que son especiales por si solos, compartirlos con las personas que quieres los convierte en inolvidables.
                </p>
                <p class="component__footer__container__carousel-text">
                    Nuestro enlace será el comienzo de un nuevo viaje juntos, si queréis contribuir al comienzo de nuestra historia os facilitamos un número de cuenta
                </p>
                <h5 class="q-ma-none text-bold text-indigo">ES05 1465 0100 9317 3539 3377</h5>
                <p class="component__footer__container__carousel-text">
                    Si, os resultara más cómodo, podéis también podéis utilizar Bizum.
                </p>
            </div>
        </div>
        </q-card>

    </q-dialog>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import './footer-component.scss'

export default class FooterComponent extends Vue {
    openGiftDialog = false
    get showLogout ():boolean {
      return !!this.$store.state.wedding.user
    }

    get routeButtonBlackList ():string[] {
      return ['introduccion', 'invitacion', 'signin', 'login', 'forgot', 'reset-password']
    }

    get routeMenuBlackList ():string[] {
      return ['admin']
    }

    get showMenuButton ():boolean {
      console.log(this.$route)

      return !this.routeButtonBlackList.includes(this.$route.name as string || this.$route.matched[0].name as string)
    }

    get showMenu ():boolean {
      return !this.routeMenuBlackList.includes(this.$route.name as string || this.$route.matched[0].name as string)
    }

    get showOnlyGift ():boolean {
      return true
    }

    async doLogout () {
      await this.$store.dispatch('wedding/logoutUser')
      this.$router.push('/signin') as Promise<void>
    }
}
</script>
