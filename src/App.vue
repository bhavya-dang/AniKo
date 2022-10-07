<template>
  <div id="app" :class="darkState ? 'dark container' : 'container'">
    <!-- <Header></Header> -->
    
    <div class="dark:bg-zinc-900">
    <Search></Search>
    <DarkModeToggle v-if="darkState == false" @update:parent="darkState = $event"></DarkModeToggle>
    <TrendingAnime></TrendingAnime>
    <TrendingManga></TrendingManga>
    <Footer id="footer"></Footer>
    </div>
  </div>
</template>

<script>
import "@/assets/css/tailwind.css";
import TrendingAnime from "@/components/TrendingAnime";
import TrendingManga from "@/components/TrendingManga";
// import Header from "@/components/Header";
import Search from "@/components/Search";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
export default {
  name: "App",
  data() {
    return {
      darkState: false
    }
  },
  components: {
    TrendingAnime,
    TrendingManga,
    DarkModeToggle,
    // Header,
    Search,
    Footer,
  },
};
</script>

<style>
html,
body {
  height: 100%;
  overflow-y: auto;
  margin-top: 0%;
}
/* 
body {
  background-color: #edf2f7;
} */

::-webkit-scrollbar {
  width: 4.5px;
}

::-webkit-scrollbar:hover {
  width: 5.5px;
  transition: width ease;
}

::-webkit-scrollbar-track {
  background: #111827;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #10b981;
}

#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
