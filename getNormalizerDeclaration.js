const _ = require('lodash');

export default (model) => {
  const camelCaseModelName = model.name[0].toLowerCase() + model.name.slice(1);

  const getRelations = (model) => {
    return _.reduce(model.relations, (acc, relation, relationName) => {
      if (relation.polymorphic) return acc;
      if (relation.type === 'hasMany') {
        return `${acc}\n  ${relationName}: [ ${relation.model[0].toLowerCase()}${relation.model.slice(1)} ],`
      } else if (relation.type === 'belongsTo' || relation.type === 'hasOne') {
        return `${acc}\n  ${relationName}: ${relation.model[0].toLowerCase()}${relation.model.slice(1)},`
      }
    }, "")
  }

  return `
  export const ${camelCaseModelName} = new schema.Entity('${camelCaseModelName}s', {${getRelations(model)}
  });
  export const ${camelCaseModelName}s = new schema.Array(${camelCaseModelName});
  export const ${camelCaseModelName}Map = new schema.Values(${camelCaseModelName});
  `
}
