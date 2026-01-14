// Задание 1
function getArrayParams(...arr) {
  if (arr.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  const avg = Number((sum / arr.length).toFixed(2));

  return {
    min: min,
    max: max,
    avg: avg
  };
};

// Задание 2
function summElementsWorker(...arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((acc, curr) => acc + curr, 0);
}

function differenceMaxMinWorker(...arr) {
  if (arr.length === 0) return 0;
  return Math.max(...arr) - Math.min(...arr);
}

function differenceEvenOddWorker(...arr) {
  if (arr.length === 0) return 0;

  const evenSum = arr.filter(num => num % 2 === 0).reduce((a, b) => a + b, 0);
  const oddSum = arr.filter(num => num % 2 !== 0).reduce((a, b) => a + b, 0);

  return evenSum - oddSum;
}

function averageEvenElementsWorker(...arr) {
  if (arr.length === 0) return 0;

  const evenNumbers = arr.filter(num => num % 2 === 0);
  if (evenNumbers.length === 0) return 0;

  const sum = evenNumbers.reduce((a, b) => a + b, 0);
  return Number((sum / evenNumbers.length).toFixed(2));
}

// Задание 3
function makeWork(arrOfArr, func) {
  if (!arrOfArr || !arrOfArr.length) return null;

  let maxResult = -Infinity;

  for (let subArr of arrOfArr) {
    const currentResult = func(...subArr);
    if (currentResult > maxResult) {
      maxResult = currentResult;
    }
  }

  return maxResult;
}

// Проверка
function testCase() {
  console.log('Тестирование getArrayParams:');
  console.log(getArrayParams(-99, 99, 10));    // { min: -99, max: 99, avg: 3.33 }
  console.log(getArrayParams(1, 2, 3, -100, 10)); // { min: -100, max: 10, avg: -16.8 }
  console.log(getArrayParams(5));              // { min: 5, max: 5, avg: 5 }

  console.log('\nТестирование summElementsWorker:');
  console.log(summElementsWorker(1, 2, 3));    // 6
  console.log(summElementsWorker());           // 0
  console.log(summElementsWorker(10, -5, 3));  // 8

  console.log('\nТестирование differenceMaxMinWorker:');
  console.log(differenceMaxMinWorker(1, 2, 3));    // 2
  console.log(differenceMaxMinWorker(10, -5, 3));  // 15
  console.log(differenceMaxMinWorker(5));          // 0

  console.log('\nТестирование differenceEvenOddWorker:');
  console.log(differenceEvenOddWorker(1, 2, 3, 4)); // (2+4)-(1+3)=2
  console.log(differenceEvenOddWorker(10, 5, 3));   // 10-(5+3)=2
  console.log(differenceEvenOddWorker(1, 3, 5));    // 0-(1+3+5)=-9

  console.log('\nТестирование averageEvenElementsWorker:');
  console.log(averageEvenElementsWorker(1, 2, 3, 4)); // (2+4)/2=3
  console.log(averageEvenElementsWorker(1, 3, 5));    // 0
  console.log(averageEvenElementsWorker(2, 4, 6));    // 4

  console.log('\nТестирование makeWork:');
  console.log(makeWork([[1, 2, 3], [4, 5, 6]], summElementsWorker)); // [6, 15] => 15
  console.log(makeWork([[10, 10, 10], [5, 5, 5]], differenceMaxMinWorker)); // [0, 0] => 0
  console.log(makeWork([[1, 2, 4], [3, 6, 9]], differenceEvenOddWorker)); // [5, -6] => 5
  console.log(makeWork([[1, 2, 3, 4], [10, 20, 30]], averageEvenElementsWorker)); // [3, 20] => 20
}

testCase();