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

const getRequest = require(`@google-cloud/nodejs-repo-tools`).getRequest;
const test = require(`ava`);

module.exports = DATA_BACKEND => {
  let originalDataBackend, id, testConfig, appConfig;

  test.before(() => {
    testConfig = require(`./_test-config`);
    appConfig = require(`../config`);
    originalDataBackend = appConfig.get(`DATA_BACKEND`);
    appConfig.set(`DATA_BACKEND`, DATA_BACKEND);
  });

  // setup a document
  test.serial.cb(`should create a document`, t => {
    getRequest(testConfig)
      .post(`/api/documents`)
      .send({title: `my document`})
      .expect(200)
      .expect(response => {
        id = response.body.id;
        t.truthy(response.body.id);
        t.is(response.body.title, `my document`);
      })
      .end(t.end);
  });

  test.serial.cb(`should show a list of documents`, t => {
    // Give Datastore time to become consistent
    setTimeout(() => {
      const expected = /<div class="media-body">/;
      getRequest(testConfig)
        .get(`/documents`)
        .expect(200)
        .expect(response => {
          t.regex(response.text, expected);
        })
        .end(t.end);
    }, 2000);
  });

  test.serial.cb(`should handle error`, t => {
    getRequest(testConfig)
      .get(`/documents`)
      .query({pageToken: `badrequest`})
      .expect(500)
      .end(t.end);
  });

  // delete the document
  test.serial.cb(t => {
    if (id) {
      getRequest(testConfig)
        .delete(`/api/documents/${id}`)
        .expect(200)
        .end(t.end);
    } else {
      t.end();
    }
  });

  test.serial.cb(`should post to add document form`, t => {
    const expected = /Redirecting to \/documents\//;
    getRequest(testConfig)
      .post(`/documents/add`)
      .field(`title`, `my document`)
      .expect(302)
      .expect(response => {
        const location = response.headers.location;
        const idPart = location.replace(`/documents/`, ``);
        if (DATA_BACKEND !== `mongodb`) {
          id = parseInt(idPart, 10);
        } else {
          id = idPart;
        }
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  test.serial.cb(`should show add document form`, t => {
    const expected = /Add document/;
    getRequest(testConfig)
      .get(`/documents/add`)
      .expect(200)
      .expect(response => {
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  // delete the document
  test.serial.cb(t => {
    if (id) {
      getRequest(testConfig)
        .delete(`/api/documents/${id}`)
        .expect(200)
        .end(t.end);
    } else {
      t.end();
    }
  });

  // setup a document
  test.serial.cb(`should delete a document`, t => {
    getRequest(testConfig)
      .post(`/api/documents`)
      .send({title: `my document`})
      .expect(200)
      .expect(response => {
        id = response.body.id;
        t.truthy(response.body.id);
        t.is(response.body.title, `my document`);
      })
      .end(t.end);
  });

  test.serial.cb(`should update a document`, t => {
    const expected = new RegExp(`Redirecting to /documents/${id}`);
    getRequest(testConfig)
      .post(`/documents/${id}/edit`)
      .field(`title`, `my other document`)
      .expect(302)
      .expect(response => {
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  test.serial.cb(`should show edit document form`, t => {
    const expected = /"title" value="my other document"/;
    getRequest(testConfig)
      .get(`/documents/${id}/edit`)
      .expect(200)
      .expect(response => {
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  test.serial.cb(`should show a document`, t => {
    const expected = /<h4>my other document&nbsp;<small><\/small><\/h4>/;
    getRequest(testConfig)
      .get(`/documents/${id}`)
      .expect(200)
      .expect(response => {
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  test.serial.cb(`should delete a document`, t => {
    const expected = /Redirecting to \/documents/;
    getRequest(testConfig)
      .get(`/documents/${id}/delete`)
      .expect(302)
      .expect(response => {
        id = undefined;
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  // clean up
  test.always.after.cb(t => {
    appConfig.set(`DATA_BACKEND`, originalDataBackend);

    if (id) {
      getRequest(testConfig)
        .delete(`/api/documents/${id}`)
        .expect(200)
        .end(t.end);
    } else {
      t.end();
    }
  });
};
