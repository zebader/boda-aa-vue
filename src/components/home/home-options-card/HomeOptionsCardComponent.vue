<template>
    <q-card class="component__home-options-card q-my-xs q-py-sm row justify-between" flat>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
            <q-item-label>{{guest.name}}</q-item-label>
            <q-item-label caption>
                <strong>Acepta: </strong>{{guest.accepted ? 'Si' : 'No'}}
                <br>
                <strong>Menu: </strong>{{guest.menu ? guest.menu : 'Ninguno'}}
                <br>
                <strong>Bus: </strong>{{guest.bus ? guest.bus : 'Ninguno'}}
        </q-item-label>
        </q-item-section>
      </q-item>
      <div class="q-my-auto q-mx-sm">
      <q-icon
        :color="checkIcon ? 'positive' : 'negative'"
        :name="checkIcon ? 'check' : 'error'"
        size="md"
        class="q-my-auto"/>
      <q-btn flat round color="secondary" icon="edit" class="q-my-auto q-mx-sm"/>

      </div>
    </q-card>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import './home-options-card.scss'
import { GuestItem } from 'components/models'

export default class HomeOptionsCardComponent extends Vue {
    @Prop({ required: false, default: false, type: Object }) guest!: GuestItem;

    get checkIcon (): boolean {
      console.log(this.guest)

      return this.guest.formFilled
    }
}
</script>
