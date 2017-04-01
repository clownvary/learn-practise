"use strict";

import API from "shared/api/API";

describe("shared/api/API", () => {

  let api = null;

  beforeEach(function () {
    api = new API();
  });

  describe("REST API Methods", () => {
    it("Should has six REST API invoking functions", () => {
      expect(api.get).to.be.a("function");
      expect(api.post).to.be.a("function");
      expect(api.put).to.be.a("function");
      expect(api.patch).to.be.a("function");
      expect(api.delete).to.be.a("function");
      expect(api.head).to.be.a("function");
    });
  });

  describe("REST API GET", () => {
    it("Should return a promise", () => {

    });
  });

});
