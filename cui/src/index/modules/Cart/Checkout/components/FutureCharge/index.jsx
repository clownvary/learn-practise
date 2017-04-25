import React from 'react';
import { connect } from 'react-redux';

import './index.less';

export const FutureCharge = () => (
  <div className="">
    <div className="splitline" />
    <h4>Future Charge</h4>
    <h5><p>Scelerisque nisl cum pretium a nisi erat ad
    vestibulum sit urna malesuada scelerisque eget velit in cras.</p></h5>
    <input type="checkbox" />
  </div>
);

export default connect(
  null,
  {}
)(FutureCharge);
