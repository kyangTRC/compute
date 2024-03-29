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

const proxyquire = require(`proxyquire`).noPreserveCache();
const sinon = require(`sinon`);
const test = require(`ava`);

let background;
const mocks = {};

test.beforeEach(t => {
  // Mock dependencies used by background.js
  mocks.config = {
    SUBSCRIPTION_NAME: `shared-worker-subscription`,
    TOPIC_NAME: `document-process-queue`,
  };
  mocks.config.get = function(key) {
    return this[key];
  };
  mocks.subscription = {
    on: sinon.stub(),
  };
  mocks.topic = {
    createSubscription: sinon.stub().callsArgWith(1, null, mocks.subscription),
    publish: sinon.stub().callsArg(1, null),
  };
  mocks.pubsub = {
    createTopic: sinon.stub().callsArgWith(1, null, mocks.topic),
    topic: sinon.stub().returns(mocks.topic),
  };
  mocks.Pubsub = sinon.stub().returns(mocks.pubsub);
  mocks.logging = {
    info: sinon.stub(),
    error: sinon.stub(),
  };
  // Load background.js with provided mocks
  background = proxyquire(`../lib/background`, {
    '@google-cloud/pubsub': {PubSub: mocks.Pubsub},
    '../config': mocks.config,
    './logging': mocks.logging,
  });

  t.true(mocks.Pubsub.calledOnce, `Pubsub() should have been called once`);
});

test.serial.cb(`should subscribe and log message`, t => {
  // Setup
  const testMessage = {test: `foo`};

  // Run target functionality
  background.subscribe((err, message) => {
    // Assertions
    t.is(err, null);
    t.deepEqual(message, testMessage, `should have message`);
    t.true(
      mocks.pubsub.createTopic.calledOnce,
      `pubsub.createTopic() should have been called once`
    );
    t.is(
      mocks.pubsub.createTopic.firstCall.args[0],
      `document-process-queue`,
      `pubsub.createTopic() should have been called with the right args`
    );
    t.is(
      mocks.pubsub.topic.callCount,
      0,
      `pubsub.topic() should NOT have been called`
    );
    t.true(
      mocks.topic.createSubscription.calledOnce,
      `topic.createSubscription should have been called once`
    );
    t.is(
      mocks.topic.createSubscription.firstCall.args[0],
      `shared-worker-subscription`,
      `topic.createSubscription() should have been called with the right arguments`
    );
    t.true(
      mocks.subscription.on.calledTwice,
      `subscription.on should have been called twice`
    );
    t.is(
      mocks.subscription.on.firstCall.args[0],
      `message`,
      `subscription.on() should have been called with the right arguments`
    );
    t.true(
      typeof mocks.subscription.on.firstCall.args[1] === `function`,
      `subscription.on() should have been called with the right arguments`
    );
    t.is(
      mocks.subscription.on.secondCall.args[0],
      `error`,
      `subscription.on() should have been called with the right arguments`
    );
    t.true(
      typeof mocks.subscription.on.secondCall.args[1] === `function`,
      `subscription.on() should have been called with the right arguments`
    );
    t.end();
  });

  // Trigger a message
  setTimeout(() => {
    mocks.subscription.on.firstCall.args[1]({
      data: JSON.stringify(testMessage),
      ack: sinon.stub(),
    });
  }, 10);
});

test.serial.cb(`should return topic error, if any`, t => {
  // Setup
  const testErrorMsg = `test error`;
  mocks.pubsub.createTopic = sinon.stub().callsArgWith(1, testErrorMsg);

  // Run target functionality
  background.subscribe(data => {
    // Assertions
    t.true(
      mocks.pubsub.createTopic.calledOnce,
      `pubsub.createTopic() should have been called once`
    );
    t.is(
      mocks.pubsub.createTopic.firstCall.args[0],
      `document-process-queue`,
      `pubsub.createTopic() should have been called with the right args`
    );
    t.is(
      mocks.pubsub.topic.callCount,
      0,
      `pubsub.topic() should NOT have been called`
    );
    t.is(data, testErrorMsg);
    t.is(
      mocks.topic.createSubscription.callCount,
      0,
      `topic.createSubscription() should NOT have been called`
    );
    t.is(
      mocks.subscription.on.callCount,
      0,
      `subscription.on() should NOT have been called`
    );
    t.end();
  });
});

test.serial.cb(`should return subscription error, if any`, t => {
  // Setup
  const testErrorMsg = `test error`;
  mocks.topic.createSubscription = sinon.stub().callsArgWith(1, testErrorMsg);

  // Run target functionality
  background.subscribe(data => {
    // Assertions
    t.true(
      mocks.pubsub.createTopic.calledOnce,
      `pubsub.createTopic() should have been called once`
    );
    t.is(
      mocks.pubsub.createTopic.firstCall.args[0],
      `document-process-queue`,
      `pubsub.createTopic() should have been called with the right args`
    );
    t.is(
      mocks.pubsub.topic.callCount,
      0,
      `pubsub.topic() should NOT have been called`
    );
    t.true(
      mocks.topic.createSubscription.calledOnce,
      `topic.createSubscription should have been called once`
    );
    t.is(
      mocks.topic.createSubscription.firstCall.args[0],
      `shared-worker-subscription`,
      `topic.createSubscription() should have been called with the right arguments`
    );
    t.is(data, testErrorMsg);
    t.is(
      mocks.subscription.on.callCount,
      0,
      `subscription.on() should NOT have been called`
    );
    t.is(
      mocks.logging.info.callCount,
      0,
      `logging.info() should NOT have been called`
    );
    t.end();
  });
});

test.serial(`should queue a document and log message`, t => {
  // Setup
  const testdocumentId = 1;

  // Run target functionality
  background.queuedocument(testdocumentId);

  // Assertions
  t.true(
    mocks.pubsub.createTopic.calledOnce,
    `pubsub.createTopic() should have been called once`
  );
  t.is(
    mocks.pubsub.createTopic.firstCall.args[0],
    `document-process-queue`,
    `pubsub.createTopic() should have been called with the right arguments`
  );
  t.is(
    mocks.pubsub.topic.callCount,
    0,
    `pubsub.topic() should NOT have been called`
  );
  t.true(
    mocks.topic.publish.calledOnce,
    `topic.publish() should have been called once`
  );
  t.deepEqual(
    mocks.topic.publish.firstCall.args[0],
    Buffer.from(
      JSON.stringify({
        action: `processdocument`,
        documentId: testdocumentId,
      })
    ),
    `topic.publish() should have been called with the right arguments`
  );
  t.true(
    mocks.logging.info.calledOnce,
    `logging.info() should have been called`
  );
  t.is(
    mocks.logging.info.firstCall.args[0],
    `document ${testdocumentId} queued for background processing`,
    `logging.info() should have been called with the right arguments`
  );
});

test.serial(`should queue a document and log message even if topic exists`, t => {
  // Setup
  const testdocumentId = 1;
  mocks.pubsub.createTopic = sinon.stub().callsArgWith(1, {
    code: 6,
  });

  // Run target functionality
  background.queuedocument(testdocumentId);

  // Assertions
  t.true(
    mocks.pubsub.createTopic.calledOnce,
    `pubsub.createTopic() should have been called once`
  );
  t.is(
    mocks.pubsub.createTopic.firstCall.args[0],
    `document-process-queue`,
    `pubsub.createTopic() should have been called with the right arguments`
  );
  t.true(
    mocks.pubsub.topic.calledOnce,
    `pubsub.topic() should have been called once`
  );
  t.is(
    mocks.pubsub.topic.firstCall.args[0],
    `document-process-queue`,
    `pubsub.topic() should have been called with the right arguments`
  );
  t.true(
    mocks.topic.publish.calledOnce,
    `topic.publish() should have been called once`
  );
  t.deepEqual(
    mocks.topic.publish.firstCall.args[0],
    Buffer.from(
      JSON.stringify({
        action: `processdocument`,
        documentId: testdocumentId,
      })
    ),
    `topic.publish() should have been called with the right arguments`
  );
  t.true(
    mocks.logging.info.calledOnce,
    `logging.info() should have been called`
  );
  t.is(
    mocks.logging.info.firstCall.args[0],
    `document ${testdocumentId} queued for background processing`,
    `logging.info() should have been called with the right arguments`
  );
});

test.serial(`should log error if cannot get topic`, t => {
  // Setup
  const testdocumentId = 1;
  const testErrorMsg = `test error`;
  mocks.pubsub.createTopic = sinon.stub().callsArgWith(1, testErrorMsg);

  // Run target functionality
  background.queuedocument(testdocumentId);

  // Assertions
  t.true(
    mocks.pubsub.createTopic.calledOnce,
    `pubsub.createTopic() should have been called once`
  );
  t.is(
    mocks.pubsub.createTopic.firstCall.args[0],
    `document-process-queue`,
    `pubsub.createTopic() should have been called with the right arguments`
  );
  t.is(
    mocks.pubsub.topic.callCount,
    0,
    `pubsub.topic() should NOT have been called`
  );
  t.is(
    mocks.topic.publish.callCount,
    0,
    `topic.publish() should NOT have been called`
  );
  t.is(
    mocks.logging.info.callCount,
    0,
    `logging.info() should NOT have been called`
  );
  t.true(
    mocks.logging.error.calledOnce,
    `logging.error() should have been called`
  );
});

test.serial(`should log error if cannot publish message`, t => {
  // Setup
  const testdocumentId = 1;
  const testErrorMsg = `test error`;
  mocks.topic.publish = sinon.stub().callsArgWith(1, testErrorMsg);

  // Run target functionality
  background.queuedocument(testdocumentId);

  // Assertions
  t.true(
    mocks.pubsub.createTopic.calledOnce,
    `pubsub.createTopic() should have been called once`
  );
  t.is(
    mocks.pubsub.createTopic.firstCall.args[0],
    `document-process-queue`,
    `pubsub.createTopic() should have been called with the right arguments`
  );
  t.is(
    mocks.pubsub.topic.callCount,
    0,
    `pubsub.topic() should NOT have been called`
  );
  t.true(
    mocks.topic.publish.calledOnce,
    `topic.publish() should have been called once`
  );
});
