<template>
  <div>
    <div class="flex justify-items-start mx-10 mt-20">
      <!-- <svg
        class="stroke-current text-red-600"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
      </svg> -->
      <h1 class="text-xl font-semibold mb-3 py-2 filter drop-shadow-sm">
        Trending
        <span
          class="text-xl font-bold text-green-500 filter drop-shadow-sm tracking-wide"
          >Manga</span
        >
      </h1>
    </div>
    <div
      class="mx-10 flex flex-wrap justify-items-start justify-between align-middle space-y-1"
    >
      <!-- grid grid-cols-3 gap-5 h-80 w-80 -->
      <div v-for="(t, i) in trendingManga" :key="i">
        <a :href="t.siteUrl" target="_blank" rel="noopener noreferrer">
          <img
            class="h-full w-full object-cover object-top rounded-md shadow-lg transform hover:scale-105 transition ease-in-out duration-500"
            :src="t.coverImage.large"
            :alt="t.title.english === null ? t.title.romaji : t.title.english"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import GetData from "../services/GetData";
export default {
  name: "trendingManga",
  data() {
    return {
      trendingManga: [],
    };
  },
  async mounted() {
    const query = `
      query ($page: Int, $perPage: Int) {
          Page(page: $page, perPage: $perPage) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
              media(type: MANGA, sort: TRENDING_DESC) {
                id
                title {
                  romaji
                  english
                }
                siteUrl
                coverImage {
                  extraLarge
                  large
                  medium
                }
            }
  }
}`;

    let variables = {
      page: 1,
      perPage: 5,
    };

    const result = await GetData.getTitles({
      query,
      variables,
    }).catch((err) => this.handleErrors(err));
    this.trendingManga = result.data.data.Page.media;
  },
  methods: {
    handleErrors: function(err) {
      console.log(err.message);
    },
  },
};
</script>
