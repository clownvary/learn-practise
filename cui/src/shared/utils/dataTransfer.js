import {isImmutable} from 'shared/utils/data-access';
import CircularJSON from "shared/utils/circularJson";
import hash from 'shared/utils/stringHash';

export const toJson=(x)=>CircularJSON.parse(CircularJSON.stringify(x));

export const toString=(x)=>{
  isImmutable(x) && (x=x.toJS());
  typeof x ==='object' && (x=CircularJSON.stringify(x));
  return x
};

export const getHash=(x)=>{
  return hash(toString(x));
};
