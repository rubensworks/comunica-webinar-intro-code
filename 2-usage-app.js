const { QueryEngine } = require("@comunica/query-sparql");

(async function(){
    const myEngine = new QueryEngine();

    const bindingsStream = await myEngine.queryBindings(`SELECT * WHERE { ?s ?p ?o } LIMIT 1`, {
        sources: [
            'https://fragments.dbpedia.org/2016-04/en',
        ],
    });

    // console.time('exec');
    // const array = await bindingsStream.toArray({ limit: 10 });
    // console.timeEnd('exec');
    // console.log(array.length);

    bindingsStream.on('data', (bindings) => {
        console.log(bindings.toString());

        const term = bindings.get('s');
        console.log(term.value); // TODO

        for (const [ key, value] of bindings) {
            console.log('---'); // TODO
            console.log(key.value); // TODO
            console.log(value.value); // TODO
        }
    });
    bindingsStream.on('error', console.error);
    bindingsStream.on('end', () => {
        console.log('Done!');
    });
})();
