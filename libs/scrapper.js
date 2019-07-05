const fetch = require("node-fetch");
const cheerio = require("cheerio");
const RepoModel = require("./../models/repoModel");

// https://github.com/search?o=desc&s=updated&type=Repositories&q=nodejs

exports.searchRepo = () => {
  // const repos = [];

  for (let i = 0; i < 5; i++) {
    const url =
      "https://github.com/search?o=desc&s=updated&type=Repositories&q=nodejs&p=";

    fetch(`${url}i`)
      .then(response => response.text())
      .then(body => {
        // console.log(body);
        const $ = cheerio.load(body);
        $("li.repo-list-item").each((i, element) => {
          const $element = $(element);

          const title = $element
            .find("div h3")
            .text()
            .replace(/\s\s+/g, "");
          const username = $element
            .find("div h3")
            .text()
            .replace(/\s\s+/g, "")
            .split("/")[0];
          const description = $element
            .find("div.pr-md-3 .pr-4")
            .text()
            .replace(/\s\s+/g, "");
          const tags = $element
            .find("div.pr-md-3 div .topic-tag")
            .text()
            .trim()
            .split("\n\n");
          const url = `https://github.com${$element
            .find("div h3 a")
            .attr("href")}`;
          const progLang = $element.find("div.mr-3 span span").text();
          const lastUpdated = $element
            .find("div div p relative-time")
            .attr("datetime");

          const repo = new RepoModel({
            title: title,
            programmingLanguage: progLang.toLowerCase(),
            description: description,
            url: url,
            tags: tags,
            lastUpdated: lastUpdated,
            username: username.toLowerCase()
          });

          return repo.save();

        });

        //   return repos;
      })
      .then(result => {
        console.log("successful");
        // return repos;
      })
      .catch(err => console.log(err));
  }
};
