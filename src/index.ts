import { YahooChartResponse } from "./yahoo.charts.types";
import { YahooQuoteResponse, YahooQuoteResult } from "./yahoo.quotes.types";
import { RequestInfo, RequestInit } from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

export const getMultipleLTPs = async (
  symbols: string[]
): Promise<YahooQuoteResponse> => {
  const baseV6YahooFinanceURL =
    "https://query1.finance.yahoo.com/v6/finance/quote?symbols=";
  // add .NS to each symbol
  const symbolsWithNSE = symbols.map((symbol) => symbol + ".NS");
  const symbolsString = symbolsWithNSE.join(",");
  const url = baseV6YahooFinanceURL + symbolsString;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const getLTP = async (symbol: string): Promise<YahooQuoteResult> => {
  const baseV6YahooFinanceURL =
    "https://query1.finance.yahoo.com/v6/finance/quote?symbols=";
  const symbolWithNSE = symbol + ".NS";
  const url = baseV6YahooFinanceURL + symbolWithNSE;
  const response = await fetch(url);
  const json = await response.json();
  if (json.quoteResponse.result.length === 0) {
    throw new Error(`No result found for ${symbol}`);
  }
  return json.quoteResponse.result[0];
};

export const getHistoricalData = async (
  symbol: string,
  interval: string,
  range: string
): Promise<YahooChartResponse> => {
  validateFrame(range, "range");
  validateFrame(interval, "interval");
  const baseV8YahooFinanceURL =
    "https://query1.finance.yahoo.com/v8/finance/chart/";
  const symbolWithNSE = symbol + ".NS";
  const url = `${baseV8YahooFinanceURL}${symbolWithNSE}?&interval=${interval}&range=${range}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function validateFrame(frame: string, frameType: string) {
  // should begin with a number
  // should end with either d,mo,y, or max
  // should not contain any other characters
  const regex = /^[0-9]+[dmy]|max$/;
  if (!regex.test(frame)) {
    throw new Error("Invalid" + frameType);
  }
}
