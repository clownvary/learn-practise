import {Component} from "react";
import {connect} from "react-redux";

export default class NetCUILink extends Component {

//API changed, so abandon this method, but retain this Component for handle old cui link.
  // getFinalUrl() {
  //   const {original_base_url, href} = this.props;
  //   if(!original_base_url) {
  //     return href;
  //   }
  //   const connectString = original_base_url.slice(-1) !== "/" ? "/" : "";
  //   return `${original_base_url}${connectString}${href}`;
  // }

  render() {
    return (
      <a {...this.props}>{this.props.children}</a>
    )
  }

};

// export default connect(
//   state => ({
//     original_base_url: state.systemSettings.get("original_base_url")
//   })
// )(NetCUILink);
