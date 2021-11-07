<template>
    <div class="full-width component__home-options-expansion">
        <div class="q-mx-sm ">
            <div v-for="guest in guestsList" :key="guest._id" class="q-pa-sm">
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
import { UserItem, GuestFinalInfoModel, Menu, Bus } from 'components/models'
import { GuestResponse } from '../../../models/GuestModels'

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

    get addGuestButtonLabel ():string {
      return 'Añadir acompañantes'
    }

    get dialogTitle ():string {
      return this.guest?._id && this.guest?.name ? `Editar datos de ${this.guest.name}` : 'Anadir acompañante'
    }

    get removeGuestMessage () :string {
      return this.guest?.name ? `<p>¿Eliminar a <strong>${this.guest.name}</strong>?<p>` : ''
    }

    setGuestsList () {
      const user = this.$store.state.wedding.user
      if (user && user?.guests && user.guests.length > 0) this.guestsList = [...user.guests]
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

      try {
        await this.$store.dispatch('wedding/updateGuest', { _id, guest: { name, menu, bus, intolerance } })
      } catch (error) {
        console.log(error)
      }
    }

    async createGuest (guest:GuestResponse) {
      if (guest._id) return
      const { name, menu, bus, intolerance } = guest
      try {
        await this.$store.dispatch('wedding/createGuest', { name, menu, bus, intolerance })
      } catch (error) {
        console.log(error)
      }
    }

    async deleteGuest (guestId:string) {
      if (!guestId) return
      try {
        await this.$store.dispatch('wedding/deleteGuest', guestId)
      } catch (error) {
        console.log(error)
      }
    }

    mounted () {
      this.setGuestsList()
    }
}
</script>
