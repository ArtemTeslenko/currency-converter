const headers = {
  apikey: "7N00fjPSop5Up7R5WtFDOtPGjXPbJKQm",
};

export const getBasicRate = async (to, from, mainToSecondary) => {
  const ccy1 = mainToSecondary ? to : from;
  const ccy2 = mainToSecondary ? from : to;

  return await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${ccy1}&from=${ccy2}&amount=1`,
    {
      headers,
    }
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));
};

export const getConvertedAmount = async (to, from, mainToSecondary, amount) => {
  const ccy1 = mainToSecondary ? to : from;
  const ccy2 = mainToSecondary ? from : to;

  return await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${ccy1}&from=${ccy2}&amount=${amount}`,
    {
      headers,
    }
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));
};

export const getCcyList = async () => {
  return await fetch(`https://api.apilayer.com/exchangerates_data/symbols`, {
    headers,
  })
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));
};
