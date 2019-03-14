<template>
    <div class="list-container">
        <slot></slot>
        <div class="text" v-show="loading && !finished && !error">{{loadingText}}</div>
        <div class="text" v-show="finished">{{finishedText}}</div>
        <div class="text" v-show="error" @click="clickErrText">{{errorText}}</div>
    </div>
</template>

<script>
    import {getScrollEventTarget, getVisibleHeight, getScrollTop, getElementTop, on, off} from './common/utils/scroll';
    export default {
        name: "vue-list",
        data () {
            return {
                scroller: null,
                binded: false
            }
        },
        model: {
            prop: 'loading'
        },
        props: {
            loading: Boolean,
            finished: Boolean,
            offset: {
                type: Number,
                default: 100
            },
            error: {
                type: Boolean,
                default: false
            },
            loadingText: String,
            finishedText: String,
            errorText: String,
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
            this.handleScrollEvent(true);
            this.$nextTick(this.check);
        },
        destroyed() {
            this.handleScrollEvent(false);
        },

        activated() {
            this.handleScrollEvent(true);
        },

        deactivated() {
            this.handleScrollEvent(false);
        },
        methods: {
            /**
             * 判断滚动条是否滚动到设定的临界值
             */
            check () {
                if (this.loading || this.finished || this.error) return;
                const el = this.$el;
                const { scroller } = this;
                const scrollerHeight = getVisibleHeight(scroller);
                if (!scrollerHeight || window.getComputedStyle(el).display === 'none' || el.offsetParent === null) {
                    return;
                }
                const scrollTop = getScrollTop(scroller);
                const targetBottom = scrollTop + scrollerHeight;
                let reachBottom = false;
                if (scroller === window) reachBottom = document.documentElement.scrollHeight - targetBottom < this.offset;
                else
                    reachBottom = scroller.scrollHeight - targetBottom < this.offset;
                if (reachBottom) {
                    this.$emit('input', true);
                    this.$emit('load');
                }

            },
            /**
             * 绑定或者取消滚动条滚动事件
             */
            handleScrollEvent (bind) {
                if (this.binded !== bind) {
                    this.binded = bind;
                    (bind ? on : off)(this.scroller, 'scroll', this.check);
                }
            },
            /**
             * 点击错误信息，重新加载
             */
            clickErrText () {
                this.$emit('update:error', false);
                this.$nextTick(function () {
                    this.check();
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .list-container{
        .text{
            color: #969799;
            font-size: 13px;
            line-height: 50px;
            text-align: center;
        }
    }

</style>