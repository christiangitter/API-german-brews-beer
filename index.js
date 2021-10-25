//NPM INIT
//PACKAGES: "axios": "^0.23.0", // "cheerio": "^1.0.0-rc.10", //  "express": "^4.17.1", // "nodemon": "^2.0.14", // "utf8": "^3.0.0"
//START SCRIPT:  "start": "nodemon index.js" -> package.json
//COMMAND: npm start index.js

//Der Port auf dem der Server läuft
const PORT = 8800;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const utf8 = require("utf8");

const app = express();

const sites = [
  {
    name: "Hessen",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Hessen",
    base: "https://www.biermap24.de",
  },
  {
    name: "Baden-Württemberg",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Baden-Wuerttemberg",
    base: "https://www.biermap24.de",
  },
  {
    name: "Bayern",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Bayern",
    base: "https://www.biermap24.de",
  },
  {
    name: "Berlin",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Berlin",
    base: "https://www.biermap24.de",
  },
  {
    name: "Brandenburg",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Brandenburg",
    base: "https://www.biermap24.de",
  },
  {
    name: "Bremen",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Bremen",
    base: "https://www.biermap24.de",
  },
  {
    name: "Hamburg",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Hamburg",
    base: "https://www.biermap24.de",
  },
  {
    name: "Mecklenburg-Vorpommern",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Mecklenburg-Vorpommern",
    base: "https://www.biermap24.de",
  },
  {
    name: "Niedersachsen",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Niedersachsen",
    base: "https://www.biermap24.de",
  },
  {
    name: "Nordrhein-Westfalen",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Nordrhein-Westfalen",
    base: "https://www.biermap24.de",
  },
  {
    name: "Rheinland-Pfalz",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Rheinland-Pfalz",
    base: "https://www.biermap24.de",
  },
  {
    name: "Saarland",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Saarland",
    base: "https://www.biermap24.de",
  },
  {
    name: "Sachsen",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Sachsen",
    base: "https://www.biermap24.de",
  },
  {
    name: "Sachsen-Anhalt",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Sachsen-Anhalt",
    base: "https://www.biermap24.de",
  },
  {
    name: "Schleswig-Holstein",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Schleswig-Holstein",
    base: "https://www.biermap24.de",
  },
  {
    name: "Thüringen",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Thueringen",
    base: "https://www.biermap24.de",
  },
  {
    name: "Region Franken",
    address: "https://www.biermap24.de/brauereiliste.php?bundesland=Franken",
    base: "https://www.biermap24.de",
  },
];


//alle Artikel werden in das Array artikel geladen
const brauereien = [];

sites.forEach((site) => {
  axios.get(site.address).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    $(".listing-block-holder tbody tr td a", html).each(function () {
      const title = $(this).attr("title");
      const url = $(this).attr("href");
      if (title !== "Brauerein in Hessen") {
        if (title !== "Brauerein in Baden-Wuerttemberg") {
          if (title !== "Brauerein in Bayern") {
            if (title !== "Brauerein in Berlin") {
              if (title !== "Brauerein in Brandenburg") {
                if (title !== "Brauerein in Bremen") {
                  if (title !== "Brauerein in Hamburg") {
                    if (title !== "Brauerein in Mecklenburg-Vorpommern") {
                      if (title !== "Brauerein in Niedersachsen") {
                        if (title !== "Brauerein in Nordrhein-Westfalen") {
                          if (title !== "Brauerein in Rheinland-Pfalz") {
                            if (title !== "Brauerein in Saarland") {
                              if (title !== "Brauerein in Sachsen") {
                                if (title !== "Brauerein in Sachsen-Anhalt") {
                                  if (
                                    title !== "Brauerein in Schleswig-Holstein"
                                  ) {
                                    if (title !== "Brauerein in Thueringen") {
                                      if (title !== "Brauerein in Franken") {
                                        brauereien.push({
                                          title,
                                          url: site.base + url,
                                          bundesland: site.name,
                                        });
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  });
});

//wenn hinter dem Port /news geschrieben wird, wird das Artikel-Array als JSON ausgegeben
app.get("/brews", function (req, res) {
  res.json(brauereien);
});

//Brauereien nach Bundesland
app.get("/brews/:bundesland", function (req, res) {
  const brewIDraw = req.params.bundesland;
  const brewID = brewIDraw.charAt(0).toUpperCase() + brewIDraw.slice(1);
  const bsUrl = "https://www.biermap24.de"
  //brewID = Hessen
  const urlbase = "https://www.biermap24.de/brauereiliste.php?bundesland=";
  const url = urlbase + brewID;
  axios.get(url).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const localbrews = [];
    $(".listing-block-holder tbody tr", html).each(function () {
      const title = $(this).find('td a').attr("title");
      const ortRaw = $(this).toString()
      const ortwithoutTr = ortRaw.replace(/tr/g, '-');
      const ortwithoutTd = ortwithoutTr.replace(/td/g, '-');
      const ortwithoutSlashes = ortwithoutTd.replace(/\\|\//g,'')
      const ortwithoutBrakets = ortwithoutSlashes.split("<->")
      const ort = ortwithoutBrakets[5]
     //const url = $(this).attr("href");
      if (title !== `Brauerein in ${brewID}`) {
        localbrews.push({
          title,
          ort,
          //url: bsUrl + url,
        });
      }
    });
    res.json(localbrews);
  });
});
//listet alle deutschen Biere auf
app.get("/beers", function (req, res) {
  const url = 'https://www.biermap24.de/bierliste.php'
  const baseUrl = "https://www.biermap24.de/"
  axios.get(url).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const germanbeers = [];
    $(".listing-block-holder li", html).each(function () {
      const bier = $(this).find('span a').attr('title')
      const ortRaw = $(this).find('div span').toString()
      ortwithoutSpans = ortRaw.replace(/span/g, '-');
      //remove all Slahes
      ortwithoutSlashes = ortwithoutSpans.replace(/\\|\//g, '')
      ortwithoutBrakets = ortwithoutSlashes.split("<->")
      substr = 'badge-pill'
      if (ortwithoutBrakets[3].includes(substr)) {
        herkunft = ortwithoutBrakets[5]
        bewertungRaw = ortwithoutBrakets[7]
      }
      else {
        herkunft = ortwithoutBrakets[3]
        bewertungRaw = ortwithoutBrakets[5]
      }
      bewertungMain = bewertungRaw.split(' ')
      bewertung = bewertungMain[0]
      votes = bewertungMain[2]

      germanbeers.push({
        bier,
        herkunft,
        bewertung,
        votes,
      });
    });
    res.json(germanbeers);
  });
});

//hier wird der Port der App zugewiesen
app.listen(PORT, () => console.log(`Server läuft auf PORT ${PORT}`));
