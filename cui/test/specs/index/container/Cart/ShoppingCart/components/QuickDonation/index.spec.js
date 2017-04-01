import { fromJS } from "immutable";
import expect from "expect";
import React from "react";
import { shallow } from "enzyme";
import { Button, Dropdown } from "react-aaui";
import { QuickDonation } from "index/modules/Cart/ShoppingCart/components/QuickDonation";

import jsonQuickdonation from "Cart/ShoppingCart/get_quickdonation.json";

import context, { childContextTypes } from "utils/context";

const { body: { donations } } = jsonQuickdonation;
const initialState = fromJS({
  amount: null,
  selectedCampaign: null,
  selectedCampaignValue: null,
  donations: fromJS(donations),
  donationAmounts: fromJS([])
});

function setup(quickdonation = initialState, _context = context) {

  const actions = {
    changeAmountAction: expect.createSpy(),
    changeCampaignAction: expect.createSpy(),
    blurAmountAction: expect.createSpy()
  };

  const component = shallow( <
    QuickDonation quickdonation = { initialState } {...actions }
    />, { context: _context, childContextTypes });

  return {
    component: component,
    h3: component.find("h3"),
    Dropdown: component.find(Dropdown),
    actions: actions
  };
}

describe("index/modules/Cart/ShoppingCart/components/QuickDonation", () => {

  it("should render h3 tag", () => {
    const { h3 } = setup();
    expect(h3.length).toEqual(1);
  });

  it("should render Dropdown component", () => {
    const { Dropdown } = setup();
    expect(Dropdown.length).toEqual(1);
  });

  it("should call changeCampaignAction on switch campaign selection", () => {
    const { actions, Dropdown, eventArgs } = setup();
    Dropdown.simulate("change", { value: 99 });
    expect(actions.changeCampaignAction).toHaveBeenCalled();
  });
})
