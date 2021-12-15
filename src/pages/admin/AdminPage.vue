<template>
  <q-page class="page__admin column items-center justify-start">
      <q-table
            flat
            :rows="guests"
            :columns="columns"
            row-key="_id"
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
            class="full-width bg-transparent my-sticky-header-table">
            <template v-slot:top-left>
                <div class="row justify-center items-center q-my-sm">
                    <q-img src="~assets/logo-boda-aa.png" width="40px" height="40px"/>
                    <h6 class="q-mx-lg q-my-none">Admin. de invitados</h6>
                </div>
            </template>
            <template v-slot:top-right>
                <q-input
                    v-model="text"
                    clearable
                    outlined
                    rounded
                    dense
                    placeholder="Busca por nombre"
                    style="min-width:300px;"/>
                <q-btn color="secondary" flat dense @click="openEditGuest(null)" class="q-mx-sm">
                    <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="person_add" />
                            <p class="q-ma-none">Añadir</p>
                    </div>
                </q-btn>
                <q-btn color="secondary" flat dense @click="openResumeDialog = true" class="q-mx-sm">
                    <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="assignment" />
                            <p class="q-ma-none">Resumen</p>
                    </div>
                </q-btn>
                <q-btn flat dense color="indigo" @click="exportTable" class="q-mx-sm">
                <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="archive" />
                            <p class="q-ma-none">CVS</p>
                    </div>
                </q-btn>
                <q-btn color="secondary" flat dense @click="doLogout" class="q-mx-sm">
                    <div class="column items-center justify-center q-ma-sm">
                            <q-icon name="logout" />
                            <p class="q-ma-none">Salir</p>
                    </div>
                </q-btn>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props" auto-width>
                        <div v-if="col.name === 'actions'">
                            <q-btn class="q-mr-sm" color="indigo" round unelevated outline icon="delete" size="sm" @click="openDeleteGuest(props.row)"/>
                            <q-btn color="indigo" round unelevated outline icon="edit" size="sm" @click="openEditGuest(props.row)"/>
                        </div>
                        <template v-else>
                        {{col.value}}
                        </template>
                    </q-td>
                </q-tr>
            </template>
            </q-table>
  </q-page>
      <q-dialog v-model="openResumeDialog">
        <q-card flat unelevated>
        <q-toolbar class="q-py-sm q-px-md">
            <q-toolbar-title>
                <span class="text-h6 text-indigo">Resumen</span>
            </q-toolbar-title>

            <q-btn flat round icon="close" color="secondary" v-close-popup></q-btn>
        </q-toolbar>
        <div class="q-pa-md" style="min-width:300px;">
            <p>Numero de invitados: <strong>{{guests.length}}</strong></p>
            <p class="text-bold">Menu</p>
            <ul>
                <li>Animal: <strong>{{guests.filter(guest => guest.menu === "animal").length}}</strong></li>
                <li>Vegetariano: <strong>{{guests.filter(guest => guest.menu === "vegetariano").length}}</strong></li>
                <li>Vegano: <strong>{{guests.filter(guest => guest.menu === "vegano").length}}</strong></li>
            </ul>
            <p class="text-bold">Bus</p>
            <ul>
                <li>Necesita bus: <strong>{{guests.filter(guest => guest.bus === "alcazar").length}}</strong></li>
                <li>No necesito bus: <strong>{{guests.filter(guest => guest.bus === "ninguno").length}}</strong></li>
            </ul>
        </div>
        </q-card>
    </q-dialog>

    <q-dialog v-model="openAlertDeleteGuest">
        <q-card>
            <q-card-section>
            <div class="text-h6 text-indigo">Eliminar acompañante</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <p v-html="removeGuestMessage"></p>
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="Eliminar" color="indigo" @click="deleteGuest" />
            <q-btn flat label="No" color="indigo" @click="this.openAlertDeleteGuest = false, this.currentGuestToEdit = null" />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-dialog
        v-model="openDialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down">
        <q-card class="bg-primary">
            <q-toolbar class="bg-primary q-py-sm q-px-md">
                <q-toolbar-title>
                    <span class="text-h6 text-indigo">{{dialogTitle}}</span>
                </q-toolbar-title>
                <q-btn flat round icon="close" color="secondary" @click="closeFinishDialog"></q-btn>
            </q-toolbar>
            <q-separator />
            <div class="component__home-options-expansion__dialog">
                <OnBoardingStepperComponent @onboarding-stepper-finished="manageGuestData" :isEditMode="true" :externUser="currentGuestToEdit"></OnBoardingStepperComponent>
            </div>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { GuestResponse } from 'src/models/GuestModels'
import { GuestFinalInfoModel, Menu, Bus } from 'components/models'
import { exportFile } from 'quasar'
import OnBoardingStepperComponent from 'components/onboarding/onboarding-stepper/OnBoardingStepperComponent.vue'
import './admin.scss'

export interface GuestResponseCustom extends GuestResponse {
    username?: string | null,
    email?: string | null,
    phone?: string | null,
    actions?: string | null,
}

export type Field = 'name' | 'menu' | 'bus' | 'intolerance' | 'username' | 'email' | 'phone' | 'actions';

export type Column = {
    name:string,
    align?:string,
    label:string,
    field:Field | null,
    sortable?:boolean
}
@Options({
  components: { OnBoardingStepperComponent }
})
export default class AdminPage extends Vue {
    guests:GuestResponseCustom[] = []
    initialGuests:GuestResponseCustom[] = []
    openResumeDialog = false;
    openAlertDeleteGuest = false;
    openDialog = false;
    maximizedToggle = true;
    currentGuestToEdit:GuestResponseCustom | null = null
    text = '';

    pagination = {
      rowsPerPage: 0
    }

    @Watch('text')
    updateGuestsList (text: string) {
      this.guests = [...this.initialGuests]

      if (text === '' || !text) this.guests = [...this.initialGuests]
      else {
        this.guests = this.guests.filter(guest => guest.name?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
      }
    }

    get columns ():Column[] {
      return [
        /* { name: 'actions', align: 'left', label: ' ', field: null }, */
        { name: 'name', align: 'left', label: 'Nombre', field: 'name', sortable: true },
        { name: 'menu', align: 'left', label: 'Menu', field: 'menu', sortable: true },
        { name: 'bus', align: 'left', label: 'Bus', field: 'bus', sortable: true },
        { name: 'intolerance', align: 'left', label: 'Intolerancia', field: 'intolerance' },
        { name: 'user', align: 'left', label: 'Invitado por', field: 'username', sortable: true },
        { name: 'email', align: 'left', label: 'Contacto', field: 'email', sortable: true },
        { name: 'phone', align: 'left', label: 'Teléfono', field: 'phone' },
        { name: 'actions', align: 'left', label: 'Acciones', field: 'actions' }]
    }

    async mounted () {
      try {
        await this.fetchGuests()
      } catch (error) {
        console.log(error)
      }
    }

    async fetchGuests () {
      await this.$store.dispatch('wedding/getAllGuests')
      if (this.$store.state.wedding.guests && this.$store.state.wedding.guests.length > 0) {
        this.guests = [...this.guestsTransformation(this.$store.state.wedding.guests)]
        this.initialGuests = [...this.guests]
      }
    }

    guestsTransformation (guests:GuestResponse[]):GuestResponseCustom[] {
      return guests.map((guest:GuestResponse):GuestResponseCustom => {
        return {
          _id: guest._id,
          name: guest.name,
          menu: guest.menu,
          bus: guest.bus,
          intolerance: guest.intolerance,
          user: guest.user,
          username: guest.user ? guest.user[0].username : '',
          email: guest.user ? guest.user[0].email : '',
          phone: guest.user ? guest.user[0].phone : ''
        }
      })
    }

    wrapCsvValue (val:string | [], formatFn?:((val:string | []) =>[])):string {
      let formatted = formatFn !== void 0
        ? formatFn(val)
        : val

      formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

      formatted = formatted.split('"').join('""')

      return `"${formatted}"`
    }

    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map((col:Column) => this.wrapCsvValue(col.label))].concat(
        this.guests.map((guest:GuestResponseCustom) => {
          return this.columns.map((col:Column) => {
            const value = this.guests.length > 0 ? guest[col.field as Field] : ''
            return this.wrapCsvValue(value as string)
          }).join(',')
        })
      ).join('\r\n')

      const status = exportFile(
        `invitados-${Date.now()}.csv`,
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }

    async doLogout () {
      await this.$store.dispatch('wedding/logoutUser')
      this.$router.push('/signin') as Promise<void>
    }

    get removeGuestMessage () :string {
      return this.currentGuestToEdit?.name ? `<p>¿Eliminar a <strong>${this.currentGuestToEdit.name}</strong>?<p>` : ''
    }

    openDeleteGuest (guest:GuestResponseCustom) {
      this.openAlertDeleteGuest = true
      this.currentGuestToEdit = guest
    }

    openEditGuest (guest:GuestResponseCustom | null) {
      this.openDialog = true
      this.currentGuestToEdit = guest
    }

    closeFinishDialog () {
      this.currentGuestToEdit = null
      this.openDialog = false
    }

    async manageGuestData (guestInfo:GuestFinalInfoModel) {
      guestInfo?.guest?._id ? await this.searchAndReplaceGuest(guestInfo) : await this.addNewGuest(guestInfo)
      await this.fetchGuests()
      this.text = ''
      this.currentGuestToEdit = null
      this.openDialog = false
    }

    async searchAndReplaceGuest (guestInfo:GuestFinalInfoModel) {
      const guestId = guestInfo?.guest?._id && guestInfo.guest._id
      const guestInfoToSend = {
        _id: String(guestId),
        name: guestInfo?.guest?.name ? guestInfo.guest.name : null,
        intolerance: guestInfo.intolerance,
        menu: guestInfo.menu?.value ? guestInfo.menu.value as Menu : null,
        bus: guestInfo.bus?.value ? guestInfo.bus.value as Bus : null
      }

      await this.updateGuest(guestInfoToSend)
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

      await this.createGuest(guestInfoToSend)
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

    get dialogTitle ():string {
      return this.currentGuestToEdit?._id && this.currentGuestToEdit?.name ? `Editar datos de ${this.currentGuestToEdit.name}` : 'Anadir acompañante'
    }

    async deleteGuest () {
      if (!this.currentGuestToEdit) return
      try {
        await this.$store.dispatch('wedding/deleteGuest', this.currentGuestToEdit._id)
        await this.fetchGuests()
        this.text = ''
        this.openAlertDeleteGuest = false
      } catch (error) {
        console.log(error)
      }
    }
}
</script>
