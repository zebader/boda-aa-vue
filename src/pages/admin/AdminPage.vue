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
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { GuestResponse } from 'src/models/GuestModels'
import { exportFile } from 'quasar'
import './admin.scss'

export interface GuestResponseCustom extends GuestResponse {
    username?: string | null,
    email?: string | null,
}

export type Field = 'name' | 'menu' | 'bus' | 'intolerance' | 'username' | 'email';

export type Column = {
    name:string,
    align?:string,
    label:string,
    field:Field | null,
    sortable?:boolean
}

export default class AdminPage extends Vue {
    guests:GuestResponseCustom[] = []
    initialGuests:GuestResponseCustom[] = []
    openResumeDialog = false;
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
        { name: 'email', align: 'left', label: 'Contacto', field: 'email', sortable: true }]
    }

    async mounted () {
      try {
        await this.$store.dispatch('wedding/getAllGuests')
        if (this.$store.state.wedding.guests && this.$store.state.wedding.guests.length > 0) {
          this.guests = [...this.guestsTransformation(this.$store.state.wedding.guests)]
          this.initialGuests = [...this.guests]
        }
      } catch (error) {
        console.log(error)
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
          email: guest.user ? guest.user[0].email : ''
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
}
</script>
