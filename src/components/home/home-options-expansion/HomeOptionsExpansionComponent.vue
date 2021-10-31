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
                                        type="button"
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
import { OptionItem, UserItem, GuestFinalInfoModel, Menu, Bus } from 'components/models'
import { GuestResponse } from '../../../models/GuestModels'
import AuthManager from 'src/lib/AuthManager'
import GuestService from '../../../services/GuestService'

@Options({
  components: { HomeOptionsCardComponent, OnBoardingStepperComponent }
})
export default class HomeOptionsExpansionComponent extends Vue {
    guestsList:Array<GuestResponse> = [];
    openDialog = false;
    maximizedToggle = true;
    openAlertDeleteGuest = false;

    guest:UserItem = {
      accepted: 'waiting',
      _id: null,
      name: null,
      intolerance: '',
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
      return this.guest?._id && this.guest?.name ? `Editar datos de ${this.guest.name}` : 'Anadir acompañante'
    }

    get removeGuestMessage () :string {
      return this.guest?.name ? `<p>¿Eliminar a <strong>${this.guest.name}</strong>?<p>` : ''
    }

    showSeparator (index:number):boolean {
      return index < this.optionItems.length - 1
    }

    setGuestsList () {
      if ('$user' in this && this.$user?.guests && this.$user.guests.length > 0) this.guestsList = [...this.$user.guests]
      else if (AuthManager.getInstance().user) {
        const user = AuthManager.getInstance().user
        const guests = user?.guests && user.guests.length > 0 ? user.guests : []
        this.guestsList = [...guests]
      }
    }

    closeFinishDialog () {
      this.resetGuestData()
      this.openDialog = false
    }

    async searchAndReplaceGuest (guestInfo:GuestFinalInfoModel) {
      const guestId = guestInfo?.guest?._id && guestInfo.guest._id
      const index = this.guestsList.map(guest => guest._id).indexOf(guestId as string)
      const guestInfoToSend = {
        _id: String(guestId),
        name: guestInfo?.guest?.name ? guestInfo.guest.name : null,
        intolerance: guestInfo.intolerance,
        menu: guestInfo.menu?.value ? guestInfo.menu.value as Menu : null,
        bus: guestInfo.bus?.value ? guestInfo.bus.value as Bus : null
      }

      await this.updateGuest(guestInfoToSend)
      this.guestsList.splice(index, 1, guestInfoToSend)
    }

    async removeGuest () {
      const guestId = this.guest?._id && this.guest._id
      const index = this.guestsList.map(guest => guest._id).indexOf(guestId as string)
      this.guestsList.splice(index, 1)
      this.resetGuestData()
      await this.deleteGuest(guestId as string)
      this.openAlertDeleteGuest = false
    }

    closeAlertDeleteGuest () {
      this.resetGuestData()
      this.openAlertDeleteGuest = false
    }

    async addNewGuest (guestInfo:GuestFinalInfoModel) {
      const guestId = guestInfo?.guest?._id && guestInfo.guest._id
      const guestInfoToSend = {
        _id: guestId,
        name: guestInfo?.guest?.name ? guestInfo.guest.name : '',
        intolerance: guestInfo.intolerance,
        menu: guestInfo.menu?.value ? guestInfo.menu.value as Menu : null,
        bus: guestInfo.bus?.value ? guestInfo.bus.value as Bus : null
      }

      this.guestsList.push(guestInfoToSend)
      await this.createGuest(guestInfoToSend)
    }

    resetGuestData () {
      this.guest = {
        accepted: 'waiting',
        _id: null,
        name: null,
        intolerance: '',
        menu: null,
        bus: null
      }
    }

    async manageGuestData (guestInfo:GuestFinalInfoModel) {
      guestInfo?.guest?._id ? await this.searchAndReplaceGuest(guestInfo) : await this.addNewGuest(guestInfo)
      this.resetGuestData()
      this.openDialog = false
    }

    updateGuestData (editGuest:UserItem) {
      this.guest = editGuest
      this.openDialog = true
    }

    updateGuestDataForDelete (editGuest:UserItem) {
      this.guest = editGuest
      this.openAlertDeleteGuest = true
    }

    async updateGuest (guest:GuestResponse) {
      if (!guest._id) return
      const { name, menu, bus, intolerance, _id } = guest
      const guestService:GuestService = new GuestService()
      try {
        const response = await guestService.updateGuest(_id, { name, menu, bus, intolerance })
        console.log('guest actualizado,', response)
      } catch (error) {
        console.log('error al actualizar guest', error)
      }
    }

    async createGuest (guest:GuestResponse) {
      if (guest._id) return
      const { name, menu, bus, intolerance } = guest
      const guestService:GuestService = new GuestService()
      try {
        const response = await guestService.createGuest({ name, menu, bus, intolerance })
        console.log('guest creado,', response)
      } catch (error) {
        console.log('error al crear guest', error)
      }
    }

    async deleteGuest (guestId:string) {
      if (!guestId) return
      const guestService:GuestService = new GuestService()
      try {
        await guestService.deleteGuest(guestId)
        console.log('guest eliminado')
      } catch (error) {
        console.log('error al eliminar guest', error)
      }
    }

    mounted () {
      this.setGuestsList()
    }
}
</script>
