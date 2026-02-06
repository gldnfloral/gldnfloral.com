import { describe, expect, it } from "vitest";

import {
  clientNotes,
  processSteps,
  servicePillars,
  studioStats
} from "../src/lib/home";

describe("home content data", () => {
  it("defines at least three service pillars", () => {
    expect(servicePillars.length).toBeGreaterThanOrEqual(3);

    for (const pillar of servicePillars) {
      expect(pillar.label.length).toBeGreaterThan(0);
      expect(pillar.description.length).toBeGreaterThan(20);
      expect(pillar.notes.length).toBeGreaterThanOrEqual(3);
      expect(pillar.href.startsWith("/")).toBe(true);
    }
  });

  it("defines a complete four-step process", () => {
    expect(processSteps.length).toBe(4);

    const titles = processSteps.map((step) => step.title);
    expect(new Set(titles).size).toBe(titles.length);

    for (const step of processSteps) {
      expect(step.detail.length).toBeGreaterThan(20);
    }
  });

  it("defines exactly four studio stats", () => {
    expect(studioStats.length).toBe(4);

    for (const stat of studioStats) {
      expect(stat.label.length).toBeGreaterThan(0);
      expect(stat.value.length).toBeGreaterThan(0);
    }
  });

  it("includes at least two client notes", () => {
    expect(clientNotes.length).toBeGreaterThanOrEqual(2);

    for (const note of clientNotes) {
      expect(note.client.length).toBeGreaterThan(0);
      expect(note.quote.length).toBeGreaterThan(30);
    }
  });
});
