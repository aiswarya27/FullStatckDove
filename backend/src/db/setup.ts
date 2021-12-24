import { Client } from 'pg'
import * as faker from 'faker'

const client = new Client({
  user: 'postgres',
  port: 54320,
  database: 'tiny_dovetail',
})

const createTables = () => {
  return client.query(`
    CREATE TABLE IF NOT EXISTS note (
        id SERIAL PRIMARY KEY,
        title text NOT NULL,
        content text NOT NULL,
        labels text
    );
    CREATE TABLE IF NOT EXISTS label (
      id SERIAL PRIMARY KEY,
      value text NOT NULL
    );
   
  `)
}

const populateData = async () =>
  await Promise.all(
    Array.from({ length: 25 }).map(async _ => {
      await client.query(`
        INSERT INTO note(title, content)
        VALUES (
            '${faker.company.catchPhrase()}',
            '${faker.lorem.paragraphs(3)}'
        );
        INSERT INTO label(value)
        VALUES (
            '${faker.lorem.word(3)}'
        );
    `)
    }),
  )

const updateTableColumn = () => {
  return client.query(`
    ALTER TABLE note ADD COLUMN IF NOT EXISTS labels text
    `)
}

const main = async () => {
  console.log('DB Setup...')
  await client.connect()
  await createTables()
  await populateData()
  await updateTableColumn()
  await client.end()
}
;(async () => {
  try {
    await main()
  } catch (e) {
    console.error(e)
  }
})()
