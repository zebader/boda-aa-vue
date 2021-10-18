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
                <!-- <p class="component__home-options-card__titles">Acepta: <span>{{editedGuest.accepted ? 'Si' : 'No'}}</span></p> -->
                <p class="component__home-options-card__titles">Menu: <span>{{editedGuest.menu ? editedGuest.menu : '-'}}</span></p>
                <p class="component__home-options-card__titles">Intolerancia: <span>{{editedGuest.intolerance ? editedGuest.intolerance : 'No'}}</span></p>
                <p class="component__home-options-card__titles">Bus: <span>{{editedGuest.bus ? editedGuest.bus : '-'}}</span></p>
        </q-item-label>
        </q-item-section>
      </q-item>
      <div class="column items-center justify-between">
        <q-btn flat round color="secondary" icon="edit" class="q-mx-sm" @click="openEditGuestDialog" />
        <q-btn flat round color="secondary" icon="delete" class="q-mx-sm" @click="openDeleteGuestDialog" />
      </div>
    </q-card>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Emit, Prop, Watch } from 'vue-property-decorator'
import './home-options-card.scss'
import { GuestItem } from 'components/models'

export default class HomeOptionsCardComponent extends Vue {
    @Prop({ required: false, default: {}, type: Object }) guest!:GuestItem;

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

    @Watch('guest')
    updateEditedGuest (newEditedGuest: GuestItem) {
      this.editedGuest = { ...newEditedGuest }
    }

    @Emit('open-edit-guest-dialog')
    openEditGuestDialog () {
      return this.editedGuest
    }

    @Emit('open-delete-guest-dialog')
    openDeleteGuestDialog () {
      return this.editedGuest
    }

    created () {
      this.editedGuest = { ...this.guest }
    }
}
</script>
