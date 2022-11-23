const {readFile, writeFile, lstat, readdir} = require('fs/promises');
const {resolve, join} = require('path');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

async function parseFile(filePath) {
  const file = await readFile(filePath, {encoding: 'utf-8'});
  const matches = [...file.matchAll(/marker: (.*) took (.*) ms/g)].map(
    match => [match[1], Number(match[2])],
  );

  return matches;
}

async function getFilesRecursively(path) {
  if ((await lstat(path)).isDirectory()) {
    const paths = (await readdir(path)).map(filePath => join(path, filePath));
    const filePaths = await Promise.all(
      paths.map(async filePath => {
        return getFilesRecursively(filePath);
      }),
    );

    return filePaths.flat();
  } else {
    return path;
  }
}

async function main() {
  const argv = yargs(hideBin(process.argv)).command(
    '$0 [files..]',
    'parse perf output',
    {
      out: {
        alias: 'o',
        description: 'output file path',
      },
      sort: {
        alias: 's',
        description: 'sort events alphabetically',
        default: false,
        type: 'boolean',
      },
      header: {
        alias: 'h',
        description: 'include header',
        default: false,
        type: 'boolean',
      },
    },
  ).argv;
  let filePaths = argv.files.map(path => resolve(process.cwd(), path));
  filePaths = (
    await Promise.all(filePaths.map(path => getFilesRecursively(path)))
  ).flat();

  if (!filePaths.length === 0) {
    throw 'Specify a path';
  }

  console.debug(`Parsing from files:`, filePaths);

  let result = [];

  await Promise.all(
    filePaths.map(async path => {
      const parsedResult = await parseFile(path);
      result = result.concat(parsedResult);
    }),
  );

  if (argv.sort) {
    result.sort(([name1], [name2]) => {
      return name1 > name2 ? 1 : -1;
    });
  }

  if (argv.out) {
    if (argv.header) {
      result.unshift(['event', 'time']);
    }

    const output = result.map(([name, count]) => `${name},${count}`);
    writeFile(argv.out, output.join('\n'));
  }

  console.log(result);
}

main();
