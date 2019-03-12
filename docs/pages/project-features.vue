<template lang="html">
    <div id="project-features">
        <h1 class="title">标签页</h1>
        <div class="features">
            <tabs active-index="1" @clicked="handleClick">
                <tab name="标签一">
                    <p>
                        标签一
                    </p>
                </tab>
                <tab name="标签二">这是tab2</tab>
                <tab name="标签三" :isDisabled="true">这是tab3</tab>
                <tab name="标签四">这是tab4</tab>
                <tab name="标签五">这是tab5</tab>
            </tabs>
        </div>
        <div class="test-box">
            <div class="item">tab1</div>
            <div class="item">tab2</div>
            <div class="item">tab3</div>
            <div class="item">tab4</div>
            <div class="item">tab4</div>
            <div class="item">tab4</div>
            <div class="item">tab4</div>
            <div class="item">tab4</div>
            <div class="item">tab4</div>
            <div class="item">tab4</div>
        </div>
    </div>
</template>

<script>
    import tab from '../../src/tab';
    import tabs from '../../src/tabs';

    export default {
        name: 'ProjectFeatures',
        components: {
            tab,
            tabs
        },
        methods: {
            handleClick (value) {
                console.log('selected', value);
            }
        }
    };
</script>

<style lang="scss">
    @import '~colors';
    .test-box{
        display: flex;
        overflow: hidden;
        overflow-x: auto;
    }
    .test-box::-webkit-scrollbar{
        display: none;
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
