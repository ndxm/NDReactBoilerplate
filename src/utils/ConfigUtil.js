/**
 * 获得配置文件
 */
import $ from "jquery";
import Q from "q";
let ConfigPromise = () => {
    return Q($.getJSON("../config.json")).then((data) => {
        return data;
    });
};
export default ConfigPromise();
