
const createRef = (ownerData, key, value) => {
  if (ownerData.length === 0) return {};
  const referenceObj = {};
  ownerData.forEach(elem => {
    const keys = elem[key];
    const values = elem[value];
    return (referenceObj[keys] = values);
  });
  return referenceObj;
};

const formatData = (dataToConvert, referenceObj, keyToReject, newKey) => {
  if (dataToConvert.length === 0) return [];
  const returnArr = [];
  dataToConvert.forEach(elem => {
    const { [keyToReject]: rejectedKey, ...restOfObject } = elem;
    returnArr.push({ [newKey]: referenceObj[rejectedKey], ...restOfObject });
  });
  return returnArr;
};
module.exports = { createRef, formatData };
