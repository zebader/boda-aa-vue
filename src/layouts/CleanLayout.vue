<template>
    <q-layout class="layout__main">
            <q-page-container>
                <router-view />
            </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import './main.scss'

export default class CleanLayout extends Vue {}
</script>
