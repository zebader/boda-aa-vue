<template>
  <div class="component__countdown">
    <div class="component__countdown__wrapper" v-if="!isWeddingDay">
        <div class="component__countdown__block row items-end" v-for="time in countdownClock" :key="time.text" >
        <p class="component__countdown__block__digit q-my-none">{{ time.digit }}</p>
        <p class="component__countdown__block__text q-mx-xs q-my-none">{{time.text}}</p>
        </div>
    </div>
    <div class="component__countdown__wrapper" v-else>
        <div class="component__countdown__block row items-end">
            <p class="component__countdown__block__text q-mx-xs q-my-none">{{weddingDayText}}</p>
        </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { CountdownClock } from 'components/models'
import './countdown.scss'

class Props {
    date = prop<string>({ default: '', required: false, type: String })
}

export default class CountdownComponent extends Vue.with(Props) {
    now:number = Math.trunc((new Date()).getTime() / 1000);

    get dateInMilliseconds ():number {
      return Math.trunc(Date.parse(this.date) / 1000)
    }

    get seconds ():number {
      return (this.dateInMilliseconds - this.now) % 60
    }

    get minutes ():number {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
    }

    get hours ():number {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24
    }

    get days ():number {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24)
    }

    get isWeddingDay ():boolean {
      return this.days <= 0 && this.hours <= 0 && this.minutes <= 0 && this.seconds <= 0
    }

    get weddingDayText ():string {
      return '¡ Hoy es el gran día !'
    }

    get countdownClock ():Array<CountdownClock> {
      return [
        {
          digit: this.days,
          text: 'D'
        },
        {
          digit: this.hours,
          text: 'h'
        },
        {
          digit: this.minutes,
          text: 'm'
        },
        {
          digit: this.seconds,
          text: 's'
        }]
    }

    mounted () {
      window.setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000)
      }, 1000)
    }
}
</script>
