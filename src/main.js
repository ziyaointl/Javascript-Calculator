import Vue from 'vue'
import App from './App.vue'

window.Event = new Vue();
new Vue({
    el: '#app',
    render: h => h(App)
});

window.onkeypress = function (e) {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
        Event.$emit('pressedNum', e.keyCode - 48);
    }
    switch (e.keyCode) {
        case 42:
            Event.$emit('pressedMultiply');
            break;
        case 47:
            Event.$emit('pressedDivide');
            break;
        case 43:
            Event.$emit('pressedAdd');
            break;
        case 45:
            Event.$emit('pressedMinus');
            break;
        case 13:
        case 61:
            Event.$emit('pressedEqual');
            break;
        case 67:
        case 99:
            Event.$emit('pressedClear');
            break;
    }
};