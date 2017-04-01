import Bluebird from "bluebird";

export default function() {
  Bluebird.config({
      warnings: false,
      cancellation: true
  });
}
