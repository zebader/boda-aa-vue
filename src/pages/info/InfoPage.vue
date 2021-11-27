<template>
  <q-page class="page__info column items-center justify-start">
        <div class="page__info__title-container column justify-center q-mb-lg">
            <div class="row justify-center items-center">
                <q-icon name="commute" color="secondary" size="sm" class="q-mx-sm"></q-icon>
            <p class="page__info__title-container__title q-mb-none">Mas información</p>
            </div>

            <p class="page__info__title-container__subtitle q-mb-none">
                Transporte, Peluquerias, Maquillaje y otros
            </p>
        </div>
        <InfoComponent></InfoComponent>
  </q-page>
</template>

<script lang="ts">
import InfoComponent from 'components/info/InfoComponent.vue'
import { Vue, Options } from 'vue-class-component'
import './info.scss'

@Options({
  components: { InfoComponent }
})
export default class InfoPage extends Vue {
  get guestName () :string {
    const user = this.$store.state.wedding.user
    if (user && user?.username && user.username) return user.username
    else return 'Invitado'
  }
}
</script>
