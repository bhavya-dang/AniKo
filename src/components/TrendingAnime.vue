<template>
  <div>
    <div class="flex justify-items-start mx-10">
      <h1 class="text-xl font-semibold mb-3 py-2 filter drop-shadow-sm">
        <i class="fas fa-fire"></i> Trending
        <span
          class="text-xl font-semibold text-green-500 filter drop-shadow-sm tracking-wide"
          >Anime</span
        >
      </h1>
    </div>
    <div
      class="mx-10 flex flex-wrap justify-items-start justify-between align-middle space-y-1"
    >
      <!-- grid grid-cols-3 gap-5 h-80 w-80 -->
      <div
        v-for="(t, i) in trendingAnime"
        :key="i"
        class="transform hover:scale-105 transition ease-in-out duration-500"
      >
        <a :href="t.siteUrl" target="_blank" rel="noopener noreferrer">
          <img
            class="relative h-full w-full object-cover object-top rounded-md shadow-lg"
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
                isAdult
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
    this.trendingAnime = result.data.data.Page.media.filter((a) => {
      return a.isAdult === false;
    });
  },
  methods: {
    handleErrors: function(err) {
      console.log(err.message);
    },
  },
};
</script>

<style scoped>
/* Fix blurry images on scale */
img {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>
