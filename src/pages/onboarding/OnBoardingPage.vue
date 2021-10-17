<template>
    <q-page class="page__onboarding column items-start justify-start q-pa-md">
        <div class="page__onboarding__title-container column justify-center q-pb-lg q-mb-lg">
            <p class="page__onboarding__title-container__intro-text">
                Bienvenido,<br><span>Jesus Cebader Rodriguez</span>
            </p>
        </div>
        <div class="page__onboarding__stepper-container column justify-start">
            <p class="page__onboarding__stepper-container__intro-text">
                Por favor  sigue los <span>4 pasos</span> siguientes para ayudarnos a organizarlo todo:
            </p>
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
                    title="¿Podras asistir a la boda?"
                    prefix="1"
                    :done="step > 1">
                    <p>La boda se celebrará el 18 de Abril de 2022 en Alcazar ...,
                    Recuerda que hay transporte a tu disposición y descuentos en estancias</p>

                    <q-stepper-navigation>
                        <q-btn @click="step = 2" color="indigo">
                            <div>Si</div>
                            <q-tooltip anchor="top middle" self="center middle" class="bg-transparent">
                                <img width="40" class="q-mr-sm" src="~assets/heart.png">
                            </q-tooltip>
                        </q-btn>
                        <q-btn flat @click="step = 1" color="indigo" label="No" class="q-ml-sm" />
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
                            v-on="scope.itemEvents">
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
                            v-on="scope.itemEvents">
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
                        <q-btn @click="showFinishDialog" color="indigo" label="Finalizar" :disabled="finishSubmitDisabled"/>
                        <q-btn flat @click="step = 3" color="indigo" label="Atrás" class="q-ml-sm" />
                    </q-stepper-navigation>
                </q-step>
            </q-stepper>
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
                        type="submit"
                        color="indigo"
                        label="Finalizar y añadir acompañantes"
                        size="lg"
                        class="q-ma-sm full-width"
                        to="/flyer"/>
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
import { OptionsModel } from 'components/models'

const meatIcon: string = require('../../assets/meat.png') as string
const fishIcon: string = require('../../assets/fish.png') as string
const veggiIcon: string = require('../../assets/veggi.png') as string
const veganIcon: string = require('../../assets/vegan.png') as string
const busIcon: string = require('../../assets/bus.png') as string
const carIcon: string = require('../../assets/car.png') as string

@Options({})
export default class OnBoardingPage extends Vue {
    step = 1

    intoleranceOption:string | null = null;

    openDialog = false

    maximizedToggle = true

    guestMenuModel:OptionsModel = {
      label: null,
      value: null,
      description: null,
      category: null,
      icon: null
    }

    guestBusModel:OptionsModel = {
      label: null,
      value: null,
      description: null,
      category: null,
      icon: null
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
          value: 'no necesito',
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

    get resumeMessage ():string {
      return `
            Mi nombre es [Jesus Cebader Rodriguez], confirmo que <span>asistire</span> a la boda y que:<br><br>
            Elijo el menú de <span>${this.guestMenuModel.label ? this.guestMenuModel.label : ''}</span>,<br>
            <span>${this.intoleranceOption ? 'Si tengo intolerancias, a ' + this.intoleranceOption : 'No tengo intolerancias'}</span><br>
            y ${this.guestBusModel.category === '3' ? '<span>no necesito transporte</span>' : `Necesito transporte desde <span>${this.guestBusModel.label ? this.guestBusModel.label : ''}</span>`}
        `
    }

    showFinishDialog () {
      this.step = 5
      this.openDialog = true
    }

    closeFinishDialog () {
      this.step = 4
      this.openDialog = false
    }
}
</script>
