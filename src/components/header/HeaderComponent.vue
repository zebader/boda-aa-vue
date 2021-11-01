<template>
    <q-header unelevated v-if="isAround" class="bg-transparent">
        <q-toolbar class="q-pa-md" :class="toolbarClass">
            <div class="row">
                <q-img src="~assets/logo-boda-aa.png" width="40px" height="40px"/>
                <q-btn color="indigo" flat unelevated icon="logout" @click="doLogout" class="q-ml-sm" v-if="showLogout && isCentered"/>
            </div>
            <q-toolbar-title></q-toolbar-title>
            <div class="row">
                <div>
                    <p class="component__header__title" :class="titleClass">Adrián y Ángela</p>
                    <p class="component__header__subtitle" v-if="!isCentered">30 de Abril de 2022</p>
                    <Countdown v-if="isCentered" :date="officialDate"></Countdown>
                </div>
                <q-btn color="indigo" flat unelevated icon="logout" @click="doLogout" class="q-ml-sm" v-if="showLogout && !isCentered"/>
            </div>
        </q-toolbar>
    </q-header>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Countdown from 'src/components/countdown/CountdownComponent.vue'
import './header-component.scss'
import AuthService from '../../services/AuthService'

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

    get showLogout ():boolean {
      return this.$store.state.wedding.showLogout
    }

    get titleClass ():Record<string, boolean> {
      return {
        'text-center': this.isCentered,
        'text-right': !this.isCentered
      }
    }

    async doLogout () {
      const authService:AuthService = new AuthService()
      await authService.logout()

      this.$store.commit('wedding/updateShowLogout', false)
      this.$router.replace('/signin') as Promise<void>
    }
}
</script>
