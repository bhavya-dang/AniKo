<template>
  <div>
    <div class="flex justify-items-start mx-10">
      <h1 class="text-xl font-semibold mb-3 py-2 filter drop-shadow-sm">
        Trending
        <span
          class="text-xl font-bold text-green-500 filter drop-shadow-sm tracking-wide"
          >Anime</span
        >
      </h1>
    </div>
    <div
      class="mx-10 flex flex-wrap justify-items-start justify-between align-middle space-y-1"
    >
      <!-- grid grid-cols-3 gap-5 h-80 w-80 -->
      <div v-for="(t, i) in trendingAnime" :key="i">
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
  name: "TrendingAnime",
  data() {
    return {
      trendingAnime: [],
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
              media(type: ANIME, sort: TRENDING_DESC) {
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
    this.trendingAnime = result.data.data.Page.media;
  },
  methods: {
    handleErrors: function(err) {
      console.log(err.message);
    },
  },
};
</script>
