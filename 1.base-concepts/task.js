const getArrayParams = (...arr) => {
  if (arr.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }
  
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  const roundedAvg = Number((sum / arr.length).toFixed(2));
    
  return {
    min: min,
    max: max,
    avg: roundedAvg
  };
};

const testCase = () => {
  console.log('Проверка 1 для 1 задания:', getArrayParams(-99, 99, 10));
  console.log('Проверка 2 для 1 задания:', getArrayParams(1, 2, 3, -100, 10));
  console.log('Проверка 3 для 1 задания:', getArrayParams(5));
};

module.exports = {
  getArrayParams,
  testCase
};

testCase();
