# Sam Harris Transcript Slack Bot

# To Get Going

Create a new file under `config` called `dev.json` with the following:

```
{
  "clientId": "<The clientId from the Slack App>",
  "clientSecret": "<The clientSecret from the Slack App>"
}
```

NOTE: The file must be named `dev.json`. Also, do not commit it to git. It should be ignored automatically if it was named correctly.

````sh
$ npm install
$ npm start
````

## To Try It Out

Make an HTTP POST to http://localhost:8080/episode with a `x-www-form-urlencoded` and a `text=<episode number>` paramater.
