import { fromJS } from "immutable";
import expect from "expect";
import React from "react";
import { mount } from "enzyme";
import { SecondaryMenu } from "index/components/Master/components/Navigation/SecondaryMenu";

import activities from "./data/activities";
import context, { childContextTypes } from "utils/context";

const items = activities.children;

function setup(_row, _column, _items = items, _context = context) {

  const component = mount( <
    SecondaryMenu row = { _row }
    column = { _column }
    items = { fromJS(_items) }
    />, { context: _context, childContextTypes });

    return {
      component: component,
      rows: component.find(".Nav-secondary-menu-column").first().find("li"),
      columns: component.find(".Nav-secondary-menu-column"),
      containerElement: component.find(".Nav-secondary-menu"),
      aHref: component.find("a").at(0).props().href
    };
  }

  describe("index/components/Navigation/SecondaryMenu", () => {

    it("should render dom based on the default row and column.", () => {
      const { rows, columns } = setup();
      expect(rows.length).toEqual(5);
      expect(columns.length).toEqual(3);
    });

    it("should render dom based on the specified row and column.", () => {
      const { rows, columns } = setup(1, 2);
      expect(rows.length).toEqual(1);
      expect(columns.length).toEqual(2);
    });

    it("should render out expected container class.", () => {
      const { containerElement } = setup();
      expect(containerElement.length).toEqual(1);
    });

    it("should render out expected item class.", () => {
      const { columns } = setup();
      expect(columns.length).toEqual(3);
    });

    /**
     * From the view of code implementation,
     * just verify one link herf is enough for this case.
     */
    it("The item link rendered out should be equal to item.url.", () => {
      const { aHref } = setup();
      expect(aHref).toEqual(items[0].url);
    });

  })
