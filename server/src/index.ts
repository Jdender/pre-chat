import 'reflect-metadata';
import { buildSchema, useContainer as useGraphql } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';
import { createConnection, useContainer as useOrm} from 'typeorm';

// Set up typedi
useGraphql(Container);
useOrm(Container);

void async function() {

    await createConnection({
        type: 'sqlite',
        database: '.data/db.sqlite',
        entities: [
            __dirname + '/**/*.ent.ts',
        ],
        synchronize: true,
    });

    const schema = await buildSchema({
        resolvers: [
          __dirname + '/**/*.res.ts',
        ],
    });

    const server = new ApolloServer({ 
        schema,
        playground: true,
        subscriptions: '/',
    });
    
    const { url } = await server.listen(8080);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}();
