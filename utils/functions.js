
const formatTime = (inputArr) => {
  if (inputArr.length === 0) return []
  const formattedArr = inputArr.map(singleObject => {
  const newObj = { ...singleObject };
  newObj.created_at = new Date(newObj.created_at);
  return newObj
  })
  return formattedArr

}

const createRef = (data, key, value) => {
  return {}
};

const formatData = (dataToConvert, referenceObj, keyToReject, newKey) => {

};
module.exports = { createRef, formatData, formatTime };
