<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<!--sliderGroup是为了拿到dow元素-->
			<slot>
				
			</slot>
		</div>
		<div class="dots">
			<span :class="['dot',{'active':index==pageindex}]" v-for="(item , index) in dots" :key="index">
				
			</span>
		</div>
	</div>
</template>

<script>
	    import BScroll from "better-scroll"
	export default{
		
		data(){
			return{
				dots:[],
				pageindex:0
			}
		},
		props:{
			loop:{
				type:Boolean,
				default:true,
			},
			autoPlay:{
				type:Boolean,
				default:true,
			},
			interval:{
				type:Number,
				default:3000
			}
		},
		methods:{
			_setsliderwigth(resize){
				
				this.children = this.$refs.sliderGroup.children;
                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth;
                console.log(this.children.length)
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    child.classList.add('slider-item');
                    width+=sliderWidth;
                    
                    child.style.width = sliderWidth+"px";
                };
                if(this.loop&&!resize){
                    width+=2*sliderWidth;
                }
                this.$refs.sliderGroup.style.width = width+"px";
			},
//			初始化轮播图
			_initslider(){
				this.slider=new BScroll(this.$refs.slider,{
					scrollX:true,//行向轮播
					snap:{//无缝隙链接
						loop:this.loop//通过那个页面传值过来
						
					},
					monentum:false,
					click:true,
				});
				this.slider.on('scrollEnd',()=>{
					this.pageindex=this.slider.getCurrentPage().pageX;
//					console.log(this.pageindex)
					if(this.autoPlay){
						clearTimeout(this.time);
						this._paly()
					}
				})
//				console.log(this.slider)
			},
			_initdots(){//初始化小圆点
				if(this.loop){
					this.dots=new Array(this.children.length-2)
				}else{
					this.dots=new Array(this.children.length)
				}
			},
			_paly(){
				//轮播下一张
				clearTimeout(this.time);
				
				this.time=setTimeout(()=>{
					this.slider.next();
				},this.interval)
			}
		},
		mounted(){
			
				this._setsliderwigth();
				this._initslider();
				this._initdots();
				if(this.autoPlay){
					clearTimeout(this.time);
					this._paly();
				};
				window.addEventListener('resize',()=>{
					if(!this.slider){
						return
					}else{
						this._setsliderwigth(true);
						this.slider.refresh();
					}
				})
		},
		destroyed(){
			clearTimeout(this.time);
		}
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable"
    .slider
        min-height: 1px
        position: relative
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>