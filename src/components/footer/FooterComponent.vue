<template>
    <transition
    appear
    enter-active-class="animated slideInUp">
        <q-footer flat v-if="showMenu" class="component__footer">
                <q-toolbar class="bg-white">
                    <div class="row justify-evenly component__footer__toolbar">

                    <q-btn v-if="showMenuButton" flat dense color="indigo" to="/">
                        <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="restaurant_menu" />
                            <p class="q-ma-none">Inicio</p>
                        </div>
                    </q-btn>
                    <q-btn v-if="showMenuButton" flat dense color="indigo" to="/hoteles">
                        <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="bed" />
                            <p class="q-ma-none">Hoteles</p>
                        </div>
                    </q-btn>
                    <q-btn v-if="showMenuButton" flat dense color="indigo" to="/info">
                        <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="commute" />
                            <p class="q-ma-none">+Info</p>
                        </div>
                    </q-btn>
                    <q-btn color="indigo" flat dense @click="doLogout" v-if="showLogout">
                    <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="logout" />
                            <p class="q-ma-none">Salir</p>
                        </div>
                    </q-btn>
                    </div>
                </q-toolbar>

                    <div class="q-pa-md full-width bg-positive" >
                        <p class="text-center text-primary q-mb-none">
                            Puedes ingresar el cubierto o regalo aquí:
                        </p>
                        <div class="row no-wrap justify-center items-center">
                            <q-icon name="payments" color="white" size="sm"/>
                            <h6 class="text-center q-ma-none text-bold text-white q-mx-sm">ES05 1465 0100 9317 3539 3377</h6>
                        </div>
                    </div>

        </q-footer>
    </transition>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import './footer-component.scss'

export default class FooterComponent extends Vue {
  get showLogout ():boolean {
    return !!this.$store.state.wedding.user
  }

  get routeButtonBlackList ():string[] {
    return ['/onboarding', '/welcome', '/signin', '/login']
  }

  get routeMenuBlackList ():string[] {
    return ['/signin', '/login']
  }

  get showMenuButton ():boolean {
    return !this.routeButtonBlackList.includes(this.$router.currentRoute.value.path)
  }

  get showMenu ():boolean {
    return !this.routeMenuBlackList.includes(this.$router.currentRoute.value.path) && this.showLogout
  }

  async doLogout () {
    await this.$store.dispatch('wedding/logoutUser')
      this.$router.push('/signin') as Promise<void>
  }
}
</script>
