<template>
    <q-card class="component__home-options-card q-my-sm q-py-sm row justify-between" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
            <q-item-label>{{editedGuest.name}}</q-item-label>
            <q-item-label caption>
                <strong :class="titlesClases(editedGuest.accepted)">Acepta: </strong>{{editedGuest.accepted ? 'Si' : 'No'}}
                <br>
                <strong :class="titlesClases(!!editedGuest.menu)">Menu: </strong>{{editedGuest.menu ? editedGuest.menu : '-'}}
                <br>
                <strong :class="titlesClases(!!editedGuest.bus)">Bus: </strong>{{editedGuest.bus ? editedGuest.bus : '-'}}
        </q-item-label>
        </q-item-section>
      </q-item>
      <div class="q-my-auto q-mx-sm">
      <q-icon
        :color="checkIcon ? 'positive' : 'negative'"
        :name="checkIcon ? 'check' : 'error'"
        size="md"
        class="q-my-auto"/>
      <q-btn flat round color="secondary" icon="edit" class="q-my-auto q-mx-sm" @click="editGuestDialog = true" />

      </div>
    </q-card>

    <q-dialog
        v-model="editGuestDialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
    >
      <q-card class="bg-primary">
        <q-toolbar class="bg-primary q-py-sm q-px-md">
            <q-toolbar-title>
                <span class="text-h6">Editar a {{editedGuest.name}}</span>
            </q-toolbar-title>

            <q-btn flat round icon="close" v-close-popup></q-btn>
        </q-toolbar>
        <q-separator />

        <div class="component__home-options-expansion__dialog">
            <q-card-section class="q-pt-lg">
            Por favor, rellena todos los datos para poder ayudarnos a preparar mejor la boda:
            </q-card-section>
            <q-card-section>
                <q-form
                    @submit="editGuestOnSubmit"
                    autocorrect="off"
                    autocapitalize="off"
                    autocomplete="off"
                    spellcheck="false"
                    class="q-gutter-md"
                    >
                    <q-input
                        rounded outlined
                        bg-color="white"
                        v-model="editedGuest.name"
                        label="¿Cual es su nombre?"
                        hint="Nombre y apellidos"
                        lazy-rules
                        color="secondary"
                        :rules="[ val => val && val.length > 0 || 'Añade un nombre, por favor']"
                    />
                    <q-checkbox left-label v-model="editedGuest.accepted" label="¿Viene a la boda?" color="secondary"/>

                    <q-select
                        rounded outlined
                        bg-color="white"
                        color="secondary"
                        hint="Selecciona una de las opciones de menu"
                        lazy-rules
                        v-model="guestMenuModel"
                        :options="menuOptions"
                        label="Elige tu menú"
                        clearable
                        behavior="dialog"
                        options-selected-class="text-secondary">
                        <template v-slot:option="scope">
                        <q-item
                            v-bind="scope.itemProps"
                            v-on="scope.itemEvents">
                            <q-item-section avatar>
                                <q-icon :name="scope.opt.icon" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label v-html="scope.opt.label" />
                                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        </template>
                    </q-select>

                    <q-select
                        rounded outlined
                        bg-color="white"
                        color="secondary"
                        hint="Selecciona una de las opciones de transporte"
                        lazy-rules
                        v-model="guestBusModel"
                        :options="busOptions"
                        label="Elige tu medio de transporte"
                        clearable
                        behavior="dialog"
                        options-selected-class="text-secondary">
                        <template v-slot:option="scope">
                        <q-item
                            v-bind="scope.itemProps"
                            v-on="scope.itemEvents">
                            <q-item-section avatar>
                                <q-icon :name="scope.opt.icon" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label v-html="scope.opt.label" />
                                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        </template>
                    </q-select>

                    <div>
                        <q-btn label="Submit" type="submit" color="secondary" unelevated/>
                    </div>
                </q-form>
            </q-card-section>
        </div>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import './home-options-card.scss'
import { GuestItem, optionsModel } from 'components/models'

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
      bus: null
    };

    guestMenuModel:optionsModel = {
      label: null,
      value: null,
      description: null,
      category: null,
      icon: null
    }

    guestBusModel:optionsModel = {
      label: null,
      value: null,
      description: null,
      category: null,
      icon: null
    }

    editGuestDialog = false;
    maximizedToggle= true;

    get checkIcon (): boolean {
      return !!(this.editedGuest.accepted && this.editedGuest.menu && this.editedGuest.bus)
    }

    get menuOptions ():optionsModel[] {
      return [
        {
          label: 'Carne',
          value: 'carne',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: '1',
          icon: 'mail'
        },
        {
          label: 'Pescado',
          value: 'pescado',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: '2',
          icon: 'mail'
        },
        {
          label: 'Vegetariano',
          value: 'vegetariano',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: '3',
          icon: 'mail'
        },
        {
          label: 'Vegano',
          value: 'vegano',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: '3',
          icon: 'mail'
        },
        {
          label: 'Sin Gluten',
          value: 'singluten',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: '3',
          icon: 'mail'
        }
      ]
    }

    get busOptions ():optionsModel[] {
      return [
        {
          label: 'Manoteras',
          value: 'manoteras',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: '1',
          icon: 'mail'
        },
        {
          label: 'Alcazar',
          value: 'alcazar',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: '2',
          icon: 'mail'
        },
        {
          label: 'No necesito',
          value: 'no necesito',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: '3',
          icon: 'mail'
        }
      ]
    }

    titlesClases (condition:boolean):Record<string, boolean> {
      return {
        'component__home-options-card__titles--active': condition,
        'component__home-options-card__titles--inactive': !condition
      }
    }

    initGuestValues () {
      this.guestMenuModel.value = this.editedGuest.menu
      this.guestMenuModel.label = this.editedGuest.menu
      this.guestBusModel.value = this.editedGuest.bus
      this.guestBusModel.label = this.editedGuest.bus
    }

    setValuesToSend () {
      this.editedGuest.menu = this.guestMenuModel.value
      this.editedGuest.bus = this.guestBusModel.value
    }

    editGuestOnSubmit () {
      this.editGuestDialog = false
      this.setValuesToSend()

      this.$emit('edit-guest', this.editedGuest)

      return this.editedGuest
    }

    created () {
      this.editedGuest = { ...this.guest }
      this.initGuestValues()
    }
}
</script>
