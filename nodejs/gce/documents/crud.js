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

const express = require('express');
const images = require('../lib/images');
const oauth2 = require('../lib/oauth2');

function getModel() {
  return require(`./model-${require('../config').get('DATA_BACKEND')}`);
}

const router = express.Router();

// Use the oauth middleware to automatically get the user's profile
// information and expose login/logout URLs to templates.
router.use(oauth2.template);

// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

/**
 * GET /documents
 *
 * Display a page of documents (up to ten at a time).
 */
router.get('/', (req, res, next) => {
  getModel().list(10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('documents/list.pug', {
      documents: entities,
      nextPageToken: cursor,
    });
  });
});

// Use the oauth2.required middleware to ensure that only logged-in users
// can access this handler.
router.get('/mine', oauth2.required, (req, res, next) => {
  getModel().listBy(
    req.user.id,
    10,
    req.query.pageToken,
    (err, entities, cursor) => {
      if (err) {
        next(err);
        return;
      }
      res.render('documents/list.pug', {
        documents: entities,
        nextPageToken: cursor,
      });
    }
  );
});

/**
 * GET /documents/add
 *
 * Display a form for creating a document.
 */
router.get('/add', (req, res) => {
  res.render('documents/form.pug', {
    document: {},
    action: 'Add',
  });
});

/**
 * POST /documents/add
 *
 * Create a document.
 */
// [START add]
router.post(
  '/add',
  images.multer.single('image'),
  images.sendUploadToGCS,
  (req, res, next) => {
    const data = req.body;

    // If the user is logged in, set them as the creator of the document.
    if (req.user) {
      data.createdBy = req.user.displayName;
      data.createdById = req.user.id;
    } else {
      data.createdBy = 'Anonymous';
    }

    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }

    // Save the data to the database.
    getModel().create(data, true, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  }
);
// [END add]

/**
 * GET /documents/:id/edit
 *
 * Display a document for editing.
 */
router.get('/:document/edit', (req, res, next) => {
  getModel().read(req.params.document, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('documents/form.pug', {
      document: entity,
      action: 'Edit',
    });
  });
});

/**
 * POST /documents/:id/edit
 *
 * Update a document.
 */
router.post(
  '/:document/edit',
  images.multer.single('image'),
  images.sendUploadToGCS,
  (req, res, next) => {
    const data = req.body;

    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
      req.body.imageUrl = req.file.cloudStoragePublicUrl;
    }

    getModel().update(req.params.document, data, true, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  }
);

/**
 * GET /documents/:id
 *
 * Display a document.
 */
router.get('/:document', (req, res, next) => {
  getModel().read(req.params.document, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('documents/view.pug', {
      document: entity,
    });
  });
});

/**
 * GET /documents/:id/delete
 *
 * Delete a document.
 */
router.get('/:document/delete', (req, res, next) => {
  getModel().delete(req.params.document, err => {
    if (err) {
      next(err);
      return;
    }
    res.redirect(req.baseUrl);
  });
});

/**
 * Errors on "/documents/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;
