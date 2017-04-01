"use strict";

import { fromJS } from "immutable";
import expect from "expect";
import React from "react";
import { mount } from "enzyme";
import { MyCartItem } from "index/components/Master/components/Navigation/MyCartItem";

import { getNavItemStyles } from "shared/styles/themes/customize";
import context, { childContextTypes } from "utils/context";

const itemStyles = getNavItemStyles(context.theme);
const item = {
  "title": "MyCart",
  "url": "/newcart",
  "children": []
};

function setup(_count, _item = item, _itemStyles = itemStyles, _context = context) {

  const component = mount(< MyCartItem item={ fromJS(_item) } cartCount={ _count } itemStyles={ _itemStyles } />, {
    context: _context,
    childContextTypes
  });

  return {
    component: component,
    labelText: component
      .find("a")
      .first()
      .text(),
    containerElement: component.find(".mycart"),
    iconElement: component.find(".icon.icon-uniF07A"),
  // aHref: component.find("a").props().href
  };
}

describe("index/components/Navigation/MyCartItem", () => {

  it("should display wording label + count.", () => {
    const {labelText} = setup(1);
    const expectedLabel = `${context.getWording('my_cart_label')} (1)`;
    expect(labelText).toEqual(expectedLabel);
  });

  it("should display default label + count.", () => {
    const newConfigurations = context
      .configurations
      .set('my_cart_label', null);
    const newContext = {
      configurations: newConfigurations,
      getWording: (key) => {
        return context.getWording(key, newConfigurations);
      }
    };
    const {labelText} = setup(2, undefined, undefined, {
      ...context,
      ...newContext
    });
    const expectedLabel = `${item.title} (2)`;
    expect(labelText).toEqual(expectedLabel);
  });

  it("should render out expected container class.", () => {
    const {containerElement} = setup();
    expect(containerElement.length).toEqual(1);
  });

  it("should render out expected icon class.", () => {
    const {iconElement} = setup();
    expect(iconElement.length).toEqual(1);
  });

  /**
     * TODO: Need to mock a 'react-router' to test the Link and Indexlink of react-router,
     * otherwise we only get '<a>'.
     */
  // it("The item link rendered out should be equal to item.url.", () => {   const
  // {aHref} = setup();   expect(aHref).toEqual(item.url); });

})
