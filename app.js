const Koa = require('koa');
const router = require('koa-router')();
const request = require('request');
const parser = require('koa-bodyparser');
const config = require('config');

// Setup
const app = new Koa();
app.use(parser());

// Config
const clientId = config.get('clientId');
const clientSecret = config.get('clientSecret');
const port = config.get('port');

// Routes
router.get('/', async function(ctx, next) {
  ctx.body = 'hello world';
});

router.post('/episode', async function(ctx, next) {
  ctx.body = {
    "response_type": "in_channel",
    "text": `You asked to post episode ${ctx.request.body.text}`,
  };
});

// Slack OAuth route
router.get('/oauth', async function (ctx, next) {
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!ctx.query.code) {
      ctx.response.status = 500;
      ctx.body = { Error: 'Looks like we\'re not getting code.' };
    } else {
      // If it's there...

      // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
      request({
        url: 'https://slack.com/api/oauth.access', //URL to hit
        qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
        method: 'GET', //Specify the method
      }, function (error, response, body) {
        if (error) {
          console.log(error);
        } else {
          res.json(body);
        }
      })
    }
});

app.use(router.routes());

// Run Server
app.listen(8080);
console.log('listening on 8080');
