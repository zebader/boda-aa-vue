<template>
<q-list class="component__info__list-container full-width">
<div style="max-width:600px; width:100%;" v-for="item in infoItems" :key="item.label">
    <q-expansion-item class="component__info__list-container__list-item" header-class="text-indigo">
        <template v-slot:header>
            <q-item-section avatar>
                <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section class="component__info__list-container__list-item__section">
                <q-item-label>{{item.label}}</q-item-label>
                <q-item-label caption>{{item.caption}}</q-item-label>
            </q-item-section>
        </template>
        <div class="q-ma-md" v-html="item.template"></div>
        <div v-if="item.contact && item.contact.length > 0">
            <q-card flat bordered v-for="contact in item.contact" :key="contact.name" class="q-my-sm">
                <q-card-section>
                    <div class="row items-center q-my-sm no-wrap">
                        <q-icon flat round color="indigo" :name="contact.nameIcon" size="sm" class="q-mr-md"/>
                        <p class="q-ma-none">{{contact.name}}</p>
                    </div>
                    <div class="row items-center q-my-sm no-wrap">
                        <q-icon flat round color="indigo" :name="contact.phoneIcon" size="sm" class="q-mr-md"/>
                        <p class="q-ma-none">{{contact.phone}}</p>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </q-expansion-item>
    <q-separator/>
</div>
</q-list>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import './info-component.scss'
import { InfoItem } from 'components/models'

@Options({
  components: { }
})
export default class InfoComponent extends Vue {
  get infoItems (): InfoItem[] {
    return [{
      label: 'Transporte',
      icon: 'commute',
      caption: 'Toda la información sobre cómo llegar',
      template: `
        <p>
            Alcazar de San Juan se caracteriza por su red ferroviaria y la facilidad para acceder a ella a través del tren. Así, desde/hacia Madrid hay varios trenes que permiten ir y venir con comodidad (tanto en el día como en días diferentes) ya que el trayecto es de apenas 1 hora y media, por lo que si prefieres “pasar” del coche y venir a nuestro enlace en tren no te faltarán opciones!
        </p>
        <p>
            Además de una amplia oferta de trenes desde Madrid, al ser un importante nudo ferroviario, existen muchas combinaciones posibles desde otros puntos de España.
        </p>
        <p>
            Si prefieres utilizar tu propio vehículo Alcázar se encuentra excepcionalmente conectado con la A4 y la Autovía de los Viñedos por lo que no tendrás ningun problema para acceder.
        </p>
        <p>
            Si para la asistencia a nuestro enlace has planeado un viaje en coche de ida y vuelta y prefieres ir directamente al lugar donde se celebrará el enlace, es decir Quinta Monteguerra, la dirección concreta es: Carretera Herencia, KM. 12,6, 13600, Ciudad Real.
        </p>
        <p>
            Por si necesitarás desplazarte entre localidades o dentro de la misma localidad, te facilitamos algunos teléfonos de taxi donde puedes llamar para concertar un servicio:
        </p>
      `,
      contact: [
        {
          name: 'Taxi Alcázar de San Juan 24 horas',
          phone: '615791818',
          nameIcon: 'local_taxi',
          phoneIcon: 'phone'
        },
        {
          name: 'Taxi Alcázar',
          phone: '629438711',
          nameIcon: 'local_taxi',
          phoneIcon: 'phone'
        },
        {
          name: 'Taxi Miguel Angel Meneses',
          phone: '618579947',
          nameIcon: 'local_taxi',
          phoneIcon: 'phone'
        },
        {
          name: 'Taxi Jose Angel Muela',
          phone: '666582713',
          nameIcon: 'local_taxi',
          phoneIcon: 'phone'
        }
      ]
    }, {
      label: 'Belleza',
      icon: 'face',
      caption: 'Peluquerías y maquillaje',
      template: `
        <p>
            Sabemos que muchos de vosotros visitareis Alcázar por primera vez y que acudir a una celebración fuera de tu ciudad siempre conlleva algunos esfuerzos adicionales y dudas.
        </p>
        <p>
            Por lo anterior, os queremos facilitar algunas direcciones y teléfonos que pudierais necesitar u os pudieran resultar interesantes
        </p>
        <p>
            Recordar que estos servicios pueden resultaros interesantes a muchos por lo que si estáis interesados es importante que concertéis una cita a la mayor brevedad posible.
        </p>
        `,
      contact: [
        {
          name: 'Peluqueria - Peluqueria  Rosa Blanca',
          phone: '926551306',
          nameIcon: 'iron',
          phoneIcon: 'phone'
        },
        {
          name: 'Maquillaje - Peluqueria  Rosa Blanca',
          phone: '926551306',
          nameIcon: 'brush',
          phoneIcon: 'phone'
        }
      ]

    }
    ]
  }
}
</script>
