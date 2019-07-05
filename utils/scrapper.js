const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://github.com/search?o=desc&s=updated&p=1&type=Repositories&q=';
// https://github.com/search?o=desc&s=updated&type=Repositories&q=nodejs

exports.searchRepo = (keyword) => {
    return fetch(`${url}${keyword}`)
        .then(response => response.text())
        .then(body => {
            const repos = [];

            // console.log(body);
            const $ = cheerio.load(body);
            $('li.repo-list-item').each((i, element) => {
                const $element = $(element);

                const title = $element.find('div h3').text().replace(/\s\s+/g, '');
                const username = ($element.find('div h3').text().replace(/\s\s+/g, '')).split('/')[0];
                const description = $element.find('div.pr-md-3 .pr-4').text().replace(/\s\s+/g, '');
                const tags = ($element.find('div.pr-md-3 div .topic-tag').text().trim()).split('\n\n');
                const url = `https://github.com${$element.find('div h3 a').attr('href')}`;
                const progLang = $element.find('div.mr-3 span span').text();
                const lastUpdated = $element.find('div div p relative-time').attr('datetime');

                const repo = {
                    title: title,
                    programmingLanguage: progLang,
                    description: description,
                    url: url,
                    tags: tags,
                    lastUpdated: lastUpdated,
                    username: username
                }
                repos.push(repo);

                // console.log($title);
                // console.log($title.replace(/\s\s+/g, ''));
            });

            return repos;
        });
}

    