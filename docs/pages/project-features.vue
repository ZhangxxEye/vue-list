<template lang="html">
    <div id="project-features">
        <h1 class="title">vue-list</h1>
        <div class="features">
            <list @load="onLoad" v-model="loading" :finished="finished" loading-text="加载中..." finished-text="没有更多了" :error.sync="error" error-text="加载失败,点击重新加载">
                <ul>
                    <li v-for="item in list">{{item}}</li>
                </ul>
            </list>
        </div>
    </div>
</template>

<script>
    import list from '../../src/index';
    import axois from 'axios';
    export default {
        name: 'ProjectFeatures',
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                error: false
            };
        },
        components: {
            list,
        },
        mounted () {
        },
        methods: {
            handleClick (value) {
                console.log('selected', value);
            },
            getLists () {
                axois.get('http://172.16.0.45:7300/mock/5c88c2241d2cb328eddca711/components/api/list').then(r => {
                    this.list.push(...r.data.data);
                    if (this.list.length >= 90) {
                        this.finished = true;
                    }
                }).catch(e => {
                    this.error = true;
                }).finally(() => {
                    this.loading = false;
                });
            },
            onLoad() {
                this.getLists();
                // 异步更新数据
                /*setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    // 加载状态结束
                    // this.loading = false;
                    this.error = true;

                    // 数据全部加载完成
                    if (this.list.length >= 90) {
                        this.finished = true;
                    }
                }, 500);*/
            }
        }
    };
</script>

<style lang="scss">
    @import '~colors';
    .test-box{
        width: 100%;
        height: 300px;
        overflow-y: scroll;
    }
    .outer-container{
        height: 200px;
        width: 300px;
    }
    .item{
        flex:0 0 22%;
    }
    .tab-container{
        padding: 10px;
    }

    #app #project-features .tags-input {
        width: 100%;
        max-width: none;

        .ti-input {
            border: none;
            border-bottom: 1px solid $lightGrey;
            padding: 4px 12px;
        }

        .ti-tag input {
            color: $darker;
        }

        .ti-tag, .ti-item.ti-selected-item {
            background-color: $primary;
            color: $darker;
        }

        .ti-tags li {
            padding: 5px 8px;
            margin: 2px;
        }

        .ti-tag.dark-font {
            color: #333;
        }

        .ti-item {
            padding: 2px 3px;
        }

        .ti-tag.ti-deletion-mark {
            background-color: $error !important;
            color: #fff;
        }
    }

    #project-features .browser-support .icon {
        width: 100%;
        height: auto;
        padding: 16px;

        > * {
            fill: #b7c4c9;
        }
    }
</style>

<style lang="scss" scoped>
    @import 'colors';

    .title {
        line-height: 28px;
        font-size: 23px;
        font-weight: bold;
        font-family: 'Raleway', sans-serif;
        color: #fff;
        margin-bottom: 20px
    }

    .features {
        display: flex;
        margin-bottom: 40px;
        flex-direction: column;
    }

    .browser-support {
        display: flex;
        flex-wrap: wrap;

        > div {
            display: flex;
            flex-direction: column;
            flex: 1;
            align-items: center;
            font-size: 14px;
            min-width: 85px;
            margin: 8px;
            max-width: 94px;
        }

        span {
            display: flex;
            margin-top: 0px;
            font-weight: 500;

            i {
                margin-left: 3px;
                font-size: 20px;
            }
        }
    }

    .license {
        margin-top: 40px;
        font-size: 0.85em;
    }

    .date {
        font-size: 0.85em;
    }
</style>
