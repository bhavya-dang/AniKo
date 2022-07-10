<template>
  <div id="app">
    <!-- <Header></Header> -->
    <Search></Search>
    <!-- <Toggle></Toggle> -->
    <p>isDark: {{ isDark }}</p>
    <button
    type="button"
    id="toggleModeBtn"
    @click="toggleDark()"
    class="ease-in-out transition-all duration-150 focus:outline-none flex-shrink-0 border-2 border-gray-800 hover:bg-gray-800 text-gray-800 hover:text-white text-sm py-1 px-2 rounded-lg font-semibold tracking-widest"
    >
    <i class="fa-solid fa-moon-over-sun"></i>
    Light/Dark
    </button>
    <TrendingAnime></TrendingAnime>
    <TrendingManga></TrendingManga>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import "@/assets/css/tailwind.css";
import TrendingAnime from "@/components/TrendingAnime";
import TrendingManga from "@/components/TrendingManga";
// import Header from "@/components/Header";
import Search from "@/components/Search";
import Footer from "@/components/Footer";
// import Toggle from "@/components/Toggle";

import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

export default {
  name: "App",
  components: {
    TrendingAnime,
    TrendingManga,
    // Toggle,
    // Header,
    Search,
    Footer
},
};
</script>

<style>
html,
body {
  height: 100%;
  overflow-y: auto;
}

body {
  background-color: #edf2f7;
}

::-webkit-scrollbar {
  width: 4.5px;
}

::-webkit-scrollbar:hover {
  width: 5.5px;
  transition: width ease;
}

::-webkit-scrollbar-track {
  background: #e2e8f0;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #10b981;
}

/* #footer {
  flex-shrink: 0;
  /* min-height: 100%;
} */
</style>
