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
            done-color="positive"
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
                label="Nombre completo (2 apellidos)*"
                class="q-mb-md"
                placeholder="Ej. Adrian Cebader Rodriguez"
                lazy-rules
                required
                :rules="[
                    val => isNameSucces(val)[0] || 'Rellena este campo'
                ]">
                <template v-slot:append v-if="isNameSucces(this.guest.name)[0]">
                    <q-icon name="check" color="positive" />
                </template>
            </q-input>

                <q-stepper-navigation class="q-pt-none">
                    <q-btn unelevated @click="step = 2" color="indigo" label="Continuar" :disabled="!isNameSucces(this.guest.name)[0]"/>
                </q-stepper-navigation>
            </q-step>
            <q-step
                :name="1"
                title="¿Podras asistir a la boda?"
                prefix="1"
                :done="step > 1" v-if="!isEditMode">
                <p class="text-secondary">La boda se celebrará el <a class="component__onboarding-stepper__container__link" href="https://quintamonteguerra.com/en/location-html" target="_blank">30 de Abril de 2022 en Alcazar de San Juan, Quinta Monteguerra</a>,
                Recuerda que hay transporte a tu disposición de Alcazar a la finca y descuentos en estancias</p>

                <q-stepper-navigation>
                    <q-btn unelevated @click="step = 2" color="indigo">
                        <div>Si</div>
                        <q-tooltip anchor="top middle" self="center middle" class="bg-transparent">
                            <img width="40" class="q-mr-sm" src="~assets/heart.png">
                        </q-tooltip>
                    </q-btn>
                    <q-btn unelevated flat @click="acceptedNo" color="indigo" label="No" class="q-ml-sm" />
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
                            <img width="30" class="q-mr-sm" :src="scope.opt.icon">
                        </q-item-section>
                        <q-item-section>
                            <q-item-label v-html="scope.opt.label" />
                        </q-item-section>
                    </q-item>
                    </template>
                </q-select>

                <q-stepper-navigation>
                    <q-btn unelevated @click="step = 3" color="indigo" label="Continuar" :disabled="menuSubmitDisabled"/>
                    <q-btn unelevated flat @click="step = 1" color="indigo" label="Atrás" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
            <q-step
                :name="3"
                title="¿Sufres alguna intolerancia o similar?"
                prefix="3"
                :done="step > 3">
                    <q-btn unelevated @click="manageIntoleranceInput('yes')" color="indigo" label="Si" />
                    <q-btn unelevated @click="manageIntoleranceInput('no')" color="indigo" label="No" class="q-ml-sm" />
                    <q-btn unelevated flat
                        @click="() => {
                            step = 2
                            intoleranceInputDisabled = true
                            } "
                            color="indigo" label="Atrás" class="q-ml-sm" v-if="intoleranceInputDisabled"/>
                    <div v-show="!intoleranceInputDisabled" class="q-mt-md">
                        <p class="text-secondary">Danos mas informacion y nos adaptaremos a tus necesidades:</p>

                        <q-input
                            v-model="intoleranceOption"
                            filled
                            color="indigo"
                            class="q-mt-md"
                            :rules="[val => !!val || 'Recuerda rellenar este campo']"
                            autogrow/>

                        <q-stepper-navigation>
                            <q-btn unelevated @click="step = 4" color="indigo" label="Continuar" :disabled="!intoleranceOption"/>
                            <q-btn unelevated flat
                            @click="() => {
                                step = 2
                                intoleranceInputDisabled = true
                                } "
                                color="indigo" label="Atrás" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </div>
            </q-step>
            <q-step
                :name="4"
                title="¿Necesitas transporte de Alcazar a la finca?"
                prefix="4"
                :done="step > 4">
                <p class="text-secondary">Ponemos un autobus gratuito para ir de Alcazar a la finca</p>
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
                             <q-item-label v-if="scope.opt.description" caption v-html="scope.opt.description"></q-item-label>
                        </q-item-section>
                    </q-item>
                    </template>
                </q-select>
                <q-stepper-navigation>
                    <q-btn unelevated @click="submitStepper" color="indigo" label="Finalizar" :disabled="finishSubmitDisabled"/>
                    <q-btn unelevated flat @click="step = 3" color="indigo" label="Atrás" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
        </q-stepper>
    </div>
        <q-dialog v-model="openAcceptedNoDialog">
            <q-card>
                <q-card-section>
                <div class="text-h6 text-indigo">¿Segur@?</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <p v-html="acceptedNotMessage"></p>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat unelevated label="Entendido" color="indigo" @click="openAcceptedNoDialog = false" />
                </q-card-actions>
            </q-card>
        </q-dialog>

</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Emit, Prop, Watch } from 'vue-property-decorator'
import './onboarding-stepper-component.scss'
import { OptionsModel, GuestFinalInfoModel, UserItem } from 'components/models'

// const meatIcon: string = require('../../../assets/meat.png') as string
const fishIcon: string = require('../../../assets/fishmeat.png') as string
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

    intoleranceInputDisabled = true

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
        /*         {
          label: 'Carne',
          value: 'carne',
          category: '1',
          icon: meatIcon
        }, */
        {
          label: 'Carne y Pescado',
          value: 'animal',
          category: '1',
          icon: fishIcon
        },
        {
          label: 'Vegetariano',
          value: 'vegetariano',
          category: '2',
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
        /*         {
          label: 'Manoteras',
          value: 'manoteras',
          description: 'Podrás consular mas datos cuando termines',
          category: '1',
          icon: busIcon
        }, */
        {
          label: 'Alcazar de San Juan',
          value: 'alcazar',
          description: 'Salida: Plaza toros Alcazar -> Finca (ida y vuelta)',
          category: '1',
          icon: busIcon
        },
        {
          label: 'No necesito',
          value: 'ninguno',
          description: '',
          category: '2',
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
      return '<p>Nos pone muy tristes que no puedas acudir a la boda, cualquier cambio de opinion siempre podras acceder otra vez y continuar dándole al SI :D<p>'
    }

    @Emit('onboarding-stepper-finished')
    submitStepper ():GuestFinalInfoModel {
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

    manageIntoleranceInput (answer:'yes' | 'no') {
      if (answer === 'yes') {
        this.intoleranceInputDisabled = false
      } else {
        this.intoleranceInputDisabled = true
        this.intoleranceOption = ''
        this.step = 4
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
