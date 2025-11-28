import fs from "fs";

type Record = { key: string; value: string; tombstone?: boolean };

export class Storage {
  private db: Map<string, Record> = new Map();
  private walFile = "wal.log";

  constructor() {
    if (fs.existsSync(this.walFile)) {
      const lines = fs.readFileSync(this.walFile, "utf-8").split("\n");
      for (const line of lines) {
        if (!line.trim()) continue;
        const rec: Record = JSON.parse(line);
        if (rec.tombstone) {
          this.db.delete(rec.key);
        } else {
          this.db.set(rec.key, rec);
        }
      }
    }
  }

  put(key: string, value: string) {
    const rec: Record = { key, value };
    fs.appendFileSync(this.walFile, JSON.stringify(rec) + "\n");
    this.db.set(key, rec);
  }

  get(key: string) {
    return this.db.get(key)?.value;
  }

  delete(key: string) {
    const rec: Record = { key, value: "", tombstone: true };
    fs.appendFileSync(this.walFile, JSON.stringify(rec) + "\n");
    this.db.delete(key);
  }
}

