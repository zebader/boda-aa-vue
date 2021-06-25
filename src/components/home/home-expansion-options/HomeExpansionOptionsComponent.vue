<template>
  <div class="q-pa-md full-width component__home-expansion-options">
    <q-list class="component__home-expansion-options__list-container">
      <q-expansion-item class="component__home-expansion-options__list-container__list-item">
        <template v-slot:header>
            <q-item-section avatar>
                <q-icon name="restaurant" color="primary" />
            </q-item-section>
            <q-item-section>
                <q-item-label>{{preferencesTitle}}</q-item-label>
                <q-item-label caption>Elige menu, si necesitas autobus, etc...</q-item-label>
            </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />

      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="purple" name="signal_wifi_off" />
          </q-item-section>

          <q-item-section>
            Wifi settings
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class HomeExpansionOptionsComponent extends Vue {
  clickCount = 0;

  increment () {
    this.clickCount += 1
  }

  get preferencesTitle () {
    return 'Preferencias de tu familia'
  }
}
</script>
