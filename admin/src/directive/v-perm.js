const hasPermission = requirePermission => {
    // 所有权限存储处
    let OperationCode = []
    return OperationCode.includes(requirePermission)
}

export default {
    name: 'perm',
    inserted: (el, binding) => {
        if (!hasPermission(binding.value)) {
            el.parentNode.removeChild(el)
        }
    }
}
export { hasPermission } // 如果页面的元素不支持v-perm指令，可以使用该方法引入到页面判断对应的权限码
