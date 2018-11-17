<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	
	export default {
		data(){
			return{
				
			}
		},
		props:{
			click:{
				type:Boolean,
				default:true,
			},
			 probeType:{
                type:Number,
                default:3
            },
              listenScroll:{
                type:Boolean,
                default:false
            },
              data:{
                type:Array,
                default:null
            }
		},
		methods:{
			
			_initscroll(){
				if(!this.$refs.wrapper){
					return
					}
				this.scroll=new BScroll(this.$refs.wrapper,{
						click:this.click,
						  probeType:this.probeType
				});
				 if(this.listenScroll){//一旦滚动就外爆一个监听事件
                    this.scroll.on('scroll',(pos)=>{
                        this.$emit('scroll',pos);//子穿父用$refs   父穿子用$emit 
//                      显示坐表  监听混动
//						console.log(pos)
                    })
                }
			},
			 refresh(){
                this.scroll&&this.scroll.refresh();
            },
            scrollTo(){
                this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
            },
            scrollToElement(){
                this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)
            }
		},
		mounted(){
			
			this.$nextTick(()=>{
				this._initscroll();
			})
		},
		   watch:{
            data(){
               this.$nextTick(()=>{//表示下次更新的时候就用下面方法
                   this.refresh()//刷新
               })
            }
        }
//		   watch:function(){
//		   	上面是简写
//		   }
	}
</script>

<style>
</style>