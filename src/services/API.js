import axios from "axios";

export default (url = "https://graphql.anilist.co") => {
  return axios.create({
    baseURL: url,
  });
};
