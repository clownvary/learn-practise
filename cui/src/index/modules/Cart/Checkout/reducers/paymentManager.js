import { fromJS } from 'immutable';
import { reducerHandler } from 'react-base-ui/lib/utils';

import {
  PAYMENT_REGISTER_MODULE,
  PAYMENT_CHANGE_TYPE,
  PAYMENT_SELECT_ITEM,
  PAYMENT_UPDATE_SAVED_CREDITCARDS,
  PAYMENT_UPDATE_SAVED_ECHECKS,
  PAYMENT_UPDATE_CREDIT_CARD_TYPES,
  PAYMENT_ADD_TEMP_CREDIT_CARD
} from '../consts/actionTypes';

import * as PaymentTypes from '../consts/paymentTypes';

const initialState = fromJS({
  modules: {}
});

/**
 * Helper method for updating the 'types' with specify type name.
 * For now, just update the 'list' according to its own 'totalList', 'tempList'
 * and the 'selectedType' of other modules.
 */
const updatePayType = (modules, moduleName, typeName) => {
  const typeItem = modules.getIn([moduleName, 'types', typeName]);
  const totalList = typeItem.get('totalList');
  const tempList = typeItem.get('tempList');
  let list = typeItem.get('list');

  const otherUsedTypeItemList = modules.remove(moduleName).toList().filter((md) => {
    const { isShow, types: { [typeName]: { selected } = false } } = md.toJS();
    return isShow && selected;
  }).map(md => md.getIn(['types', typeName, 'selected']));

  const allowedList = tempList.concat(totalList).filter(item => !otherUsedTypeItemList.find(c => c.get('id') === item.get('id')));
  /**
   * Keep the last order of the list , just update carts or put the new card into it.
   */
  allowedList.forEach((item) => {
    const index = list.findIndex(c => c.get('id') === item.get('id'));
    list = index === -1 ? list.push(item) : list.set(index, item);
  });
  return typeItem.set('list', list);
};

/**
 * Helper method for filling the needed contents to the corresponding module state.
 *    1. Fill 'totalList' for all 'type' of all modules with specify type name.
 *    2. If it is the first filling data, use the first one of the 'list'
 *       as the default value of 'selectedType'.
 */
const getFilledModulesByType = (modules, typeName, { totalList, tempList, cardTypes }) => {
  modules.forEach((module, moduleName) => {
    const typeIndexs = [moduleName, 'types', typeName];
    if (modules.getIn(typeIndexs)) {
      let originTempList = modules.getIn(typeIndexs.concat(['tempList']));
      if (totalList) {
        modules = modules.setIn(typeIndexs.concat(['totalList']), totalList);
      }
      if (tempList) {
        tempList.forEach((newItem) => {
          originTempList = originTempList.filter(item => item.get('id') !== newItem.get('id')).unshift(newItem);
        });
        modules = modules.setIn(typeIndexs.concat(['tempList']), originTempList);
      }
      if (cardTypes) {
        modules = modules.setIn(typeIndexs.concat(['cardTypes']), cardTypes);
      }
      const updatedPayType = updatePayType(modules, moduleName, typeName);
      modules = modules.setIn(typeIndexs, updatedPayType);

      const isSelectedType = modules.getIn([moduleName, 'selectedType']) === typeName;
      if (totalList && isSelectedType && !modules.getIn(typeIndexs.concat(['selected']))) {
        modules = modules.setIn(typeIndexs.concat(['selected']), modules.getIn(typeIndexs.concat(['list', 0])));
        modules.remove(moduleName).forEach((md, mdName) => {
          modules = modules.setIn([mdName, 'types', typeName], updatePayType(modules, mdName, typeName));
        });
      }
    }
  });
  return modules;
};

export const generateCardId = card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`);

export const handlers = {

  [PAYMENT_REGISTER_MODULE](state, { payload: { moduleName, module } }) {
    return state.withMutations((s) => {
      s.setIn(['modules', moduleName], module);
    });
  },

  [PAYMENT_UPDATE_SAVED_CREDITCARDS](state, { payload: savedCards }) {
    return state.withMutations((s) => {
      const creditCardTotalList = fromJS(savedCards).map(card => generateCardId(card));
      s.set('modules', getFilledModulesByType(s.get('modules'), PaymentTypes.CREDIT_CARD, { totalList: creditCardTotalList }));
    });
  },

  [PAYMENT_UPDATE_SAVED_ECHECKS](state, { payload: savedCards }) {
    return state.withMutations((s) => {
      const eCheckTotalList = fromJS(savedCards).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
      s.set('modules', getFilledModulesByType(s.get('modules'), PaymentTypes.ECHECK, { totalList: eCheckTotalList }));
    });
  },

  [PAYMENT_SELECT_ITEM](state, { payload: { moduleName, typeName, payItemId, toTop } }) {
    return state.withMutations((s) => {
      const typesIndexs = ['modules', moduleName, 'types'];
      const listData = s.getIn(typesIndexs.concat([typeName, 'list']));
      const selectedItem = listData.find(item => item.get('id') === payItemId);
      s.getIn(typesIndexs).forEach((tp, tpName) => {
        /**
         * If switched to another payment type and selcted one payment item under the type,
         * must clear all the 'selected' of its sibling ‘type’.
         */
        if (typeName !== tpName) {
          s.setIn(typesIndexs.concat([tpName, 'selected']), '');
        }
        /**
         * Each select will trigger an update from whole modules.
         */
        s.get('modules').forEach((md, mdName) => {
          if (s.getIn(['modules', mdName, 'types', tpName])) {
            s.setIn(['modules', mdName, 'types', tpName], updatePayType(s.get('modules'), mdName, tpName));
          }
        });
      });
      if (toTop && selectedItem) {
        s.setIn(
          typesIndexs.concat([typeName, 'list']),
          s.getIn(typesIndexs.concat([typeName, 'list'])).filter(item => item.get('id') !== payItemId).unshift(selectedItem)
        );
      }
      s.setIn(typesIndexs.concat([typeName, 'selected']), selectedItem);
    });
  },

  [PAYMENT_CHANGE_TYPE](state, { payload: { moduleName, typeName } }) {
    return state.withMutations((s) => {
      s.setIn(['modules', moduleName, 'selectedType'], typeName);
    });
  },

  [PAYMENT_UPDATE_CREDIT_CARD_TYPES](
    state, { payload: cardTypes }
  ) {
    return state.withMutations((s) => {
      s.set('modules', getFilledModulesByType(s.get('modules'), PaymentTypes.CREDIT_CARD, { cardTypes: fromJS(cardTypes) }));
    });
  },

  [PAYMENT_ADD_TEMP_CREDIT_CARD](state, { payload }) {
    return state.withMutations((s) => {
      s.set('modules', getFilledModulesByType(s.get('modules'), PaymentTypes.CREDIT_CARD, { tempList: fromJS([fromJS(payload)]) }));
    });
  }
};

export default reducerHandler(initialState, handlers);
