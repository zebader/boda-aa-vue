<template>
    <div class="full-width component__home-options-expansion">
        <q-list class="component__home-options-expansion__list-container">
            <div v-for="(item,index) in optionItems" :key="item.id">
                <q-expansion-item class="component__home-options-expansion__list-container__list-item" header-class="text-indigo" :default-opened="item.default">
                    <template v-slot:header>
                        <q-item-section avatar>
                            <q-icon :name="item.icon" />
                        </q-item-section>
                        <q-item-section class="component__home-options-expansion__list-container__list-item__section">
                            <q-item-label>{{item.title}}</q-item-label>
                            <q-item-label caption>{{item.subtitle}}</q-item-label>
                        </q-item-section>
                    </template>
                    <div class="q-mx-sm ">
                        <div v-if="item.name === 'preferences'">
                            <div v-for="guest in guestsList" :key="guest.id" class="q-pa-sm">
                                <HomeOptionsCardComponent :guest="guest" @open-edit-guest-dialog="updateGuestData" @open-delete-guest-dialog="updateGuestDataForDelete"></HomeOptionsCardComponent>
                            </div>
                            <div class="column q-pa-sm">
                            <transition
                                appear
                                enter-active-class="animated rubberBand component__home-options-expansion__animation">
                                    <q-btn
                                        unelevated
                                        icon="person_add"
                                        no-caps
                                        type="submit"
                                        color="indigo"
                                        size="lg"
                                        class="q-ma-sm full-width"
                                        :label="addGuestButtonLabel"
                                        @click="openDialog = true"/>
                            </transition>
                            </div>
                        </div>
                    </div>
                </q-expansion-item>
                <q-separator v-if="showSeparator(index)"/>
            </div>
        </q-list>
    </div>
            <q-dialog
            v-model="openDialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down">
            <q-card class="bg-primary">
                <q-toolbar class="bg-primary q-py-sm q-px-md">
                    <q-toolbar-title>
                        <span class="text-h6">{{dialogTitle}}</span>
                    </q-toolbar-title>
                    <q-btn flat round icon="close" @click="closeFinishDialog"></q-btn>
                </q-toolbar>
                <q-separator />
                <div class="component__home-options-expansion__dialog">
                    <OnBoardingStepperComponent @onboarding-stepper-finished="manageGuestData" :isEditMode="true" :externUser="guest"></OnBoardingStepperComponent>
                </div>
                </q-card>
            </q-dialog>
            <q-dialog v-model="openAlertDeleteGuest">
                <q-card>
                    <q-card-section>
                    <div class="text-h6">Eliminar acompañante</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <p v-html="removeGuestMessage"></p>
                    </q-card-section>

                    <q-card-actions align="right">
                    <q-btn flat label="Eliminar" color="indigo" @click="removeGuest" />
                    <q-btn flat label="No" color="indigo" @click="closeAlertDeleteGuest" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import HomeOptionsCardComponent from 'components/home/home-options-card/HomeOptionsCardComponent.vue'
import OnBoardingStepperComponent from 'components/onboarding/onboarding-stepper/OnBoardingStepperComponent.vue'
import './home-options-expansion.scss'
import { OptionItem, GuestItem, GuestFinalInfoModel } from 'components/models'

@Options({
  components: { HomeOptionsCardComponent, OnBoardingStepperComponent }
})
export default class HomeOptionsExpansionComponent extends Vue {
    guestsList:Array<GuestItem> = [];
    openDialog = false;
    maximizedToggle = true;
    openAlertDeleteGuest = false;

    guest:GuestItem = {
      accepted: false,
      id: null,
      name: null,
      intolerance: null,
      menu: null,
      bus: null
    };

    get optionItems () : Array<OptionItem> {
      return [
        {
          id: 0,
          name: 'preferences',
          icon: 'family_restroom',
          title: 'Preferencias',
          subtitle: 'Añade acompañantes y edita preferencias',
          default: true
        },
        {
          id: 1,
          name: 'locations',
          icon: 'bed',
          title: 'Estancias',
          subtitle: 'Hoteles con descuento',
          default: false
        }
      ]
    }

    get addGuestButtonLabel ():string {
      return 'Añadir acompañantes'
    }

    get dialogTitle ():string {
      return this.guest?.id && this.guest?.name ? `Editar datos de ${this.guest.name}` : 'Anadir acompañante'
    }

    get removeGuestMessage () :string {
      return this.guest?.name ? `<p>¿Eliminar a <strong>${this.guest.name}</strong>?<p>` : ''
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
          name: 'Jesus Cebader Rodriguez',
          intolerance: 'Apio',
          menu: 'vegetariano', // aqui molaria un enum
          bus: 'manoteras'
        }
      ]

      this.guestsList = [...fetchedUser]
    }

    closeFinishDialog () {
      this.resetGuestData()
      this.openDialog = false
    }

    searchAndReplaceGuest (guestInfo:GuestFinalInfoModel) {
      const guestId = guestInfo?.guest?.id && guestInfo.guest.id
      const index = this.guestsList.map(guest => guest.id).indexOf(guestId as string)
      this.guestsList.splice(index, 1, {
        accepted: true,
        id: String(guestId),
        name: guestInfo?.guest?.name ? guestInfo.guest.name : '',
        intolerance: guestInfo.intolerance,
        menu: guestInfo.menu?.value ? guestInfo.menu.value : '',
        bus: guestInfo.bus?.value ? guestInfo.bus.value : ''
      })
    }

    removeGuest () {
      const guestId = this.guest?.id && this.guest.id
      const index = this.guestsList.map(guest => guest.id).indexOf(guestId as string)
      this.guestsList.splice(index, 1)
      this.resetGuestData()
      this.openAlertDeleteGuest = false
    }

    closeAlertDeleteGuest () {
      this.resetGuestData()
      this.openAlertDeleteGuest = false
    }

    addNewGuest (guestInfo:GuestFinalInfoModel) {
      this.guestsList.push({
        accepted: true,
        id: String(this.guestsList.length + 1),
        name: guestInfo?.guest?.name ? guestInfo.guest.name : '',
        intolerance: guestInfo.intolerance,
        menu: guestInfo.menu?.value ? guestInfo.menu.value : '',
        bus: guestInfo.bus?.value ? guestInfo.bus.value : ''
      })
    }

    resetGuestData () {
      this.guest = {
        accepted: false,
        id: null,
        name: null,
        intolerance: null,
        menu: null,
        bus: null
      }
    }

    manageGuestData (guestInfo:GuestFinalInfoModel) {
      guestInfo?.guest?.id ? this.searchAndReplaceGuest(guestInfo) : this.addNewGuest(guestInfo)
      this.resetGuestData()
      this.openDialog = false
    }

    updateGuestData (editGuest:GuestItem) {
      this.guest = editGuest
      this.openDialog = true
    }

    updateGuestDataForDelete (editGuest:GuestItem) {
      this.guest = editGuest
      this.openAlertDeleteGuest = true
    }

    mounted () {
      this.fetchGuestsList()
    }
}
</script>
