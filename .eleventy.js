const yaml = require('js-yaml');
const { DateTime } = require('luxon');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const fs = require("fs");
const mdIterator = require('markdown-it-for-inline')

module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy('./_site/images');
  eleventyConfig.addPassthroughCopy('./_site/css');
  eleventyConfig.addPassthroughCopy('./_site/googlee40f07b67084146c.html');

  eleventyConfig.addLayoutAlias('base', 'pageTemplates/base.njk');
  eleventyConfig.addLayoutAlias('page', 'pageTemplates/page.njk');
  eleventyConfig.addLayoutAlias('macro', 'pageTemplates/macro.njk');
  eleventyConfig.addLayoutAlias('example', 'pageTemplates/example.njk');
  eleventyConfig.addLayoutAlias('trick', 'pageTemplates/trick.njk');
  eleventyConfig.addLayoutAlias('resource', 'pageTemplates/resource.njk');
  eleventyConfig.addLayoutAlias('misc', 'pageTemplates/misc.njk');

  eleventyConfig.addDataExtension('yaml', contents => yaml.safeLoad(contents));

  eleventyConfig.addFilter('conDate', dateObj => {
    return DateTime.fromFormat(dateObj, 'LLL d, yyyy').toFormat('yyyy-LL-dd')
  });

  eleventyConfig.addFilter('simpleDate', dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc'}).toFormat('LLL dd, yyyy')
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter('limit', (array, qty) => (qty < 0 ? array.slice(qty): array.slice(0, qty)));

  eleventyConfig.addCollection('webpage', function(collection){
    return collection.getFilteredByGlob('_site/html/*.md').reverse();
  });

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  }).use(mdIterator, 'url_new_win', 'link_open', function (tokens, idx) {
    const [attrName, href] = tokens[idx].attrs.find(attr => attr[0] === 'href')

    if (href && (!href.includes('ansys.netlify.app') && !href.startsWith('/') && !href.startsWith('#'))) {
      tokens[idx].attrPush([ 'target', '_blank' ])
      tokens[idx].attrPush([ 'rel', 'noopener noreferrer' ])
    }
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: '_site',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
      output: 'dist'
    }
  }
}
