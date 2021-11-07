<template>
    <transition
    appear
    enter-active-class="animated slideInUp">
        <q-footer flat v-if="showMenu">
                <q-toolbar class="bg-white row row justify-center">
                    <q-btn v-if="showMenuButton" flat round dense icon="restaurant_menu" color="indigo" class="q-mx-sm" to="/"/>
                    <q-separator spaced inset vertical dark />
                    <q-btn color="indigo" flat round dense icon="logout" @click="doLogout" class="q-mx-sm" v-if="showLogout"/>
                </q-toolbar>

                    <div class="q-pa-md full-width bg-positive" >
                        <p class="text-center text-primary q-mb-none">
                            Puedes ingresar el cubierto o regalo aquí:
                        </p>
                        <div class="row no-wrap justify-center items-center">
                            <q-icon name="payments" color="white" size="sm"/>
                            <h6 class="text-center q-ma-none text-bold text-white q-mx-sm"> 1465 0100 72 2030876292</h6>
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
    return !this.routeMenuBlackList.includes(this.$router.currentRoute.value.path)
  }

  async doLogout () {
    await this.$store.dispatch('wedding/logoutUser')
      this.$router.push('/signin') as Promise<void>
  }
}
</script>
