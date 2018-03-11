import generateNormalizerFile from './generateNormalizerFile'

console.log(process.argv.length, process.argv);
if (process.argv.length < 3) {
  console.log('usage: normalize "LoopBack folder" [output file]');
  process.exit(1);
}

console.log('Generating file from loopback datas');
const normalizrFile = generateNormalizerFile(process.argv[2]);
if (process.argv[3]) {
  console.log('Saving datas');
  try {
    fs.writeFileSync(process.argv[3], normalizrFile);
  } catch (e) {
    console.log('save error: ', e, process.argv[3]);
    process.exit(2);
  }
} else {
  console.log(normalizrFile);
}
