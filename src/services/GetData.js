import API from "./API";

export default {
  getTitles(data) {
    return API().post("/", data);
  },
  getTrendingAnime(data) {
    return API().post("/", data);
  },
  getTrendingManga(data) {
    return API().post("/", data);
  },
};
