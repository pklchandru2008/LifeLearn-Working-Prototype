import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile(new URL('../public/data/lessons.json', import.meta.url), 'utf8'));

test('sample lessons exist', () => {
  assert.ok(data.length >= 3);
});

test('each sample lesson has required fields', () => {
  for (const lesson of data) {
    assert.ok(lesson.id, 'lesson needs an id');
    assert.ok(lesson.title, 'lesson needs a title');
    assert.ok(lesson.category, 'lesson needs a category');
    assert.ok(Number.isInteger(lesson.durationMinutes) && lesson.durationMinutes > 0,
      'durationMinutes must be a positive integer');
  }
});

test('sample lesson IDs are unique', () => {
  const ids = data.map(x => x.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('LifeLearn categories include digital and cyber safety', () => {
  assert.ok(data.some(x => x.category === 'Digital & Cyber Safety'));
});
