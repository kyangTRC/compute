// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('../config');
const background = require('../lib/background');

let collection;

function fromMongo(item) {
  if (Array.isArray(item) && item.length) {
    item = item[0];
  }
  item.id = item._id;
  delete item._id;
  return item;
}

function toMongo(item) {
  delete item.id;
  return item;
}

function getCollection(cb) {
  if (collection) {
    setImmediate(() => {
      cb(null, collection);
    });
    return;
  }
  MongoClient.connect(config.get('MONGO_URL'), (err, client) => {
    if (err) {
      cb(err);
      return;
    }
    const db = client.db(config.get('MONGO_DB_NAME'));
    collection = db.collection(config.get('MONGO_COLLECTION'));
    cb(null, collection);
  });
}

function list(limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  if (isNaN(token)) {
    cb(new Error('invalid token'));
    return;
  }
  getCollection((err, collection) => {
    if (err) {
      cb(err);
      return;
    }
    collection
      .find({})
      .skip(token)
      .limit(limit)
      .toArray((err, results) => {
        if (err) {
          cb(err);
          return;
        }
        const hasMore =
          results.length === limit ? token + results.length : false;
        cb(null, results.map(fromMongo), hasMore);
      });
  });
}

function listBy(userId, limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  if (isNaN(token)) {
    cb(new Error('invalid token'));
    return;
  }
  getCollection((err, collection) => {
    if (err) {
      cb(err);
      return;
    }
    collection
      .find({createdById: userId})
      .skip(token)
      .limit(limit)
      .toArray((err, results) => {
        if (err) {
          cb(err);
          return;
        }
        const hasMore =
          results.length === limit ? token + results.length : false;
        cb(null, results.map(fromMongo), hasMore);
      });
  });
}

function create(data, queuedocument, cb) {
  getCollection((err, collection) => {
    if (err) {
      cb(err);
      return;
    }
    collection.insert(data, {w: 1}, (err, result) => {
      if (err) {
        cb(err);
        return;
      }
      const item = fromMongo(result.ops);
      if (queuedocument) {
        background.queuedocument(item.id);
      }
      cb(null, item);
    });
  });
}

function read(id, cb) {
  getCollection((err, collection) => {
    if (err) {
      cb(err);
      return;
    }
    collection.findOne(
      {
        _id: new ObjectID(id),
      },
      (err, result) => {
        if (!err && !result) {
          err = {
            code: 404,
            message: 'Not found',
          };
          return;
        }
        if (err) {
          cb(err);
          return;
        }
        cb(null, fromMongo(result));
      }
    );
  });
}

function update(id, data, queuedocument, cb) {
  getCollection((err, collection) => {
    if (err) {
      cb(err);
      return;
    }
    collection.update(
      {_id: new ObjectID(id)},
      {$set: toMongo(data)},
      {w: 1},
      err => {
        if (err) {
          cb(err);
          return;
        }
        if (queuedocument) {
          background.queuedocument(id);
        }
        read(id, cb);
      }
    );
  });
}

function _delete(id, cb) {
  getCollection((err, collection) => {
    if (err) {
      cb(err);
      return;
    }
    collection.remove(
      {
        _id: new ObjectID(id),
      },
      cb
    );
  });
}

module.exports = {
  create: create,
  read: read,
  update: update,
  delete: _delete,
  list: list,
  listBy: listBy,
};
