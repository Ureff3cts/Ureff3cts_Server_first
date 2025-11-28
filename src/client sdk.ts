Class Ureff3ctsClient {
  Constructor(private baseUrl: string, private apiKey: string) {}
  Async put(key: string, value: string) {
    Await fetch(`${this.baseUrl}/kv/${key}`, {
      Method: “PUT”,
      Headers: { “Content-Type”: “application/json”, “x-api-key”: this.apiKey },
      Body: JSON.stringify({ value }),
    });
  }
  Async get(key: string) {
    Const res = await fetch(`${this.baseUrl}/kv/${key}`, {
      Headers: { “x-api-key”: this.apiKey },
    });
    Return res.json();
  }
}

