import Vue from 'vue'
import comp from '../components/index'
import directives from '../directive/index'
function _forEachByObject (obj, projection) {
    try {
        Object.keys(obj).forEach((key) => {
            projection && projection(obj[key], key)
        })
    } catch (e) {  }
}
_forEachByObject(comp, (item) => {
    Vue.component(item.name, item)
})
_forEachByObject(directives, (item) => {
    Vue.directive(item.name, item)
})
export default {
    comp
}
