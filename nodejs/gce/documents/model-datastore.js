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

const {Datastore} = require('@google-cloud/datastore');
const background = require('../lib/background');

const ds = new Datastore();
const kind = 'document';

// Translates from Datastore's entity format to
// the format expected by the application.
//
// Datastore format:
//   {
//     key: [kind, id],
//     data: {
//       property: value
//     }
//   }
//
// Application format:
//   {
//     id: id,
//     property: value
//   }
function fromDatastore(obj) {
  obj.id = obj[Datastore.KEY].id;
  return obj;
}

// Translates from the application's format to the datastore's
// extended entity property format. It also handles marking any
// specified properties as non-indexed. Does not translate the key.
//
// Application format:
//   {
//     id: id,
//     property: value,
//     unindexedProperty: value
//   }
//
// Datastore extended format:
//   [
//     {
//       name: property,
//       value: value
//     },
//     {
//       name: unindexedProperty,
//       value: value,
//       excludeFromIndexes: true
//     }
//   ]
function toDatastore(obj, nonIndexed) {
  nonIndexed = nonIndexed || [];
  let results = [];
  Object.keys(obj).forEach(k => {
    if (obj[k] === undefined) {
      return;
    }
    results.push({
      name: k,
      value: obj[k],
      excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
    });
  });
  return results;
}

// Lists all documents in the Datastore sorted alphabetically by title.
// The ``limit`` argument determines the maximum amount of results to
// return per page. The ``token`` argument allows requesting additional
// pages. The callback is invoked with ``(err, documents, nextPageToken)``.
function list(limit, token, cb) {
  const q = ds
    .createQuery([kind])
    .limit(limit)
    .order('title')
    .start(token);

  ds.runQuery(q, (err, entities, nextQuery) => {
    if (err) {
      cb(err);
      return;
    }
    const hasMore =
      nextQuery.moreResults !== Datastore.NO_MORE_RESULTS
        ? nextQuery.endCursor
        : false;
    cb(null, entities.map(fromDatastore), hasMore);
  });
}

// Similar to ``list``, but only lists the documents created by the specified
// user.
function listBy(userId, limit, token, cb) {
  const q = ds
    .createQuery([kind])
    .filter('createdById', '=', userId)
    .limit(limit)
    .start(token);

  ds.runQuery(q, (err, entities, nextQuery) => {
    if (err) {
      cb(err);
      return;
    }
    const hasMore =
      nextQuery.moreResults !== Datastore.NO_MORE_RESULTS
        ? nextQuery.endCursor
        : false;
    cb(null, entities.map(fromDatastore), hasMore);
  });
}

// Creates a new document or updates an existing document with new data. The provided
// data is automatically translated into Datastore format. The document will be
// queued for background processing.
function update(id, data, queuedocument, cb) {
  let key;
  if (id) {
    key = ds.key([kind, parseInt(id, 10)]);
  } else {
    key = ds.key(kind);
  }

  const entity = {
    key: key,
    data: toDatastore(data, ['description']),
  };

  ds.save(entity, err => {
    if (err) {
      cb(err);
      return;
    }
    data.id = entity.key.id;
    if (queuedocument) {
      background.queuedocument(data.id);
    }
    cb(null, data);
  });
}

function read(id, cb) {
  const key = ds.key([kind, parseInt(id, 10)]);
  ds.get(key, (err, entity) => {
    if (!err && !entity) {
      err = {
        code: 404,
        message: 'Not found',
      };
    }
    if (err) {
      cb(err);
      return;
    }
    cb(null, fromDatastore(entity));
  });
}

function _delete(id, cb) {
  const key = ds.key([kind, parseInt(id, 10)]);
  ds.delete(key, cb);
}

module.exports = {
  create: (data, queuedocument, cb) => {
    update(null, data, queuedocument, cb);
  },
  read: read,
  update: update,
  delete: _delete,
  list: list,
  listBy: listBy,
};
