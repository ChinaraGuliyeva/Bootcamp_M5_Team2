//Функция запроса баланса
export function getUserBalance() {
  return fetch(
    "https://5e8da89e22d8cd0016a798db.mockapi.io/users/2"
  ).then((res) => res.json());
}

//Функция смены баланса пользователя
export function changeBalance(newSumm) {
  return fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/2", {
    method: "PUT",
    body: JSON.stringify({
      id: "2",
      name: "Team two",
      currentBalance: newSumm,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
//Функция смены количества акций вместо добовления новый блок (Дополнительно)
export function changeStock(updatedStock) {
  fetch(
    "https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks/" +
    updatedStock.id,
    {
      method: "PUT",
      body: JSON.stringify({
        amount: updatedStock.amount,
        totalPrice: updatedStock.totalPrice,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
//Функция запроса к серверу акций
export function getStockData() {
  return fetch('https://financialmodelingprep.com/api/v3/company/stock/list')
    .then(res => res.text())
    .then(data => {
      // Пробуем распарсить полученные данные, если не получается - обрезаем
      try {
        return JSON.parse(data);
      } catch (err) {
        const lastRecStart = data.lastIndexOf('{');
        const trimmedData = data.substr(0, lastRecStart - 2) + ']}';
        return JSON.parse(trimmedData);
      }
    })
}

//Функция получения списка акций пользователя
export function getUserStocks() {
  return fetch(
    "https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks"
  ).then((res) => res.json());
}

//Функция добавления данных в список акций
export function addNewStock(obj) {
  fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks", {
    method: "POST",
    body: JSON.stringify({
      code: obj.symbol,
      name: obj.name,
      purchasePrice: obj.price,
      amount: obj.pieces,
      totalPrice: obj.pieces * obj.price,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Вспомогательная функция к getStockPricesFor. Делит массив на подмассивы заданной длины
const chunkArray = (myArray, chunk_size) => {
  let index = 0;
  let arrayLength = myArray.length;
  let tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
};

// Функция, которая возвращает нынешние цены по символам переданным в codes
export function getStockPricesFor(codes) {
  if (codes.length === 0) return Promise.resolve([]);

  // only get unique codes
  const uniqueCodes = Array.from(new Set(codes));

  const chunkedCodes = chunkArray(uniqueCodes, 3);
  const fetches = [];
  for (const chunk of chunkedCodes) {
    let codesString = chunk.join(",");
    fetches.push(
      fetch(
        `https://financialmodelingprep.com/api/v3/company/profile/${codesString}`
      )
    );
  }
  return Promise.all(fetches)
    .then((fetchResults) => {
      const results = [];
      fetchResults.forEach((res) => {
        results.push(res.json());
      });
      return Promise.all(results);
    })
    .then((res) => {
      return res.reduce((arr, row) => {
        if (!row.hasOwnProperty("companyProfiles")) return arr.concat(row);
        return arr.concat(row.companyProfiles);
      }, []);
    })
    .then((res) => {
      const final = res.map((item) => {
        return { symbol: item.symbol, price: item.profile.price };
      });
      return final;
    });
}

// ___ ДЛЯ ДОПОЛНИТЕЛЬНОГО ЗАДАНИЯ ___
// Функция, которая возвращает исторические данные для данного символа по датам
export function getHistoricalPrices(code, startDate, endDate) {
  return fetch(
    `https://financialmodelingprep.com/api/v3/historical-price-full/${code}?from=${startDate}&to=${endDate}`
  ).then((res) => res.json());
}


//Добавлено
export function sellStock(stockId, teamId) {
  fetch(
    `https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks/${stockId}`)
    .then(res => res.json())
    .then(data => console.log(data));
  fetch(
    `https://5e8da89e22d8cd0016a798db.mockapi.io/users/${teamId}`)
    .then(res => res.json())
    .then(data => console.log(data.currentBalance));
}


// обновленные данные об одной конкретной компании - добавлено Маликой
export function getOneStockData(code) {
  return fetch('https://financialmodelingprep.com/api/v3/company/profile/' + code)
    .then(res => res.json())
    .then(result => result)
    .catch(() => 'Произошла ошибка во время загрузки данных');
}

export async function getOneUserStockData(id) {
  return await fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks/' + id)
    .then(res => res.json())
    .then(result => result)
    .catch(() => 'Произошла ошибка во время загрузки данных');
}

export async function dltElementById(id) {
   await fetch(`https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks/${id}`, { method: 'DELETE' });
}

export async function updateElementById(id, obj) {
  fetch(`https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(obj), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
}

export async function updateBalance(updateBalance) {
  await fetch(`https://5e8da89e22d8cd0016a798db.mockapi.io/users/2`,
    {
      method: 'PUT',
      body: JSON.stringify({
        currentBalance: updateBalance
      }), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
}
