function sellStock(stockId, teamId){
    fetch(
      `https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks/${stockId}`)
        .then(res => res.json())
        .then (data => console.log(data));
    fetch(
       `https://5e8da89e22d8cd0016a798db.mockapi.io/users/${teamId}`)
        .then(res => res.json())
        .then (data => console.log(data.currentBalance));
  }