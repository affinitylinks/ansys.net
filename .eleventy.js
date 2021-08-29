const yaml = require('js-yaml');
const { DateTime } = require('luxon');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('./_site/images');
  eleventyConfig.addPassthroughCopy('./_site/css');
  eleventyConfig.addPassthroughCopy('./_site/googlee40f07b67084146c.html');

  eleventyConfig.addLayoutAlias('base', 'pageTemplates/base.njk');
  eleventyConfig.addLayoutAlias('page', 'pageTemplates/page.njk');
  eleventyConfig.addLayoutAlias('macro', 'pageTemplates/macro.njk');
  eleventyConfig.addLayoutAlias('example', 'pageTemplates/example.njk');
  eleventyConfig.addLayoutAlias('trick', 'pageTemplates/trick.njk');
  eleventyConfig.addLayoutAlias('resource', 'pageTemplates/resource.njk');

  eleventyConfig.addDataExtension('yaml', contents => yaml.safeLoad(contents))

  eleventyConfig.addFilter('conDate', dateObj => {
    return DateTime.fromFormat(dateObj, 'LLL d, yyyy').toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('simpleDate', dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc'}).toFormat('LLL dd, yyyy')
  })

  eleventyConfig.addCollection('webpage', function(collection){
    return collection.getFilteredByGlob('_site/html/*.md').reverse();
  })

  eleventyConfig.addFilter('limit', (array, qty) => (qty < 0 ? array.slice(qty): array.slice(0, qty)))

  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: '_site',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
      output: 'dist'
    }
  }
}
