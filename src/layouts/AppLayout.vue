<template>
    <div>
      <nav-bar></nav-bar>
        <div class="px-24">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import NavBar from '../components/NavBar.vue'
  export default{
    name: 'AppLayout',
    components: {
      NavBar
    }
  }
</script>