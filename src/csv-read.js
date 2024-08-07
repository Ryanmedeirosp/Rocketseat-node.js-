import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('../exemple.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  fromLine: 2,
  skipEmptyLines: true,
  delimiter: ',',
});

async function execute() {
  const linesParse = stream.pipe(csvParse);

  for await (const line of linesParse) {
    const [title, description] = line;

    console.log(line)

    await fetch('http://localhost:3334/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })

  }

}

execute()

