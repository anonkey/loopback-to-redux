const fs = require('fs');
const _ = require('lodash');
import getNormalizerDeclaration from './getNormalizerDeclaration'

export default (modelFolderPath) => {
  let dir = null;
  let declarations = '';

  try {
    dir = fs.readdirSync(modelFolderPath);
  } catch (e) {
    console.log('error:', e, modelFolderPath);
    process.exit(3);
  }
  dir.forEach((filePath) => {
    if (filePath.match(/.json$/)) {
      try {
        const model = JSON.parse(fs.readFileSync(modelFolderPath + '/' + filePath));
        declarations += getNormalizerDeclaration(model);
      } catch (e) {
        console.log('file error', e, filePath);
      }
    }
  });
  return `import { normalize, schema } from 'normalizr';

${declarations}
`
  //console.log('FILE: ', process.argv[2]);
  //console.log('ModelName: ', modelName);
  //console.log('Camel ModelName: ', camelCaseModelName);
}
