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
                    <div class="q-mx-sm q-mb-lg">
                        <div v-if="item.name === 'preferences'">
                            <div v-for="guest in guestsList" :key="guest.id" class="q-pa-sm">
                                <HomeOptionsCardComponent :guest="guest"></HomeOptionsCardComponent>
                            </div>
                            <div class="column q-pa-sm">
                            <transition
                                appear
                                enter-active-class="animated rubberBand component__home-options-expansion__animation">
                                <p class="page__flyer__container__intro-text text-center text-green">
                                    <q-btn
                                        unelevated
                                        icon="person_add"
                                        no-caps
                                        type="submit"
                                        color="indigo"
                                        size="lg"
                                        class="q-ma-sm full-width"
                                        :label="addGuestButtonLabel"
                                        to="/flyer"/>
                                </p>
                            </transition>
                            </div>
                        </div>
                    </div>
                </q-expansion-item>
                <q-separator v-if="showSeparator(index)"/>
            </div>
        </q-list>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import HomeOptionsCardComponent from 'components/home/home-options-card/HomeOptionsCardComponent.vue'
import './home-options-expansion.scss'
import { OptionItem, GuestItem } from 'components/models'

@Options({
  components: { HomeOptionsCardComponent }
})
export default class HomeOptionsExpansionComponent extends Vue {
    guestsList:Array<GuestItem> = [];
    openDialog = false;
    maximizedToggle = true;

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
          bus: 'Manoteras'
        }
      ]

      this.guestsList = [...fetchedUser]
    }

    mounted () {
      this.fetchGuestsList()
    }
}
</script>
