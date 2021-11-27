<template>
    <div class="full-width component__hotels">
        <div class="q-mx-sm">
            <div v-for="hotel in hotelList" :key="hotel.name" class="q-pa-sm">
                <q-card class="component__hotels__card full-width" flat bordered>
                    <q-card-section>
                        <q-parallax
                            :src="hotel.image"
                            :height="200"
                        />

                        <q-card-actions vertical class="justify-between q-pa-md">
                            <div class="row items-center q-my-sm no-wrap">
                                <q-icon flat round color="indigo" name="home" size="sm" class="q-mr-md"/>
                                <p class="q-ma-none">{{hotel.name}}</p>
                            </div>
                            <div class="row items-center q-my-sm no-wrap">
                                <q-icon flat round color="indigo" name="phone" size="sm" class="q-mr-md"/>
                                <p class="q-ma-none">{{hotel.phone}}</p>
                            </div>
                            <div class="row items-center q-my-sm no-wrap">
                                <q-icon flat round color="indigo" name="map" size="sm" class="q-mr-md"/>
                                <p class="q-ma-none">{{hotel.address}}</p>
                            </div>
                            <div class="row items-center justify-start q-my-sm">
                                <q-btn
                                    unelevated round
                                    class="q-ma-sm"
                                    icon="language"
                                    color="indigo"
                                    @click="gotTo(hotel.web)"/>
                                <q-btn
                                    unelevated round
                                    class="q-ma-sm"
                                    icon="location_on"
                                    color="indigo"
                                    @click="gotTo(hotel.mapsUrl)"/>
                            </div>
                            <p class="component__hotels__card__description q-my-sm" v-if="hotel.description">{{hotel.description}}</p>
                        </q-card-actions>
                    </q-card-section>
                </q-card>
            </div>
            <div class="q-pa-sm">
                <q-card class="component__hotels__card full-width" flat bordered>
                    <q-card-section>
                        <p>
                        Si prefieres algo mas de independencia ( bien porque vengáis en grupo o por comodidad), hay algunas casa rurales cerca de donde se cogerá/dejara el autobús que nos lleve a la Quinta y que tal vez os merezcan la pena (las localidades están muy cerca unas de otra y es bastante económico trasladarse en taxi entre ellas). Podéis consultarlas en:
                        </p>
                        <q-btn
                            unelevated
                            rounded
                            outline
                            class="full-width q-my-sm"
                            size="lg"
                            color="indigo"
                            @click="gotTo('https://www.escapadarural.com/casas-rurales/alcazar-de-san-juan')">
                        <q-img fit="contain" :src="escapadaImg" height="40px" class="q-my-xs"/>
                        </q-btn>
                    </q-card-section>
                    <q-card-section>
                        <p>
                        Por si te resultara mas atractivo y se adaptara mejor a tus necesidades, hay varios alojamientos Airbnb  que tal vez te resulten interesantes:
                        </p>
                        <q-btn
                            unelevated
                            rounded
                            outline
                            class="full-width q-my-sm"
                            color="indigo"
                            size="lg"
                            @click="gotTo('https://www.airbnb.es/s/Alc%C3%A1zar-de-San-Juan--Espa%C3%B1a/homes?adults=2&place_id=ChIJD38Nr-SuaQ0Rm_C3QE4kmSg&refinement_paths%5B%5D=%2Fhomes&checkin=2022-04-29&checkout=2022-05-01')">
                        <q-img :src="airbnbImg" width="40px" height="40px" class="q-my-xs"/>
                        </q-btn>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import './hotels-component.scss'
import { HotelItem } from 'components/models'

const hotelIntur: string = require('../../assets/hotel-intur.jpeg') as string
const hotelInsula: string = require('../../assets/hotel-insula.jpg') as string
const hotelHidalgo: string = require('../../assets/hotel-hidalgo.jpg') as string
const hotelMolino: string = require('../../assets/hotel-molino.jpeg') as string
const hotelJuan: string = require('../../assets/hotel-juan.jpg') as string
const hotelWelcome: string = require('../../assets/hotel-welcome.jpg') as string
const airbnb: string = require('../../assets/airbnb.png') as string
const escapada: string = require('../../assets/escapada.png') as string

export default class HomeOptionsExpansionComponent extends Vue {
    hotelList:Array<HotelItem> = [
      {
        image: hotelIntur,
        name: 'Hotel Intur Alcázar de San Juan',
        address: 'Av. de Herencia, s/n, 13600 Alcázar de San Juan, Cdad. Real',
        mapsUrl: 'https://goo.gl/maps/6ni3ZByU56hUJ1sdA',
        phone: '926 58 82 00',
        web: 'https://www.intur.com/hotel-alcazar-de-san-juan/',
        description: '*Si reservas por teléfono e indicas que es para la boda de Adrián y Angela, te harán un descuento en el precio/noche de la habitación 😊'
      },
      {
        image: hotelInsula,
        name: 'Hotel Ínsula Barataria',
        address: 'Av. Adolfo Suárez, S/N, 13600 Alcázar de San Juan, Cdad. Real',
        mapsUrl: 'https://g.page/hotelinsulabarataria?share',
        phone: '926 09 91 40',
        web: 'https://www.hotelinsulabarataria.com/'
      },
      {
        image: hotelHidalgo,
        name: 'Hotel Hidalgo Quijada',
        address: 'C. Rondilla Cruz Verde, 91, 13600 Alcázar de San Juan, Cdad. Real',
        mapsUrl: 'https://goo.gl/maps/5SeMhkMFS7SYQWv69',
        phone: '926 55 29 96',
        web: 'http://www.hidalgoquijada.es/'
      },
      {
        image: hotelMolino,
        name: 'Hotel Venta el molino',
        address: 'Av. Cervera, 81, 13600 Alcázar de San Juan, Cdad. Real',
        mapsUrl: 'https://goo.gl/maps/fYpeYTrgHGmkCC8o8',
        phone: '926 58 88 50',
        web: 'https://hotelventaelmolino.com/'
      },
      {
        image: hotelJuan,
        name: 'Viviendas turísticas San Juan',
        address: 'C. Gral. Alcañiz, nº13, 13600 Alcázar de San Juan, Cdad. Real',
        mapsUrl: 'https://goo.gl/maps/c22ingGvCYZyZKah9',
        phone: '629 18 57 44',
        web: 'https://www.viviendasturisticas-sanjuan.com/'
      },
      {
        image: hotelWelcome,
        name: 'Hostal Welcome2 Alcázar',
        address: 'Av. Criptana, 11, 13600 Alcázar de San Juan, Cdad. Real',
        mapsUrl: 'https://goo.gl/maps/GjWg4rXEjg8f6gtT9',
        phone: '660 66 32 76',
        web: 'https://www.welcome2alcazar.com/'
      }
    ];

    get airbnbImg ():string {
      return airbnb
    }

    get escapadaImg ():string {
      return escapada
    }

    gotTo (url:string) {
      window.open(url, '_blank')
    }
}
</script>
