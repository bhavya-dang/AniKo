<template>
  <div class="flex flex-col">
    <div class="flex-grow container">
      <div
        class="flex-col md:flex-row xl:flex-row lg:flex-row flex rounded-lg flex-no-wrap mt-7 md:mb-10 mx-8 my-4 md:-my-8 shadow-md flex-basis-0 md:w-full w-full max-w-full bg-white items-stretch"
        v-for="(d, i) in animes"
        :key="i"
      >
        <img
          class="h-auto object-cover md:w-auto rounded-l-lg"
          :src="d.coverImage.large"
          alt=""
        />
        <!-- <div v-if="d.type === 'ANIME'" class="absolute bottom-0 left-0">
          <span
            :style="{ color: d.coverImage.color }"
            class="p-2 bg-gray-900 bg-opacity-20"
            >{{
              d.studios.nodes[0] === undefined
                ? "Not Specified"
                : d.studios.nodes[0].name
            }}</span
          >
        </div> -->
        <div
          class="flex-1 border border-l-0 rounded-b p-4 flex flex-row justify-between leading-normal w-full"
        >
          <div class="mb-8">
            <div class="text-gray-900 font-medium text-xl mb-2">
              <a
                :href="d.siteUrl"
                class=" hover:text-gray-700"
                target="_blank"
                rel="noopener noreferrer"
                >{{
                  d.title.english !== null ? d.title.english : d.title.romaji
                }}</a
              >
              <p
                class="text-gray-400 text-sm italic leading-snug tracking-widest"
              >
                {{ d.title.native }}
              </p>
            </div>
            <p v-if="d.description === null" class="text-gray-500 italic">
              No Description Provided.
            </p>
            <p v-else class="text-gray-600 font-normal">
              {{ d.description.replace(regex, "") }}
            </p>
            <div class="flex flex-wrap flex-col mt-3">
              <div v-if="!d.averageScore">
                <p class="hidden py-1 text-sm font-semibold text-gray-800">
                  Average Score:
                  <span class="inline py-1 text-sm font-semibold text-gray-600"
                    >{{ d.averageScore }}%</span
                  >
                </p>
              </div>
              <div v-else>
                <p class="block py-1 text-sm font-semibold text-gray-800">
                  Average Score:
                  <span class="inline py-1 text-sm font-semibold text-gray-600"
                    >{{ d.averageScore }}%</span
                  >
                </p>
              </div>

              <p class="block py-1 text-sm font-semibold text-gray-800">
                Status:
                <span
                  v-if="d.status === 'FINISHED'"
                  class="inline py-1 text-sm font-semibold text-gray-600"
                  >Finished</span
                >

                <span
                  v-else-if="d.status === 'NOT_YET_RELEASED'"
                  class="inline py-1 text-sm font-semibold text-gray-600"
                  >Not Yet Released</span
                >
                <span
                  v-else-if="d.status === 'HIATUS'"
                  class="inline py-1 text-sm font-semibold text-gray-600"
                  >On Hiatus</span
                >
                <span
                  v-else-if="d.status === 'CANCELLED'"
                  class="inline py-1 text-sm font-semibold text-gray-600"
                  >Cancelled</span
                >
                <span
                  v-else-if="d.status === 'RELEASING'"
                  class="inline py-1 text-sm font-semibold text-gray-600"
                  >Releasing</span
                >
              </p>

              <p
                v-if="
                  d.type === 'MANGA' &&
                    ['FINISHED', 'CANCELLED'].includes(d.status) === true
                "
                class="block py-1 text-sm font-semibold text-gray-800"
              >
                Chapters:
                <span class="inline py-1 text-sm font-semibold text-gray-600">{{
                  d.chapters
                }}</span>
              </p>
              <p
                v-else-if="
                  d.type === 'ANIME' &&
                    ['FINISHED', 'CANCELLED'].includes(d.status) === true
                "
                class="block py-1 text-sm font-semibold text-gray-800"
              >
                Episodes:
                <span class="inline py-1 text-sm font-semibold text-gray-600">{{
                  d.episodes
                }}</span>
              </p>
              <p class="block py-1 text-sm font-semibold text-gray-800">
                Type:
                <span
                  v-if="d.type === 'ANIME'"
                  class="inline py-1 text-sm font-semibold text-gray-600"
                  >Anime</span
                >
                <span
                  v-else
                  class="inline py-1 text-sm font-semibold text-gray-600"
                  >Manga</span
                >
              </p>
              <div v-if="d.startDate.year !== null">
                <p class="block py-1 text-sm font-semibold text-gray-800">
                  Start Date:
                  <span class="inline text-sm font-semibold text-gray-600">{{
                    moment(
                      `${d.startDate.day}.${d.startDate.month}.${d.startDate.year}`,
                      "DD.MM.YYYY"
                    ).format("MMM Do, YYYY")
                  }}</span>
                </p>
              </div>
              <div v-else>
                <p class="hidden py-1 text-sm font-semibold text-gray-800">
                  Start Date:
                  <span class="inline text-sm font-semibold text-gray-600">
                    {{
                      moment(
                        `${d.startDate.day}.${d.startDate.month}.${d.startDate.year}`,
                        "DD.MM.YYYY"
                      ).format("MMM Do, YYYY")
                    }}
                  </span>
                </p>
              </div>
              <div v-if="d.endDate.year !== null">
                <p class="block py-1 text-sm font-semibold text-gray-800">
                  End Date:
                  <span class="inline text-sm font-semibold text-gray-600">{{
                    moment(
                      `${d.endDate.day}.${d.endDate.month}.${d.endDate.year}`,
                      "DD.MM.YYYY"
                    ).format("MMM Do, YYYY")
                  }}</span>
                </p>
              </div>
              <div v-else>
                <p class="hidden py-1 text-sm font-semibold text-gray-800">
                  End Date:
                  <span class="inline text-sm font-semibold text-gray-600">{{
                    moment(
                      `${d.endDate.day}.${d.endDate.month}.${d.endDate.year}`,
                      "DD.MM.YYYY"
                    ).format("MMM Do, YYYY")
                  }}</span>
                </p>
              </div>
              <div class="flex items-center align-middle space-x-2 mt-1">
                <p v-for="(g, i) in d.genres" :key="i" class="cursor-pointer">
                  <span
                    id="genre"
                    :style="[
                      d.coverImage.color === null
                        ? { backgroundColor: '#f3f4f6', color: '#1f2937' }
                        : {
                            backgroundColor: d.coverImage.color,
                            color: '#f9fafb',
                          },
                    ]"
                    class="inline-block text-sm rounded-full py-1 px-3 font-medium"
                    >{{ g }}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    animes: Array,
  },
  data() {
    return {
      regex: /(<([^>]+)>)/gi,
    };
  },
};
</script>
