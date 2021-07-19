<template>
    <div class="full-width">
        <q-card class="q-mx-md q-my-sm" flat bordered>
            <q-expansion-item
            class="bg-white overflow-hidden"
            header-class="bg-accent text-white row items-between"
            expand-icon-class="text-white"
            expand-icon="add"
            expanded-icon="remove">
                <template v-slot:header>
                    <q-item-section class="component__home-options-expansion__list-container__list-item__section">
                        <q-item-label class="text-h5 component__home-welcome-card__title">Bienvenid@ a nuestra boda</q-item-label>
                        <q-item-label caption>Para saber más clicka aqui</q-item-label>
                    </q-item-section>
                </template>
                <div>

                <q-video src="https://www.youtube.com/embed/EzL6mrpTCGM" />
                <q-card-section class="q-px-md q-py-sm">
                    <div class="text-h5 text-secondary component__home-welcome-card__title">¿Cuando?</div>
                    <div class="text-subtitle2">Sabado, 28 de Abril de 2022 a las 14:00</div>
                </q-card-section>
                <q-card-section class="q-px-md q-py-sm">
                    <div class="text-h5 text-secondary component__home-welcome-card__title">¿Donde?</div>
                    <div class="text-subtitle2">En algun lugar de la mancha</div>
                </q-card-section>
                <q-card-section class="q-pt-xs q-pb-md q-px-md">
                    <div class="full-width column items-center">
                        <q-checkbox left-label v-model="addComment" label="¿Quieres comentarnos algo?" color="secondary"/>
                        <q-slide-transition class="full-width">
                            <div v-show="addComment">
                                <q-form
                                    @submit="addCommentOnSubmit"
                                    autocorrect="off"
                                    autocapitalize="off"
                                    autocomplete="off"
                                    spellcheck="false"
                                    class="q-pa-md column full-width">
                                    <q-input
                                        rounded outlined
                                        bg-color="white"
                                        v-model="comment"
                                        label="Añade aqui tu comentario"
                                        lazy-rules
                                        type="textarea"
                                        class="q-mb-lg full-width"
                                        autogrow
                                        color="secondary"/>
                                    <q-btn label="Submit" type="submit" color="secondary" unelevated class="self-end"/>
                                </q-form>
                            </div>
                        </q-slide-transition>
                    </div>
                </q-card-section>
                </div>

            </q-expansion-item>
        </q-card>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import './home-welcome-card.scss'

export default class HomeWelcomeCardComponent extends Vue {
    addComment = false
    comment = ''
    addCommentOnSubmit () {
      this.addComment = false
    }
}
</script>
