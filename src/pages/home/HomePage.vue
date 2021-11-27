<template>
  <q-page class="page__home column items-center justify-start">
              <div class="page__home__title-container column justify-center q-mb-lg">
                  <div class="row justify-center items-center">
                      <q-icon name="restaurant_menu" color="secondary" size="sm" class="q-mx-sm"></q-icon>
            <p class="page__home__title-container__title q-mb-none">Preferencias</p>

                  </div>
            <p class="page__home__title-container__subtitle q-mb-none">
                Añade acompañantes y edita preferencias
            </p>

        </div>
    <HomeOptionsExpansionComponent></HomeOptionsExpansionComponent>
  </q-page>
</template>

<script lang="ts">
import HomeOptionsExpansionComponent from 'components/home/home-options-expansion/HomeOptionsExpansionComponent.vue'
import HomeWelcomeCardComponent from 'components/home/home-welcome-card/HomeWelcomeCardComponent.vue'
import { Vue, Options } from 'vue-class-component'
import './home.scss'

@Options({
  components: { HomeOptionsExpansionComponent, HomeWelcomeCardComponent }
})
export default class HomePage extends Vue {
  get guestName () :string {
    const user = this.$store.state.wedding.user
    if (user && user?.username && user.username) return user.username
    else return 'Invitado'
  }
}
</script>
