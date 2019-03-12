<template>
    <div class="list-container">
        <slot></slot>
    </div>
</template>

<script>
    import {getScrollEventTarget, getVisibleHeight, getScrollTop} from './common/utils/scroll';
    export default {
        name: "vue-list",
        data () {
            return {
                scroller: null

            }
        },
        model: {
            prop: 'loading'
        },
        props: {
            loading: Boolean,
            finished: Boolean,
            offset: Number
        },
        watch: {
            loading() {
                this.$nextTick(this.check);
            },

            finished() {
                this.$nextTick(this.check);
            }
        },
        mounted () {
            this.scroller = getScrollEventTarget(this.$el);
        },
        methods: {
            check () {
                if (this.loading || this.finished) return;
                const el = this.$el;
                const { scroller } = this;
                const scrollerHeight = getVisibleHeight(scroller);
                if (!scrollerHeight || window.getComputedStyle(el).display === 'none' || el.offsetParent === null) {
                    return;
                }
                const scrollTop = getScrollTop(scroller);
                const targetBottom = scrollTop + scrollerHeight;
                let reachBottom = false;
                if (el === scroller) {
                    reachBottom = scroller.scrollHeight - targetBottom < this.offset;
                } else {
                    const elBottom = getElementTop(el) - getElementTop(scroller) + getVisibleHeight(el);
                    reachBottom = elBottom - scrollerHeight < this.offset;
                }

                /* istanbul ignore else */
                if (reachBottom) {
                    this.$emit('input', true);
                    this.$emit('load');
                }

            }
        }
    }
</script>

<style scoped>

</style>