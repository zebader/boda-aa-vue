<template>
  <div class="q-py-md full-width component__home-options-expansion">
    <q-list class="component__home-options-expansion__list-container">
        <div v-for="(item,index) in optionItems" :key="item.id">
            <q-expansion-item class="component__home-options-expansion__list-container__list-item" :default-opened="item.default">
                <template v-slot:header>
                    <q-item-section avatar>
                        <q-icon :name="item.icon" color="secondary" />
                    </q-item-section>
                    <q-item-section class="component__home-options-expansion__list-container__list-item__section">
                        <q-item-label>{{item.title}}</q-item-label>
                        <q-item-label caption>{{item.subtitle}}</q-item-label>
                    </q-item-section>
                </template>
                <div v-if="item.name === 'preferences'">
                    <div v-for="guest in guestsList" :key="guest.name" >
                        <HomeOptionsCardComponent :guest="guest"></HomeOptionsCardComponent>
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
  get optionItems () : Array<OptionItem> {
    return [
      {
        id: 0,
        name: 'preferences',
        icon: 'restaurant',
        title: 'Preferencias de tu familia',
        subtitle: 'Elige menu, si necesitas autobus, etc..',
        default: true
      },
      {
        id: 1,
        name: 'locations',
        icon: 'bed',
        title: 'Estancias',
        subtitle: 'Los mejores hoteles',
        default: false
      }
    ]
  }

  showSeparator (index:number):boolean {
    return index < this.optionItems.length - 1
  }

  // for testing
  get guestsList ():Array<GuestItem> {
    return [
      {
        accepted: true,
        name: 'Jesus Cebader',
        gender: 'male',
        menu: 'Veggie', // aqui molaria un enum
        bus: 'Manoteras',
        formFilled: true
      },
      {
        accepted: true,
        name: 'Raquel Navarro',
        gender: 'female',
        menu: null, // aqui molaria un enum
        bus: null,
        formFilled: false
      }
    ]
  }
}
</script>
