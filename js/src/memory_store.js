/* @flow */

import Chunk from './chunk.js';
import Ref from './ref.js';

export default class MemoryStore {
  _data: { [key: string]: Chunk };
  _root: Ref;

  constructor() {
    this._data = Object.create(null);
    this._root = new Ref();
  }

  async getRoot(): Promise<Ref> {
    return this._root;
  }

  async updateRoot(current: Ref, last: Ref): Promise<boolean> {
    if (!this._root.equals(last)) {
      return false;
    }

    this._root = current;
    return true;
  }

  async get(ref: Ref): Promise<Chunk> {
    let c = this._data[ref.toString()];
    if (!c) {
      c = Chunk.emptyChunk;
    }

    return c;
  }

  async has(ref: Ref): Promise<boolean> {
    return this._data[ref.toString()] !== undefined;
  }

  put(c: Chunk) {
    this._data[c.ref.toString()] = c;
  }

  get size(): number {
    return Object.keys(this._data).length;
  }

  close() {}
}