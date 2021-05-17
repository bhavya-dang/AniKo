<template>
  <div id="app">
    <!-- <Header></Header> -->
    <Search></Search>
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
export default {
  name: "App",
  components: {
    TrendingAnime,
    TrendingManga,
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
}

body {
  background-color: #edf2f7;
}

::-webkit-scrollbar {
  width: 10px;
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
