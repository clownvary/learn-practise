import { fromJS } from "immutable";
import expect from "expect";
import React from "react";
import { mount } from "enzyme";
import { ActivitiesItem } from "index/components/Master/components/Navigation/ActivitiesItem";
import { SecondaryMenu } from "index/components/Master/components/Navigation/SecondaryMenu";

import { getNavItemStyles } from "shared/styles/themes/customize";

import fixedItemData from "./data/activities";
import context, { childContextTypes } from "utils/context";

const itemStyles = getNavItemStyles(context.theme);
const expectedItem = context.systemSettings.getIn(['navigation', 'menus', 1]);

function setup(_item = expectedItem, _itemStyles = itemStyles, _context = context) {

  const component = mount( <
    ActivitiesItem item = { fromJS(_item) }
    itemStyles = { _itemStyles }
    />, { context: _context, childContextTypes });

    return {
      component: component,
      SecondaryMenu: component.find("SecondaryMenu"),
      labelText: component.find("a").first().text(),
      rows: component.find(".Nav-secondary-menu-column").first().find("li"),
      columns: component.find(".Nav-secondary-menu-column"),
      containerElement: component.find(".Nav-activities-item"),
      hasSecondaryMenuClassOnLi: component.find(".Nav-has-secondary-menu"),
      aHref: component.find("a").at(0).props().href
    };
  }

  describe("index/components/Navigation/ActivitiesItem", () => {

    it("should render SecondaryMenu component", () => {
      const { SecondaryMenu } = setup();
      expect(SecondaryMenu.length).toEqual(1);
    });

    it("should display wording label.", () => {
      const { labelText } = setup();
      expect(labelText).toEqual(context.getWording('online_activities_label'));
    });

    it("should display default label.", () => {
      const newConfigurations = context.configurations.set('online_activities_label', null);
      const newContext = {
        configurations: newConfigurations,
        getWording: (key) => {
          return context.getWording(key, newConfigurations);
        }
      };
      const { labelText } = setup(undefined, undefined, {...context, ...newContext });
      expect(labelText).toEqual(expectedItem.get('title'));
    });

    it("should render SecondaryMenu that should be 4 columns.", () => {
      const { columns } = setup(fixedItemData);
      expect(columns.length).toEqual(4);
    });

    it("should render SecondaryMenu that should be 6 rows.", () => {
      const { rows } = setup(fixedItemData);
      expect(rows.length).toEqual(6);
    });

    it("should render out expected container class.", () => {
      const { containerElement } = setup();
      expect(containerElement.length).toEqual(1);
    });

    it("should render out expected class to control secondary menu.", () => {
      const { hasSecondaryMenuClassOnLi } = setup();
      expect(hasSecondaryMenuClassOnLi.length).toEqual(1);
    });

    it("The item link rendered out should be equal to item.url.", () => {
      const { aHref } = setup();
      expect(aHref).toEqual(expectedItem.get('url'));
    });

  })
