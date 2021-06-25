<template>
    <q-header elevated>
        <q-toolbar>
            <q-btn flat round dense icon="menu" class="q-mr-sm" />
            <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>

            <q-toolbar-title>Quasar Framework</q-toolbar-title>

            <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
    </q-header>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class HeaderComponent extends Vue {}
</script>
