// 防重复点击
export default {
    name: 'preventRe',
    inserted: (el, binding) => {
        let timer
        el.addEventListener('click', () => {
            console.log(el)
            if (!el.disabled) {
                el.disabled = true
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    el.disabled = false
                }, binding.value || 3000)
            }
        })
    }
}
