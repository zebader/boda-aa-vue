<template>
    <q-card class="component__home-options-card q-my-sm q-py-sm row justify-between" flat bordered>
      <q-item>
        <q-item-section avatar class="component__home-options-card__avatar">
            <q-avatar>
                <q-icon name="account_circle" class="q-mb-lg q-mt-none" color="secondary" size="2em"></q-icon>
            </q-avatar>
        </q-item-section>

        <q-item-section>
            <q-item-label class="text-bold text-indigo q-mb-sm">{{editedGuest.name}}</q-item-label>
            <q-item-label caption>
                <strong :class="titlesClases(editedGuest.accepted)">Acepta: </strong>{{editedGuest.accepted ? 'Si' : 'No'}}
                <br>
                <strong :class="titlesClases(!!editedGuest.menu)">Menu: </strong>{{editedGuest.menu ? editedGuest.menu : '-'}}
                <br>
                <strong :class="titlesClases(!!editedGuest.intolerance)">Intolerancia: </strong>{{editedGuest.intolerance ? editedGuest.intolerance : 'No'}}
                <br>
                <strong :class="titlesClases(!!editedGuest.bus)">Bus: </strong>{{editedGuest.bus ? editedGuest.bus : '-'}}
        </q-item-label>
        </q-item-section>
      </q-item>
      <div class="column items-center">
        <q-btn flat round color="secondary" icon="edit" class="q-mx-sm" @click="editGuestDialog = true" />
      </div>
    </q-card>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import './home-options-card.scss'
import { GuestItem } from 'components/models'

class Props {
    public guest!:GuestItem;
}

@Options({
  emits: ['edit-guest']
})
export default class HomeOptionsCardComponent extends Vue.with(Props) {
    editedGuest:GuestItem = {
      accepted: false,
      id: null,
      name: null,
      menu: null,
      intolerance: null,
      bus: null
    };

    editGuestDialog = false;
    maximizedToggle= true;

    titlesClases (condition:boolean):Record<string, boolean> {
      return {
        'component__home-options-card__titles--active': condition,
        'component__home-options-card__titles--inactive': !condition
      }
    }

    created () {
      this.editedGuest = { ...this.guest }
    }
}
</script>
