<template>
  <!-- TODO -->
  <!-- 1) Advanced Filter
2) Grid List Toggle
5) Card Revamp
6) Hover Popups / card hover popup: title
7) Header component 
10) Scroll to top button -->
  <div class="container">
    <!-- <h1 class="mt-10 mb-10 text-3xl font-semibold filter drop-shadow-sm">
      AniKo
    </h1> -->
    <vue-progress-bar v-if="loading"></vue-progress-bar>
    <form
      class="w-auto md:w-full max-w-sm ml-20 py-5 md:mt-1"
      v-on:submit.prevent
    >
      <div class="flex space-x-2 py-2 md:-ml-10">
        <input
          id="input"
          v-on:keyup.enter="getAnime"
          v-model="query"
          class="bg-white focus:placeholder-gray-800 rounded-lg shadow-sm w-full p-2 mr-3 focus:outline-none tracking-wide focus:ring-1 focus:ring-green-500 active:bg-white"
          type="text"
          placeholder="Search Anime/Manga"
          aria-label="query"
        />
        <button
          id="searchBtn"
          @click="getAnime"
          :disabled="loading"
          class="ease-in-out transition-all duration-150 focus:outline-none flex-shrink-0 bg-green-500 hover:bg-green-700 text-m text-white py-1 px-3 rounded-lg shadow-sm hover:shadow-md font-semibold tracking-widest"
          type="button"
        >
          Search
        </button>
        <a
          href="https://github.com/Sync-Codes/AniKo"
          target="_blank"
          rel="noopener noreferrer"
          class="flex justify-items-center align-middle"
          ><button
            type="button"
            class="ease-in-out transition-all duration-150 focus:outline-none flex-shrink-0 border-2 border-gray-800 hover:bg-gray-800 text-gray-800 hover:text-white text-sm py-1 px-2 rounded-lg font-semibold tracking-widest"
          >
            <i class="fab fa-github"></i>
            Github
          </button></a
        >
        
      </div>
    </form>
    <!-- <span><i class="w-full h-full fas fa-adjust"></i></span> -->
    <!-- <h1 class="text-gray-800 font-semibold tracking-wide text-right">
      <a
        href="https://github.com/Sync-Codes/AniKo"
        target="_blank"
        rel="noopener noreferrer"
        >AniKo</a
      >
    </h1> -->
    <!-- card comp  -->
    <div v-if="loading === false">
      <div v-if="totalResults === 0">
        <div class="hidden justify-items-start mx-10">
          <h1 class="text-xl font-semibold mb-1 py-2 filter drop-shadow-sm">
            Total Results: {{ totalResults }}
          </h1>
        </div>
      </div>
      <div v-else>
        <div class="flex justify-items-start justify-start mx-10">
          <h1 class="text-xl font-semibold mb-1 py-2 filter drop-shadow-lg">
            Total Results: {{ totalResults }}
          </h1>
        </div>
      </div>
      <Card class="mt-10" :animes="anime"></Card>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import "@/assets/css/tailwind.css";
import Card from "@/components/Card";
import GetData from "../services/GetData";

export default {
  name: "Search",
  components: {
    Card,
    // Loader
  },
  data() {
    return {
      query: "",
      anime: [],
      loading: false,
      animeCount: 0,
      mangaCount: 0,
      totalResults: 0,
    };
  },
  methods: {
    getAnime: async function() {
      this.loading = true;
      this.$Progress.start();
      const query = `
        query ($id: Int, $page: Int, $perPage: Int, $search: String) {
          Page(page: $page, perPage: $perPage) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media(id: $id, search: $search, sort: POPULARITY_DESC) {
              id
              idMal
              title {
                romaji
                english
                native
              }
              type
              endDate {
                year
                month
                day
              }
              startDate {
                year
                month
                day
              }
              studios(isMain: true) {
                nodes {
                  name
                }
              }
              isAdult
              source
              genres
              volumes
              episodes
              chapters
              siteUrl
              status
              averageScore
              meanScore
              popularity
              description
              favourites
              coverImage {
                extraLarge
                medium
                large
                color
              }
            }
          }
}`;

      let variables = {
        search: this.query,
        page: 1,
        perPage: 100,
      };

      // const headers = {
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      // };

      const result = await GetData.getTitles({
        query,
        variables,
      }).catch((err) => this.handleErrors(err));
      setTimeout(() => {
        this.$Progress.finish();
        this.loading = false;
      }, 300);

      if (this.$Progress.finish()) {
        this.loading = false;
      }
      this.totalResults = result.data.data.Page.media.length;
      if (this.totalResults === 0) {
        this.$Progress.finish();
        this.loading = false;
        return this.$toasted.show("No results. Try again!", {
          position: "top-right",
          icon: "exclamation-triangle",
          duration: 4000,
        });
      }
      this.anime = result.data.data.Page.media.filter((a) => {
        return a.isAdult === false;
      });
      // console.log(this.anime);
      this.anime.forEach((e) => {
        if (e.type === "ANIME") {
          console.log(e.title.romaji, e.studios.nodes[0].name);
          this.animeCount++;
        } else if (e.type === "MANGA") {
          this.mangaCount++;
        }
      });
    },
    handleErrors: function(err) {
      console.log(err.message);
      // if (err.response.status === "404") {
      //   return this.$toasted.show("No results. Try again!", {
      //     theme: "outline",
      //     icon: "exclamation-triangle",
      //     duration: 4000,
      //   });
      // }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway&display=swap");
button {
  font-family: Raleway, Helvetica;
}
</style>
