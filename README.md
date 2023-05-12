# NSE Quotes API

![npm version](https://img.shields.io/npm/v/nse-quotes-api)

I made this wrapper for easing my personal projects. It is a simple wrapper for the Yahoo Finance API. It is not an official API.

## Features

- Get latest quotes of single NSE stock ✨.
- Get latest quotes of `multiple` NSE stocks 🚀.
- Typescript support 🎉.

## Installation

```bash
npm install nse-quotes-api
```

## Usage

```js
const { getMultipleLTPs } = require("nse-quotes-api");

// Get quotes of single stock
const data = getLTP("INFY");

// Get quotes of multiple stocks
const data = getMultipleLTPs(["TCS", "INFY"]);
```
