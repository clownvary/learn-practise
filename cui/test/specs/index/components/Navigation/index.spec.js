"use strict";

import { fromJS } from "immutable";
import expect from "expect";
import React from "react";
import { mount } from "enzyme";
import { Navigation } from "index/components/Master/components/Navigation/index";

import context, { childContextTypes } from "utils/context";

function setup(_context = context) {

  const actions = {
    fetchShoppingCartCountAction: expect.createSpy()
  };

  const component = mount(<Navigation transactionCount = { 1 } {...actions }/>, { context: _context, childContextTypes });

  return {
    component: component,
    HomeItem: component.find("HomeItem"),
    ActivitiesItem: component.find("ActivitiesItem"),
    CalendarItem: component.find("CalendarItem"),
    NormalItem: component.find("NormalItem"),
    MyCartItem: component.find("MyCartItem"),
    wrapElement: component.find(".cui-navigation-wrap"),
    containerElement: component.find(".cui-navigation"),
    placeholderElement: component.find(".placeholder"),
    actions: actions
  };
}

describe("index/components/Navigation/index", () => {

  it("should render out all expected Navigation child components", () => {
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup();
    expect(HomeItem.length).toEqual(1);
    expect(ActivitiesItem.length).toEqual(1);
    expect(CalendarItem.length).toEqual(1);
    expect(NormalItem.length).toEqual(5);
    expect(MyCartItem.length).toEqual(1);
  });

  it("should render HomeItem only.", () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        "title": "Home",
        "url": "http://apm.activenet.com"
      }]));
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup({...context, ... { systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(1);
    expect(ActivitiesItem.length).toEqual(0);
    expect(CalendarItem.length).toEqual(0);
    expect(NormalItem.length).toEqual(0);
    expect(MyCartItem.length).toEqual(0);
  });

  it("should render ActivitiesItem only.", () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        "title": "Activities",
        "url": "http://apm.activenet.com"
      }]));
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup({...context, ... { systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(1);
    expect(CalendarItem.length).toEqual(0);
    expect(NormalItem.length).toEqual(0);
    expect(MyCartItem.length).toEqual(0);
  });

  it("should render NormalItem only.", () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        "title": "Facilities",
        "url": "http://apm.activenet.com"
      }]));
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup({...context, ... { systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(0);
    expect(CalendarItem.length).toEqual(0);
    expect(NormalItem.length).toEqual(1);
    expect(MyCartItem.length).toEqual(0);
  });

  it("should render MyCartItem only.", () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        "title": "MyCart",
        "url": "http://apm.activenet.com"
      }]));
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup({...context, ... { systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(0);
    expect(CalendarItem.length).toEqual(0);
    expect(NormalItem.length).toEqual(0);
    expect(MyCartItem.length).toEqual(1);
  });

  it("should render CalendarItem only.", () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        "title": "Calendar",
        "url": "http://apm.activenet.com"
      }]));
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup({...context, ... { systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(0);
    expect(CalendarItem.length).toEqual(1);
    expect(NormalItem.length).toEqual(0);
    expect(MyCartItem.length).toEqual(0);
  });

  it("should render out expected wrap class.", () => {
    const { wrapElement } = setup();
    expect(wrapElement.length).toEqual(1);
  });

  it("should render out expected container class.", () => {
    const { containerElement } = setup();
    expect(containerElement.length).toEqual(1);
  });

  it("should render out expected placeholder element.", () => {
    const { placeholderElement } = setup();
    expect(placeholderElement.length).toEqual(1);
  });

  it("should call fetchShoppingCartCountAction in componentDidMount.", () => {
    const { actions } = setup();
    expect(actions.fetchShoppingCartCountAction).toHaveBeenCalled();
  });

})
