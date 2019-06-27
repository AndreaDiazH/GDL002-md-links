const mdLinks = require('../index.js');

test('mdlinks is a function', () => {
  expect(mdLinks.mdLinks2("")).toBe(false);
});

test('foundLink receive empty string', () => {
  expect(mdLinks.foundLink("")).toBe(false);
});

test('foundLink receive a string without a link', ()=> {
  expect(mdLinks.foundLink("yeah whatever")).toBe(false);
});

test('foundLink receive a string with a link', ()=>{
  expect(mdLinks.foundLink("[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado")).toBe(true);
});

test('foundLink receive a string with a link', ()=>{
  expect(mdLinks.foundLink("[Markdown](http://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado")).toBe(true);
});
