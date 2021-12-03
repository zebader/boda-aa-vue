<template>
    <q-header unelevated v-if="isAround" class="bg-transparent component__header row justify-center">
        <q-toolbar class="component__header__toolbar q-pa-md ">
            <div class="row">
                <router-link to="/"><q-img src="~assets/logo-boda-aa.png" width="40px" height="40px"/></router-link>
            </div>
            <q-toolbar-title></q-toolbar-title>
            <div class="row">
                <div>
                    <p class="component__header__toolbar__title text-right">Ángela y Adrián</p>
                    <p class="component__header__toolbar__subtitle text-right" v-if="!isCounter">30 de Abril de 2022</p>
                    <Countdown v-if="isCounter" :date="officialDate"></Countdown>
                </div>

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
    @Prop({ required: false, default: false, type: Boolean }) isCounter!:boolean;
    @Prop({ required: false, default: false, type: Boolean }) isAround!:boolean;

    get officialDate ():string {
      return 'Sat Apr 30 2022 00:00:00 GMT+0200'
    }
}
</script>
