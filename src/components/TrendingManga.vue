<template>
  <div>
    <div class="flex justify-items-start mx-10 mt-20">
      <h1 class="text-xl font-semibold mb-3 py-2 filter drop-shadow-sm">
        <i class="text-red-600 fas fa-fire"></i> Trending
        <span
          class="text-xl font-bold text-green-500 filter drop-shadow-sm tracking-wide"
          >Manga</span
        >
      </h1>
    </div>
    <div
      class="mx-10 mb-10 flex flex-wrap justify-items-start justify-between align-middle"
    >
      <!-- grid grid-cols-3 gap-5 h-80 w-80 -->
      <div
        v-for="(t, i) in trendingManga"
        :key="i"
        class="transform hover:scale-105 transition ease-in-out duration-500"
      >
        <a :href="t.siteUrl" target="_blank" rel="noopener noreferrer">
          <img
            class="h-full w-full object-cover object-top rounded-md shadow-lg"
            :src="t.coverImage.large"
            :alt="t.title.english === null ? t.title.romaji : t.title.english"
          />
          <p class="text-gray-600 mt-1 text-center font-medium">
            {{ t.title.english === null ? t.title.romaji : t.title.english }}
          </p>
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

<style scoped>
p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>
