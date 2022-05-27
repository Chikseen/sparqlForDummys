const api = {
  //DATA FETCHER
  async fetch(query) {
    var url = "http://dbpedia.org/sparql";

    var queryUrl = url + "?query=" + encodeURIComponent(query) + "&format=json";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", queryUrl, false);

    xhr.send("");
    return JSON.parse(xhr.response).results.bindings;
  },
  async getTrible(query) {
    console.log("query", query);
    const t = await fetch("https://en.wikipedia.org/w/api.php?callback=jQuery21303478887928065648_1653649100552&srsearch=LEIPZIG&action=query&list=search&format=json&_=1653649100555", {
      methode: "GET",
      headers: {
        "Access-Control-Allow-Origin": "http://192.168.2.100:8080/",
      },
      action: "help",
      format: "jsonfm",
      origin: "http://192.168.2.100:8080/",
    });
    console.log("t", t);
  },
};

export default api;
