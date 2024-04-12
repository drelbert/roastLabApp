// service to fetch json menu data

const API = {
  url: "/data/menu.json",
  fetchMenu: async function () {
    const result = await fetch(API.url);
    return await result.json();
  },
};

export default API;
