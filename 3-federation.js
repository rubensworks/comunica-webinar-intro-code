const { QueryEngine } = require("@comunica/query-sparql");
const { DataFactory } = require("rdf-data-factory");
const { Store } = require("n3");

(async function(){
    const myEngine = new QueryEngine();
    const DF = new DataFactory();
    const store = new Store();

    store.add(DF.quad(
        DF.namedNode('https://comunica.dev/#software'),
        DF.namedNode('http://xmlns.com/foaf/0.1/name'),
        DF.literal("Software"),
    ));

    store.add(DF.quad(
        DF.namedNode('https://comunica.dev/'),
        DF.namedNode('http://xmlns.com/foaf/0.1/primaryTopic'),
        DF.namedNode('https://comunica.dev/#website'),
    ));
    store.add(DF.quad(
        DF.namedNode('https://comunica.dev/#website'),
        DF.namedNode('http://xmlns.com/foaf/0.1/name'),
        DF.literal("Website"),
    ));

    const context = {
        sources: [
            'https://comunica.dev/',
            'https://www.rubensworks.net/',
            store,
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
