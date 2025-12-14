"use strict";

function solveEquation(a, b, c) {
  let arr = [];

  if (a === 0) {
    return arr;
  }

  const discriminant = b ** 2 - 4 * a * c;

  if (discriminant < 0) {
    return arr;
  } else if (discriminant === 0) {
    const root = -b / (2 * a);
    arr.push(root);
    return arr;
  } else {
    const sqrtD = Math.sqrt(discriminant);
    const root1 = (-b + sqrtD) / (2 * a);
    const root2 = (-b - sqrtD) / (2 * a);
    arr.push(root1, root2);
    return arr;
  }
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  percent = Number(percent);
  contribution = Number(contribution);
  amount = Number(amount);
  countMonths = Number(countMonths);

  if (
    isNaN(percent) ||
    isNaN(contribution) ||
    isNaN(amount) ||
    isNaN(countMonths) ||
    percent <= 0 ||
    contribution < 0 ||
    amount <= 0 ||
    countMonths <= 0
  ) {
    return false;
  }

  if (contribution > amount) {
    return false;
  }

  const monthlyRate = percent / 100 / 12;

  const loanBody = amount - contribution;

  if (loanBody <= 0) {
    return 0;
  }

  const monthlyPayment =
    loanBody *
    (monthlyRate + monthlyRate / (Math.pow(1 + monthlyRate, countMonths) - 1));

  const totalInterest = monthlyPayment * countMonths;

  const totalPayment = contribution + totalInterest;

  return Number(totalPayment.toFixed(2));
}

function testCase() {
  console.log("=== Проверка результатов ===");

  console.log("\nТесты для задания 1");

  // Два корня
  const test1 = solveEquation(1, -3, 2);
  console.log("solveEquation(1, -3, 2) =", test1);
  console.log("Ожидается: [2, 1]");
  console.log(
    "Результат:",
    JSON.stringify(test1) === JSON.stringify([2, 1]) ? "УСПЕШНО" : "ОШИБКА",
  );

  // Один корень
  const test2 = solveEquation(1, 2, 1);
  console.log("solveEquation(1, 2, 1) =", test2);
  console.log("Ожидается: [-1]");
  console.log(
    "Результат:",
    JSON.stringify(test2) === JSON.stringify([-1]) ? "УСПЕШНО" : "ОШИБКА",
  );

  // Нет корней
  const test3 = solveEquation(1, 1, 1);
  console.log("solveEquation(1, 1, 1) =", test3);
  console.log("Ожидается: []");
  console.log(
    "Результат:",
    JSON.stringify(test3) === JSON.stringify([]) ? "УСПЕШНО" : "ОШИБКА",
  );

  console.log("\nТесты для задания 2");

  // Ожидаемый результат: 52749.53
  const test4 = calculateTotalMortgage(10, 0, 50000, 12);
  console.log("calculateTotalMortgage(10, 0, 50000, 12) =", test4);
  console.log("Ожидается: 52749.53");
  console.log(
    "Результат:",
    Math.abs(test4 - 52749.53) < 0.01 ? "УСПЕШНО" : "ОШИБКА",
  );

  // Ожидаемый результат: 51694.54
  const test5 = calculateTotalMortgage(10, 1000, 50000, 12);
  console.log("calculateTotalMortgage(10, 1000, 50000, 12) =", test5);
  console.log("Ожидается: 51694.54");
  console.log(
    "Результат:",
    Math.abs(test5 - 51694.54) < 0.01 ? "УСПЕШНО" : "ОШИБКА",
  );

  // Взнос равен сумме кредита (вывод: 0)
  const test6 = calculateTotalMortgage(10, 20000, 20000, 24);
  console.log("calculateTotalMortgage(10, 20000, 20000, 24) =", test6);
  console.log("Ожидается: 0");
  console.log("Результат:", test6 === 0 ? "УСПЕШНО" : "ОШИБКА");

  console.log("\n=== ВСЕ ТЕСТЫ ЗАВЕРШЕНЫ ===");
}
