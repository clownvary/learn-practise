/**
 * Created by wangyan on 16/9/8.
 */
'use strict';
function testable(target) {
    target.isTestable = 'ssss';
}



class Math {
    @log
    add(a, b) {
        return a + b;
    }
}
function log(target, name, descriptor) {
    var oldValue = descriptor.value;

    descriptor.value = function() {
        console.log(`Calling "${name}" with`, arguments);
        return oldValue.apply(null, arguments);
    };

    return descriptor;
}
export default Math;

