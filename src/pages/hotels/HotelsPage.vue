<template>
  <q-page class="page__hotels column items-center justify-start">
              <div class="page__hotels__title-container column justify-center q-mb-lg">
                  <div class="row justify-center items-center">
                      <q-icon name="bed" color="secondary" size="sm" class="q-mx-sm"></q-icon>
            <p class="page__hotels__title-container__title q-mb-none">Hoteles</p>

                  </div>
            <p class="page__hotels__title-container__subtitle q-mb-none">
                Los mejores alojamientos en Alcazar
            </p>

        </div>
        <HotelsComponent></HotelsComponent>
  </q-page>
</template>

<script lang="ts">
import HotelsComponent from 'components/hotels/HotelsComponent.vue'
import { Vue, Options } from 'vue-class-component'
import './hotels.scss'

@Options({
  components: { HotelsComponent }
})
export default class HotelsPage extends Vue {
  get guestName () :string {
    const user = this.$store.state.wedding.user
    if (user && user?.username && user.username) return user.username
    else return 'Invitado'
  }
}
</script>
