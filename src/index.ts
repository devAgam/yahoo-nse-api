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
