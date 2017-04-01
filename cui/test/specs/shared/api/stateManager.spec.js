"use strict";

import stateManager from "shared/api/stateManager";

describe("shared/api/stateManager", () => {

  describe("Method invoke: livingRequestCountUp", () => {
    it("Should increase livingRequest to be 1 if livingRequest is 0", () => {
      stateManager.livingRequest = 0;
      stateManager.livingRequestCountUp()
      expect(stateManager.livingRequest).to.equal(1);
    });
  });

  describe("Method invoke: livingRequestCountDown", () => {
    it("Should reduce livingRequest to be 0 if livingRequest is 1", () => {
      stateManager.livingRequest = 1;
      stateManager.livingRequestCountDown()
      expect(stateManager.livingRequest).to.equal(0);
    });
  });

  describe("Method invoke: resetState", () => {
    it("Should reset livingRequest to be 0 if livingRequest is 1", () => {
      stateManager.livingRequest = 1;
      stateManager.resetState()
      expect(stateManager.livingRequest).to.equal(0);
    });
  });

  describe("Method invoke: isEmptyLivingRequest", () => {
    it("Should be true if livingRequest is 0", () => {
      stateManager.livingRequest = 0;
      expect(stateManager.isEmptyLivingRequest()).to.equal(true);
    });
    it("Should be false if livingRequest is 1", () => {
      stateManager.livingRequest = 1;
      expect(stateManager.isEmptyLivingRequest()).to.equal(false);
    });
  });

});
