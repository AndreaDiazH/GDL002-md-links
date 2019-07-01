const mdLinks = require('../index.js');


test('foundLink receive empty string', () => {
  expect(mdLinks.foundLink("")).toBe(false);
});

test('foundLink receive a string without a link', ()=> {
  expect(mdLinks.foundLink("yeah whatever")).toBe(false);
});

test('foundLink receive a string with a link', ()=>{
  expect(mdLinks.foundLink("[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado")).toBeGreaterThan(-1);
});

test('foundLink receive a string with a link', ()=>{
  expect(mdLinks.foundLink("[Markdown](http://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado")).toBeGreaterThan(-1);
});

test('extractLinks should return an Object', ()=>{
  let obj = {
    "text": "Markdown",
    "href": "http://es.wikipedia.org/wiki/Markdown",
    "file": null
  };
  expect(mdLinks.extractLinks(0,"[Markdown](http://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado")).toMatchObject(obj);
});

test('mdlinks with valid file', () => {
  expect(mdLinks.mdLinks2("README.md")).toBeInstanceOf(Promise);
});
