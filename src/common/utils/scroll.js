/**
 * 找到最近的有滚动条的父元素
 * @param element 当前元素
 * @param rootParent 设置根元素
 * @returns {父元素}
 */
export function getScrollEventTarget(element, rootParent = window) {
    let node = element;
    while (
        node &&
        node.tagName !== 'HTML' &&
        node.tagName !== 'BODY' &&
        node.nodeType === 1 &&
        node !== rootParent
        ) {
        const { overflowY } = window.getComputedStyle(node);
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return node;
        }
        node = node.parentNode;
    }
    return rootParent;
}

/**
 * 获取元素的可见区域高度
 * @param element
 * @returns {height}
 */
export function getVisibleHeight(element) {
    return element === window
        ? element.innerHeight
        : element.getBoundingClientRect().height;
}
/**
 * 获取scrollTop
 * @param element
 * @returns scrollTop
 */
export function getScrollTop(element) {
    return 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
}

/**
 * 获取元素距离文档的高度
 * @param element
 * @return height
 */
function getElementTop(element) {
    return element === window ? 0 : element.getBoundingClientRect().top +
        getScrollTop(window)
}