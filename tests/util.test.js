'use strict';

const { expect, describe, test } = require('@jest/globals');
const { Util, Constants } = require('../src');

describe('snakeToCamel', () => {
  test('max_width to maxWidth', () => {
    expect(Util.snakeToCamel('max_width')).toEqual('maxWidth');
  });

  test('content_id to contentID', () => {
    expect(Util.snakeToCamel('content_id')).toEqual('contentID');
  });
});

describe('mergeDefault', () => {
  const { DefaultOptions } = Constants;

  test('merge to empty object', () => {
    expect(Util.mergeDefault(DefaultOptions, {})).toEqual(DefaultOptions);
  });

  test('merge to object with other options', () => {
    expect(Util.mergeDefault(DefaultOptions, { test123: 124 })).toEqual({ ...DefaultOptions, test123: 124 });
  });

  test('merge to object with same options', () => {
    expect(Util.mergeDefault({ test4: 234 }, { test4: 45234, test123: 124 })).toEqual({
      test4: 45234,
      test123: 124,
    });
  });
});
