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
                <q-btn
                    flat
                    color="indigo"
                    icon-right="archive"
                    label="Guardar CVS"
                    no-caps
                    @click="exportTable"/>
            </template>
            </q-table>
  </q-page>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
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
    field:Field,
    sortable?:boolean
}

export default class AdminPage extends Vue {
    guests:GuestResponseCustom[] = []

    pagination = {
      rowsPerPage: 0
    }

    get columns ():Column[] {
      return [
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
        if (this.$store.state.wedding.guests && this.$store.state.wedding.guests.length > 0) this.guests = [...this.guestsTransformation(this.$store.state.wedding.guests)]
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
      /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`
    }

    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map((col:Column) => this.wrapCsvValue(col.label))].concat(
        this.guests.map((guest:GuestResponseCustom) => {
          return this.columns.map((col:Column) => {
            const value = this.guests.length > 0 ? guest[col.field] : ''
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
}
</script>
