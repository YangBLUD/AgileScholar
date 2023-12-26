<template>
  <div class="institution-show-content-nav abstract-nav">
    <div class="institution-show-content-nav-block Basic-block">
      <div class="institution-show-content-nav-holder"></div>
      <div class="institution-show-content-nav-title">BASIC INFORMATION</div>
    </div>
    <div class="basic-block">
      <img v-if="institution.image_url" :src="institution.image_url" class="institution-img" alt="">
      <img v-else class="institution-img" src="../../assets/buaa.png" alt="" />
      <div class="institution-basic">
        <h2 class="institution-name">{{ institution.display_name }}</h2>
        <div class="institution-type"><strong>Type: </strong> {{ institution.type }}</div>
        <div class="institution-area"><strong>Area: </strong> {{ institution_area }}</div>
        <div class="institution-home"><strong>Home: </strong><a
            :href="institution.homepage_url">{{ institution.homepage_url }}</a></div>
      </div>
    </div>
  </div>
</template>


<script setup>

import { onMounted, reactive, ref, watch } from "vue";
import store from "../../store/index.js";
import Vue from "node-forge/lib/util.js";

const institution = ref(store.state.Institution.institution)
const institution_area = ref(store.getters.getGeo)

watch(() => store.state.Institution, (newVal, oldVal) => {
  institution.value = store.state.Institution.institution
  console.log(institution.image_url)
  institution_area.value = store.getters.getGeo
}, { deep: true })
</script>


<style scoped>
.institution-show-content-nav {
  background-color: #fafafa;
  margin: 10px 0 15px 0;
  /*padding: 30px;*/
}

.institution-show-content-nav-block {
  /*margin: -30px 0 0 -30px;*/
  padding: 13px 0;
  display: flex;
  flex-direction: row;
}

.institution-show-content-nav-holder {
  width: 8px;
  height: 18px;
  background-color: #333333;
}

.institution-show-content-nav-title {
  padding-left: 12px;
  font-size: 18px;
  line-height: 1.125rem;
  font-style: italic;
  font-weight: bold;
}

.basic-block {
  display: flex;
  flex-direction: row;
}

.institution-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 25px;
}

.institution-name {
  font-family: Merriweather, serif;
  margin-top: 30px;
  font-size: 22px;
  color: #333333;
}

.institution-type {
  font-family: Merriweather, sans-serif;
  margin-top: 15px;
  font-size: 14px;
  color: #333333;
}

.institution-area {
  font-family: Merriweather, sans-serif;
  margin-top: 15px;
  font-size: 14px;
  color: #333333;
}

.institution-home {
  font-family: Merriweather, sans-serif;
  margin-top: 15px;
  font-size: 14px;
  color: #333333;
}</style>
