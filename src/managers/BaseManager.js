'use strict';

class BaseManager {
  constructor(client, iterable, holds) {
    this.client = client;
    this.holds = holds;
    this.cache = new Map();
    if (iterable) for (const i of iterable) this.add(i);
  }

  add(data, cache = true) {
    const existing = this.cache.get(data.id);
    if (existing && existing._patch && cache) existing._patch(data);
    if (existing) return existing;

    const entry = this.holds ? new this.holds(this.client, data) : data;
    if (cache) this.cache.set(entry.id, entry);
    return entry;
  }

  resolve(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance;
    if (typeof idOrInstance === 'number') return this.cache.get(idOrInstance) || null;
    return null;
  }

  resolveID(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance.id;
    if (typeof idOrInstance === 'string') return idOrInstance;
    return null;
  }

  valueOf() {
    return this.cache;
  }
}

module.exports = BaseManager;
