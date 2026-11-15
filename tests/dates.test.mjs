import test from 'node:test';
import assert from 'node:assert/strict';
import {formatDate} from '../src/lib/dates.mjs';

test('existing records retain UTC display dates', () => {
  assert.equal(formatDate('2026-09-08T23:59:00-07:00', 'en'), 'September 9, 2026');
});

test('historical research notes retain the source calendar day in every locale', () => {
  const timestamp = '2026-09-09T06:59:00.000Z';
  for (const locale of ['en', 'es', 'pt']) {
    const expected = new Intl.DateTimeFormat(locale, {dateStyle: 'long', timeZone: 'UTC'})
      .format(new Date('2026-09-08T12:00:00Z'));
    assert.equal(formatDate(timestamp, locale, 'America/Los_Angeles'), expected);
  }
});
