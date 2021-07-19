<template>
    <div class="full-width component__home-options-expansion">
        <q-list class="component__home-options-expansion__list-container">
            <div v-for="(item,index) in optionItems" :key="item.id">
                <q-expansion-item class="component__home-options-expansion__list-container__list-item" :default-opened="item.default">
                    <template v-slot:header>
                        <q-item-section avatar>
                            <q-icon :name="item.icon" color="secondary" />
                        </q-item-section>
                        <q-item-section class="component__home-options-expansion__list-container__list-item__section">
                            <q-item-label>{{item.title}}</q-item-label>
                            <q-item-label caption>{{item.subtitle}}</q-item-label>
                        </q-item-section>
                    </template>
                    <div class="q-mx-lg q-mb-lg">
                        <div v-if="item.name === 'preferences'">
                            <div v-for="guest in guestsList" :key="guest.name" >
                                <HomeOptionsCardComponent :guest="guest" edit-guest="updateGuest"></HomeOptionsCardComponent>
                            </div>
                            <div class="column q-pa-sm">
                                <div>
                                    <p class="text-italic">{{addRelativeText}}</p>
                                </div>
                                <q-btn unelevated color="secondary" icon="person_add" :label="addRelativeButtonLabel" @click="addRelativeDialog = true" />
                            </div>
                        </div>
                    </div>
                </q-expansion-item>
                <q-separator v-if="showSeparator(index)"/>
            </div>
        </q-list>
    </div>
    <q-dialog
      v-model="addRelativeDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary">

        <q-toolbar class="bg-primary q-py-sm q-px-md">
            <q-toolbar-title>
                <span class="text-h6">Añadir Familiar/invitado</span>
            </q-toolbar-title>

            <q-btn flat round icon="close" v-close-popup></q-btn>
        </q-toolbar>
        <q-separator />

        <div class="component__home-options-expansion__dialog">

        <q-card-section class="q-pt-lg">
          Por favor, añade los datos de los familiares que no esten en tu lista o a tu invitad@:
        </q-card-section>
        <q-card-section>
            <q-form
                @submit="addRelativeOnSubmit"
                @reset="addRelativeOnReset"
                autocorrect="off"
                autocapitalize="off"
                autocomplete="off"
                spellcheck="false"
                class="q-gutter-md"
                >
                <q-input
                    rounded outlined
                    bg-color="white"
                    v-model="relative.name"
                    label="¿Cual es su nombre?"
                    hint="Nombre y apellidos"
                    lazy-rules
                    color="secondary"
                    :rules="[ val => val && val.length > 0 || 'Añade un nombre, por favor']"
                />
                <q-checkbox left-label v-model="relative.accepted" label="¿Viene a la boda?" color="secondary"/>

                <div>
                    <q-btn label="Submit" type="submit" color="secondary" unelevated/>
                    <q-btn label="Reset" type="reset" color="secondary" flat class="q-ml-sm" />
                </div>
            </q-form>
        </q-card-section>
          </div>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import HomeOptionsCardComponent from 'components/home/home-options-card/HomeOptionsCardComponent.vue'
import './home-options-expansion.scss'
import { OptionItem, GuestItem } from 'components/models'

@Options({
  components: { HomeOptionsCardComponent }
})
export default class HomeOptionsExpansionComponent extends Vue {
    guestsList:Array<GuestItem> = [];
    addRelativeDialog= false;
    maximizedToggle= true;
    relative:GuestItem = {
      accepted: false,
      id: null,
      name: null,
      menu: null,
      bus: null,
      formFilled: false
    };

    get optionItems () : Array<OptionItem> {
      return [
        {
          id: 0,
          name: 'preferences',
          icon: 'restaurant',
          title: 'Preferencias de tu familia',
          subtitle: 'Elige menu, si necesitas autobus, etc..',
          default: true
        },
        {
          id: 1,
          name: 'locations',
          icon: 'bed',
          title: 'Estancias',
          subtitle: 'Los mejores hoteles',
          default: false
        }
      ]
    }

    get addRelativeButtonLabel ():string {
      return 'Add Relative'
    }

    get addRelativeText ():string {
      return 'Missing someone? Please add them here:'
    }

    showSeparator (index:number):boolean {
      return index < this.optionItems.length - 1
    }

    // TODO remove mocks
    fetchGuestsList () {
      const fetchedUser:GuestItem[] = [
        {
          accepted: true,
          id: '1',
          name: 'Jesus Cebader',
          menu: 'vegetariano', // aqui molaria un enum
          bus: 'Manoteras',
          formFilled: true
        }
      ]
      const fetchedUserRelatives:GuestItem[] = [
        {
          accepted: true,
          id: '2',
          name: 'Raquel Navarro',
          menu: '', // aqui molaria un enum
          bus: null,
          formFilled: false
        }
      ]

      this.guestsList = [...fetchedUser, ...fetchedUserRelatives]
    }

    addRelativeOnSubmit () {
      if (!this.relative.name) return
      this.addRelativeDialog = false
      this.guestsList.push(this.relative)
      this.addRelativeOnReset()
    }

    addRelativeOnReset () {
      this.relative = {
        accepted: false,
        id: null,
        name: null,
        menu: null,
        bus: null,
        formFilled: false
      }
    }

    updateGuest (editedGuest:GuestItem) {
      const index:number = this.guestsList.findIndex((el) => el.id === editedGuest.id)
      if (index >= 0) this.guestsList[index] = editedGuest
      console.log('user updated')
    }

    mounted () {
      this.fetchGuestsList()
    }
}
</script>
