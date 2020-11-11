<template>
    <div class="alert">
        <div class="zhezhao">
            <div class="alertMain">
                <div class="title">
                    Tips:{{title}}
                </div>
                <div class="content">
                    {{content}}
                </div>
                <div class="btnList">
                    <div @click="cancelEvent" class="btn cancel">取消</div>
                    <div @click="comfirmEvent" class="btn comfirm">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['title','content','cancelEvent','comfirmEvent'],

}
</script>

<style lang="less">
    @theme-color:skyblue;
    @default-size:0.4rem;
    @font-color:#fff;
    @zzOpacity:0.6;

    .fullScreen(){
        width: 100vw;
        height: 100vh;
        display: flex;
    }
    .defaultPadding(){
        padding:10px;
    }

    .button(@padding:20px){
        padding: @padding;
        text-align: center;
    }

    .alert{
        .fullScreen();
        .zhezhao{
            .fullScreen();
            background: rgba(0,0,0,@zzOpacity);
            justify-content: center;
            align-items: center;
        }
        .alertMain{
            width: 5rem;
            height: 4rem;
            margin-top: -4rem;
            background: #fff;
            display: flex;
            flex-direction: column;
            position: relative;
            .title{
                font-size:@default-size;
                height: 1rem;
                background: @theme-color;
                color: @font-color;
                .defaultPadding();
                text-align: left;
                line-height: 1rem;
                font-weight: 900;
            }
            .content{
                .defaultPadding();
                font-size:@default-size;
            }
            .btnList{
                position: absolute;
                left: 0;
                bottom: 0;
                display: flex;
                width: 100%;
            }
            .btn{
                .button();
                width: 50%;
            }
            .cancel{
                background: #e6e6e6;
                color: @font-color;
                font-size:@default-size;

            }
            .comfirm{
                background: #1296db;
                color: @font-color;
                font-size:@default-size;
            }
        }

    }


</style>
