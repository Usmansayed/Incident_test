/**
 * Intentional failure — red test path for AegisOps demo.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("payment module (demo)", () => {
  it("should reconcile totals — DEMO: fails for webhook drill", () => {
    assert.equal(1 + 1, 3, "DEMO_INCIDENT: failed_test — intentional assert for CI demo");
  });
});
