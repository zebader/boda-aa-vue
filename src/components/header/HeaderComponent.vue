<template>
    <q-header unelevated v-if="isAround" class="bg-transparent">
        <q-toolbar class="q-pa-md" :class="toolbarClass">
            <q-img src="~assets/logo-boda-aa.png" width="40px" height="40px"/>
            <q-toolbar-title></q-toolbar-title>
            <div>
                <p class="component__header__title" :class="titleClass">Adrián y Ángela</p>
                <p class="component__header__subtitle" v-if="!isCentered">30 de Abril de 2022</p>
                <Countdown v-if="isCentered" :date="officialDate"></Countdown>
            </div>
        </q-toolbar>
    </q-header>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Countdown from 'src/components/countdown/CountdownComponent.vue'
import './header-component.scss'

@Options({
  components: { Countdown }
})
export default class HeaderComponent extends Vue {
    @Prop({ required: false, default: false, type: Boolean }) isCentered!:boolean;
    @Prop({ required: false, default: false, type: Boolean }) isAround!:boolean;

    get officialDate ():string {
      return 'Sat Apr 30 2022 00:00:00 GMT+0200'
    }

    get toolbarClass ():Record<string, boolean> {
      return {
        column: this.isCentered
      }
    }

    get titleClass ():Record<string, boolean> {
      return {
        'text-center': this.isCentered,
        'text-right': !this.isCentered
      }
    }
}
</script>
