# mondo-webhook-mock

Small tool for mocking outgoing [Mondo](https://getmondo.co.uk) webhooks. At the moment just supports `transaction.created`.

Fields:
- Account ID*
- Transaction ID*
- Amount*
- Location*
- Endpoint

Fields marked * are random if empty (amount picks a number 0 to -25, locations picks randomly from the dropdown).

All amounts are GBP for now.

It's hosted on github pages at `rossmackay.co/mondo-webhook-mock`, so you'll want to set `Access-Control-Allow-Origin` to accept requests from that (or `*`)

Example payload: 
```json
{
  "type": "transaction.created",
  "data": {
    "account_id": "acc_kktt1qjrbuyxpqfrkktt1q",
    "amount": -14,
    "created": "2015-11-12T16:52:27.899Z",
    "currency": "GBP",
    "description": "Shoreditch Grind",
    "id": "tx_5mww73r7y20jatt95mww73"
  }
}
```
[Mondo transaction webhook docs](https://getmondo.co.uk/docs/#transaction-created)
