<template>
  <div id="app">
    <!-- <Header></Header> -->
    <Search></Search>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import "@/assets/css/tailwind.css";
// import Header from "@/components/Header";
import Search from "@/components/Search";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    // Header,
    Search,
    Footer,
    // Loader
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
  border-radius: 1px;
  background-color: #10b981;
}

/* #footer {
  flex-shrink: 0;
  /* min-height: 100%;
} */
</style>
