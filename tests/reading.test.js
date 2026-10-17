import test from "node:test";
import assert from "node:assert/strict";
import { daysBefore, readingSummary, loadSettings, loadSessions, defaultSettings } from "../src/data/reading.js";

const session = (date, extra = {}) => ({ id: date, date, title: "Fourth Wing", minutes: 20, pages: 12, finished: false, ...extra });

test("empty stats use real zeroes and include every day in the period", () => {
  const result = readingSummary([], "2026-10-07", 7);
  assert.equal(result.activity.length, 7);
  assert.equal(result.activity[0].date, "2026-10-01");
  assert.equal(result.activity[6].date, "2026-10-07");
  assert.equal(result.minutes, 0);
  assert.equal(result.streak, 0);
  assert.equal(result.finished, 0);
});

test("period totals exclude old and future logs, while goals count the year", () => {
  const result = readingSummary([
    session("2026-09-20", { finished: true }),
    session("2026-10-01"),
    session("2026-10-07", { minutes: 35 }),
    session("2026-10-08", { finished: true, title: "Future book" }),
  ], "2026-10-07", 7);
  assert.equal(result.minutes, 55);
  assert.equal(result.pages, 24);
  assert.equal(result.todayMinutes, 35);
  assert.equal(result.finished, 1);
});

test("streak counts consecutive days, tolerates unread today, and ignores duplicate sessions", () => {
  const entries = [session("2026-10-06"), session("2026-10-06"), session("2026-10-05"), session("2026-10-03")];
  assert.equal(readingSummary(entries, "2026-10-07", 7).streak, 2);
  assert.equal(readingSummary(entries, "2026-10-08", 7).streak, 0);
  assert.equal(readingSummary([...entries, session("2026-10-07")], "2026-10-07", 7).streak, 3);
});

test("finished books are distinct within the current calendar year", () => {
  const result = readingSummary([
    session("2025-12-31", { title: "Old book", finished: true }),
    session("2026-01-01", { finished: true }),
    session("2026-10-07", { title: " fourth wing ", finished: true }),
    session("2026-10-07", { title: "The Hobbit", finished: true }),
  ], "2026-10-07", 30);
  assert.equal(result.finished, 2);
  assert.equal(daysBefore("2026-01-01", 1), "2025-12-31");
});

test("storage reads recover from corrupt data and validate stored settings", () => {
  const original = globalThis.localStorage;
  try {
    globalThis.localStorage = { getItem: () => "invalid json" };
    assert.deepEqual(loadSettings(), defaultSettings);
    assert.deepEqual(loadSessions(), []);
    globalThis.localStorage = { getItem: () => JSON.stringify({ name: "Mira", annualGoal: -1, dailyMinutes: "oops", showSamples: false }) };
    assert.deepEqual(loadSettings(), { ...defaultSettings, name: "Mira", showSamples: false });
    globalThis.localStorage = { getItem: () => JSON.stringify([null, {}, session("2026-10-07")]) };
    assert.equal(loadSessions().length, 1);
  } finally {
    if (original === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = original;
  }
});
