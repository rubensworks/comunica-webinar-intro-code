const { QueryEngine } = require("@comunica/query-sparql");
const { DataFactory } = require("rdf-data-factory");
const { Store } = require("n3");

(async function(){
    const myEngine = new QueryEngine();

    const context = {
        sources: [
            'https://comunica.dev/',
        ],
    };
    const bindingsStream = await myEngine.queryBindings(`
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      SELECT * WHERE {
        ?thing foaf:primaryTopic ?topic.
        ?topic foaf:name ?name.
      }
    `, context);

    bindingsStream.on('data', (bindings) => console.log(bindings.toString()));
    bindingsStream.on('error', console.error);
    bindingsStream.on('end', () => {
        console.log('Done!');
    });
})();
