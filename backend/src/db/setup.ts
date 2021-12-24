import { Client } from "pg";
import * as faker from "faker";

const client = new Client({
  user: "postgres",
  port: 54320,
  database: "tiny_dovetail"
});

const createTables = () => {
  return client.query(`
    CREATE TABLE IF NOT EXISTS note (
        id SERIAL PRIMARY KEY,
        title text NOT NULL,
        content text NOT NULL
    );
  `);
};

const populateData = async () =>
  await Promise.all(
    Array.from({ length: 25 }).map(async _ => {
      await client.query(`
        INSERT INTO note(title, content)
        VALUES (
            '${faker.company.catchPhrase()}',
            '${faker.lorem.paragraphs(3)}'
        );
    `);
    })
  );

const main = async () => {
  console.log("DB Setup...");
  await client.connect();

  await createTables();
  await populateData();

  await client.end();
};

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
