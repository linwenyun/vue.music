<template>
    <div class="progress-bar" ref="progressBar">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper"
                 ref="progressBtn"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd"
            >
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    const WIDTH_DELTA = 14;
    export default {
        props:{
            percent:{
                type:Number,
                default:0
            }
        },
        created(){
            this.touch={};
            this.barWidth = 0;
        },
        methods:{
            _offset:function(width){
                this.$refs.progress.style.width = `${width}px`;
                this.$refs.progressBtn.style.transform = `translate3d(${width}px,0,0)`;
                this.$refs.progressBtn.style.webkitTransform = `translate3d(${width}px,0,0)`;
            },
            progressTouchStart:function(e){
                this.touch.initiated = true;
                this.touch.startX = e.touches[0].pageX;
                this.touch.left = this.$refs.progress.clientWidth;
            },
            progressTouchMove:function(e){
                if(!this.touch.initiated){
                    return;
                }
                const deltaX = e.touches[0].pageX - this.touch.startX;//右 整数
                const offsetWidth = Math.min(Math.max(0,this.touch.left+deltaX),this.barWidth);
                this._offset(offsetWidth)
            },
            progressTouchEnd:function(e){
                this.touch.initiated = false;
                this.$emit('percentChange',this.$refs.progress.clientWidth/this.barWidth)
            }
        },
        watch:{
            percent:function(newPercent){
                if(newPercent>=0&&!this.touch.initiated){
                    this.barWidth = this.$refs.progressBar.clientWidth-this.$refs.progressBtn.clientWidth+WIDTH_DELTA;
                    const offsetWidth = this.barWidth*newPercent;
                    this._offset(offsetWidth)
                }
            }
        }
    }
</script>


<style scoped lang="stylus">
    @import "../../common/stylus/variable"

    .progress-bar
        height: 30px
        .bar-inner
            position: relative
            top: 13px
            height: 4px
            background: rgba(0, 0, 0, 0.3)
            .progress
                position: absolute
                height: 100%
                background: $color-theme
            .progress-btn-wrapper
                position: absolute
                left: -8px
                top: -13px
                width: 30px
                height: 30px
                .progress-btn
                    position: relative
                    top: 7px
                    left: 7px
                    box-sizing: border-box
                    width: 16px
                    height: 16px
                    border: 3px solid $color-text
                    border-radius: 50%
                    background: $color-theme
</style>


