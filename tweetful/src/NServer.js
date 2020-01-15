const API_Keys = require('./API_Keys');

const https = require('https');
const request = require('request');
const util = require('util');

const consumer_key = API_Keys.consumerKey; // Add your API key here
const consumer_secret = API_Keys.consumerSecret; // Add your API secret key here

const get = util.promisify(request.get);
const post = util.promisify(request.post);

const bearerTokenURL = new URL('https://api.twitter.com/oauth2/token');
const streamURL = new URL('https://api.twitter.com/labs/1/tweets/stream/sample');

async function bearerToken (auth) {
  const requestConfig = {
    url: bearerTokenURL,
    auth: {
      user: consumer_key,
      pass: consumer_secret,
    },
    form: {
      grant_type: 'client_credentials',
    },
    headers: {
      'User-Agent': 'TwitterDevSampledStreamQuickStartJS',
    },
  };

  const response = await post(requestConfig);
  return JSON.parse(response.body).access_token;
}

function streamConnect(token) {
  // Listen to the stream
  const config = {
    url: 'https://api.twitter.com/labs/1/tweets/stream/sample?format=compact',
    auth: {
      bearer: token,
    },
    headers: {
      'User-Agent': 'TwitterDevSampledStreamQuickStartJS',
    },
    timeout: 20000,
  };

  const stream = request.get(config);

  stream.on('data', data => {
    try {
      const json = JSON.parse(data);
      if(json.data.text.includes("new")){
        console.log("\nTweet");
        console.log(json.data);
      }
      
    } catch (e) {
      // Keep alive signal received. Do nothing.
    }
  }).on('error', error => {
    if (error.code === 'ETIMEDOUT') {
      stream.emit('timeout');
    }
  });

  return stream;
}

(async () => {
  let token;

  try {
    // Exchange your credentials for a Bearer token
    token = await bearerToken({consumer_key, consumer_secret});
  } catch (e) {
    console.error(`Could not generate a Bearer token. Please check that your credentials are correct and that the Sampled Stream preview is enabled in your Labs dashboard. (${e})`);
    process.exit(-1);
  }

  const stream = streamConnect(token);
  stream.on('timeout', () => {
    // Reconnect on error
    console.warn('A connection error occurred. Reconnecting…');
    streamConnect(token);
  });
})();