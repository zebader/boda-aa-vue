<template>
    <q-page class="page__onboarding column items-start justify-start q-pa-md">
        <div class="page__onboarding__title-container column justify-center q-pb-lg q-mb-lg">
            <p class="page__onboarding__title-container__intro-text">
                Bienvenido,<br><span>{{this.guestName}}</span>
            </p>
        </div>
        <OnBoardingStepper @onboarding-stepper-finished="showFinishDialog" :externStep="step"></OnBoardingStepper>
        <q-dialog
            v-model="openDialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down">
            <q-card class="bg-primary">
                <q-toolbar class="bg-primary q-py-sm q-px-md">
                    <q-toolbar-title>
                        <span class="text-h6">Resumen y finalizar</span>
                    </q-toolbar-title>
                    <q-btn flat round icon="close" @click="closeFinishDialog"></q-btn>
                </q-toolbar>
                <q-separator />
                    <div class="page__onboarding__dialog__container column q-mb-xl q-pa-xl">
                        <p class="page__onboarding__dialog__container__intro-text">
                            Revisa tus datos antes de enviar:
                        </p>
                        <p class="page__onboarding__dialog__container__message q-mb-xl" v-html="resumeMessage"></p>
                        <div class="page__onboarding__dialog__submit-container column justify-end">
                            <q-btn
                                unelevated
                                no-caps
                                type="button"
                                color="indigo"
                                label="Finalizar y añadir acompañantes"
                                size="lg"
                                class="q-ma-sm full-width"
                                @click="submitGuestData"/>
                            <q-btn flat no-caps color="indigo" label="Atrás, revisar datos" size="md" class="q-ma-sm full-width" @click="closeFinishDialog"/>
                        </div>
                    </div>
                </q-card>
            </q-dialog>
    </q-page>

</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import './onboarding.scss'
import { GuestFinalInfoModel, Bus, Menu } from 'components/models'
import OnBoardingStepper from 'src/components/onboarding/onboarding-stepper/OnBoardingStepperComponent.vue'
import GuestService from '../../services/GuestService'
import { GuestRequest } from '../../models/GuestModels'

@Options({
  components: {
    OnBoardingStepper
  }
})
export default class OnBoardingPage extends Vue {
    step = 1

    openDialog = false

    maximizedToggle = true

    guestFinalInfo:GuestFinalInfoModel = {
      guest: { name: null, _id: null },
      menu: null,
      bus: null,
      intolerance: ''
    }

    get resumeMessage ():string {
      return `
            Mi nombre es <span>${this.guestName}</span>, confirmo que <span>asistire</span> a la boda y que:<br><br>
            Elijo el menú de <span>${this.guestFinalInfo?.menu?.label ? this.guestFinalInfo.menu.label : ''}</span>,<br>
            <span>${this.guestFinalInfo.intolerance ? 'Si tengo intolerancias, a ' + this.guestFinalInfo.intolerance : 'No tengo intolerancias'}</span><br>
            y ${this.guestFinalInfo?.bus?.category === '3' ? '<span>no necesito transporte</span>' : `Necesito transporte desde <span>${this.guestFinalInfo?.bus?.label ? this.guestFinalInfo.bus.label : ''}</span>`}
        `
    }

    get guestName () :string {
      const user = this.$store.state.wedding.user
      if (user && user?.username && user.username) return user.username
      else return 'Invitado'
    }

    get guestUserId () :string {
      const user = this.$store.state.wedding.user
      if (user && user?.id && user.id) return user.id
      else return ''
    }

    showFinishDialog (guestInfo:GuestFinalInfoModel) {
      this.guestFinalInfo = { ...guestInfo }
      if (guestInfo) this.openDialog = true
    }

    closeFinishDialog () {
      this.step = 4
      this.openDialog = false
    }

    async submitGuestData () {
      const dataToSubmit:GuestRequest = {
        name: this.guestName,
        menu: this.guestFinalInfo?.menu?.value ? this.guestFinalInfo.menu.value as Menu : null,
        bus: this.guestFinalInfo?.bus?.value ? this.guestFinalInfo.bus.value as Bus : null,
        intolerance: this.guestFinalInfo?.intolerance ? this.guestFinalInfo.intolerance : ''

      }
      const guestService:GuestService = new GuestService()
      try {
        await guestService.createGuest(dataToSubmit)

        this.$router.replace('/flyer') as Promise<void>
      } catch (error) {
        console.log('error al crear guest de usuario', error)
      }
    }

    mounted () {
      if (this.guestFinalInfo?.guest?.name) this.guestFinalInfo.guest.name = this.guestName
      if (this.guestFinalInfo?.guest?._id) this.guestFinalInfo.guest._id = this.guestUserId
    }
}
</script>
