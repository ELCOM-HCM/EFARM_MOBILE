/**
 *
 * @author DangTM R&D Department
 * @date Jun 12, 2017
 * @addr ELCOM-HCM
 *
 */
import Common from "./Common";
var Widget = {
  TRANSPORTER: null,
  /**
   * Send data IOS Handler
   */
  setDataIOS: function() {
    window.webkit.messageHandlers.callNative.postMessage(
      JSON.stringify({ cmd: "set", key: "1", value: "Message" })
    );
  },
  getDataIOS: function() {
    window.webkit.messageHandlers.callNative.postMessage(
      JSON.stringify({ cmd: "get", key: "1", action: "Widget.receiveDataIOS" })
    );
  },
  /**
   * Receive data from IOS
   */
  receiveDataIOS: function(result) {
    console.log(result);
    return result;
  },
  /**
   * Send data Android Handler
   * obj template set: {cmd:'set', key:'IS_NOTIFY', value:'0/1'}
   * obj template get: {cmd:'get', key:'IS_NOTIFY', value:'', action:'ELC.getData'}
   * key: SERVER, USER_ID
   */
  callAndroid: function(obj) {
    console.log("Call Native " + JSON.stringify(obj));
    if (Common.isAndroid()) {
      try {
        Android.callNative(JSON.stringify(obj));
      } catch (ex) {
        //TSM.TRANSPORTER = -1;
        console.log(ex);
      }
    }
  },
  callIOS: function(obj) {
    console.log("Call Native " + JSON.stringify(obj));
    if (Common.isIOS()) {
      try {
        window.webkit.messageHandlers.callNative.postMessage(
          JSON.stringify(obj)
        );
      } catch (ex) {
        //TSM.TRANSPORTER = -1;
        console.log(ex);
      }
    }
  },
  /**
   *
   * Receive data from Android
   *
   */
  getDataAndroid: function(result) {
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Receive From Android " +
        result
    );
    Widget.TRANSPORTER = result;
    return result;
  }
};
export default Widget;
