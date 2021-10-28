<template>
    <div class="component__onboarding-stepper__container column justify-start">
        <q-stepper
            v-model="step"
            vertical
            color="indigo"
            animated
            flat
            active-color="indigo"
            active-icon="arrow_forward"
            done-color="green"
            class="bg-transparent">
            <q-step
                :name="1"
                title="Por favor, indica su nombre completo:"
                prefix="1"
                :done="step > 1" v-if="isEditMode">
                <q-input
                filled
                color="indigo"
                v-model="this.guest.name"
                stack-label
                label="Nombre completo ( 2 apellidos)*"
                class="q-mb-md"
                placeholder="Ej. Adrian Cebader Rodriguez"
                lazy-rules
                required
                :rules="[
                    val => isNameSucces(val)[0] || 'Rellena este campo'
                ]">
                <template v-slot:append v-if="isNameSucces(this.guest.name)[0]">
                    <q-icon name="check" color="green" />
                </template>
            </q-input>

                <q-stepper-navigation class="q-pt-none">
                    <q-btn @click="step = 2" color="indigo" label="Continuar" :disabled="!isNameSucces(this.guest.name)[0]"/>
                </q-stepper-navigation>
            </q-step>
            <q-step
                :name="1"
                title="¿Podras asistir a la boda?"
                prefix="1"
                :done="step > 1" v-if="!isEditMode">
                <p >La boda se celebrará el 18 de Abril de 2022 en Alcazar ...,
                Recuerda que hay transporte a tu disposición y descuentos en estancias</p>

                <q-stepper-navigation>
                    <q-btn @click="step = 2" color="indigo">
                        <div>Si</div>
                        <q-tooltip anchor="top middle" self="center middle" class="bg-transparent">
                            <img width="40" class="q-mr-sm" src="~assets/heart.png">
                        </q-tooltip>
                    </q-btn>
                    <q-btn flat @click="acceptedNo" color="indigo" label="No" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
            <q-step
                :name="2"
                title="¿Qué menú prefieres?"
                prefix="2"
                :done="step > 2">
                <q-select
                    filled
                    color="indigo"
                    lazy-rules
                    v-model="guestMenuModel"
                    :options="menuOptions"
                    label="Elige una opción"
                    options-selected-class="text-secondary">
                    <template v-slot:option="scope">
                    <q-item
                        v-bind="scope.itemProps"
                        >
                        <q-item-section avatar>
                            <img width="40" class="q-mr-sm" :src="scope.opt.icon">
                        </q-item-section>
                        <q-item-section>
                            <q-item-label v-html="scope.opt.label" />
                        </q-item-section>
                    </q-item>
                    </template>
                </q-select>

                <q-stepper-navigation>
                    <q-btn @click="step = 3" color="indigo" label="Continuar" :disabled="menuSubmitDisabled"/>
                    <q-btn flat @click="step = 1" color="indigo" label="Atrás" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
            <q-step
                :name="3"
                title="¿Tienes alguna intolerancia?"
                prefix="3"
                :done="step > 3">
                <p>Si tienes alguna intolerancia indicanos cual sino, continua:</p>
                    <q-input
                    v-model="intoleranceOption"
                    filled
                    color="indigo"
                    class="q-mt-md"
                    autogrow/>

                <q-stepper-navigation>
                    <q-btn @click="step = 4" color="indigo" label="Continuar" />
                    <q-btn flat @click="step = 2" color="indigo" label="Atrás" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
            <q-step
                :name="4"
                title="¿Necesitas transporte?"
                prefix="4"
                :done="step > 4">
                <p>Te ofrecemos la posibilidad de elegir la lanzaderaque te venga mejor gratuitamente.</p>
                    <q-select
                        filled
                        color="indigo"
                        lazy-rules
                        v-model="guestBusModel"
                        :options="busOptions"
                        label="Elige una opción"
                        options-selected-class="text-secondary">
                    <template v-slot:option="scope">
                    <q-item
                        v-bind="scope.itemProps"
                        >
                        <q-item-section avatar>
                            <img width="40" class="q-mr-sm" :src="scope.opt.icon">
                        </q-item-section>
                        <q-item-section>
                            <q-item-label v-html="scope.opt.label" />
                        </q-item-section>
                    </q-item>
                    </template>
                </q-select>
                <q-stepper-navigation>
                    <q-btn @click="submitStepper" color="indigo" label="Finalizar" :disabled="finishSubmitDisabled"/>
                    <q-btn flat @click="step = 3" color="indigo" label="Atrás" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
        </q-stepper>
    </div>
        <q-dialog v-model="openAcceptedNoDialog">
            <q-card>
                <q-card-section>
                <div class="text-h6">¿Segur@?</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <p v-html="acceptedNotMessage"></p>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Entendido" color="indigo" @click="openAcceptedNoDialog = false" />
                </q-card-actions>
            </q-card>
        </q-dialog>

</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Emit, Prop, Watch } from 'vue-property-decorator'
import './onboarding-stepper-component.scss'
import { OptionsModel, GuestFinalInfoModel, UserItem } from 'components/models'

const meatIcon: string = require('../../../assets/meat.png') as string
const fishIcon: string = require('../../../assets/fish.png') as string
const veggiIcon: string = require('../../../assets/veggi.png') as string
const veganIcon: string = require('../../../assets/vegan.png') as string
const busIcon: string = require('../../../assets/bus.png') as string
const carIcon: string = require('../../../assets/car.png') as string

export default class OnBoardingPage extends Vue {
    @Prop({ required: false, default: {}, type: Object }) externUser!:UserItem;
    @Prop({ required: false, default: 1, type: Number }) externStep!:number;
    @Prop({ required: false, default: false, type: Boolean }) isEditMode!:boolean;

    step = 1

    intoleranceOption = '';

    openAcceptedNoDialog = false;

    guestMenuModel:OptionsModel = {
      label: null,
      value: null,
      category: null,
      icon: null
    }

    guestBusModel:OptionsModel = {
      label: null,
      value: null,
      category: null,
      icon: null
    }

    guest:UserItem = {
      accepted: 'waiting',
      _id: null,
      name: null,
      menu: null,
      intolerance: '',
      bus: null
    };

    @Watch('externStep')
    updateStep (newValue: number) {
      this.step = newValue
    }

    get menuOptions ():OptionsModel[] {
      return [
        {
          label: 'Carne',
          value: 'carne',
          category: '1',
          icon: meatIcon
        },
        {
          label: 'Pescado',
          value: 'pescado',
          category: '2',
          icon: fishIcon
        },
        {
          label: 'Vegetariano',
          value: 'vegetariano',
          category: '3',
          icon: veggiIcon
        },
        {
          label: 'Vegano',
          value: 'vegano',
          category: '3',
          icon: veganIcon
        }
      ]
    }

    get busOptions ():OptionsModel[] {
      return [
        {
          label: 'Manoteras',
          value: 'manoteras',
          description: 'Podrás consular mas datos cuando termines',
          category: '1',
          icon: busIcon
        },
        {
          label: 'Alcazar de San Juan',
          value: 'alcazar',
          description: 'Calle desde donde saldría',
          category: '2',
          icon: busIcon
        },
        {
          label: 'No necesito',
          value: 'ninguno',
          description: 'Calle desde donde saldría',
          category: '3',
          icon: carIcon
        }
      ]
    }

    get menuSubmitDisabled ():boolean {
      return !this.guestMenuModel.value
    }

    get finishSubmitDisabled ():boolean {
      return !this.guestBusModel.value
    }

    get acceptedNotMessage ():string {
      return `<p>Nos pone muy tristes que no puedas acudir a la boda, cualquier cambio de opinion siempre podras acceder otra vez y continuar dándole al SI :D<p>`
    }

    @Emit('onboarding-stepper-finished')
    submitStepper ():GuestFinalInfoModel {
      this.step = 5
      return {
        guest: { name: this.guest.name, _id: this.guest._id as string },
        menu: this.guestMenuModel,
        bus: this.guestBusModel,
        intolerance: this.intoleranceOption
      }
    }

    isNameSucces (val: string | null): boolean[] {
      return [!!(val && val.length > 0)]
    }

    initGuestData ():void {
      this.guest = { ...this.externUser }
      if (this.guest?._id) {
        this.guestMenuModel = this.menuOptions.filter(option => option.value === this.guest.menu)[0]
        this.guestBusModel = this.busOptions.filter(option => option.value === this.guest.bus)[0]
        this.intoleranceOption = this.guest.intolerance ? this.guest.intolerance : this.intoleranceOption
      }
    }

    acceptedNo () {
      this.step = 1
      this.openAcceptedNoDialog = true
    }

    created () {
      this.initGuestData()
    }
}
</script>
