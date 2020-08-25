/**
 * @desc 触底的函数触发
 * @param { 滚动时的函数 } this.handlerScroll
 */
import {throttle} from '../../common/utils/index'
export default {
    mounted() {
        this.handlerScroll = throttle(this.handlerScroll, 200, {
            leading: true,
            trailing: true
        });
        window.addEventListener("scroll", this.handlerScroll, false);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handlerScroll, false);
    },
    methods: {
        /**
         * @desc 是否触底
         */
        isBottomOut() {
            let scrollTop =
                document.documentElement.scrollTop ||
                document.body.scrollTop,
                winodwHeight =
                    document.documentElement.clientHeight ||
                    document.body.clientHeight,
                scrollHeight =
                    document.documentElement.scrollHeight ||
                    document.body.scrollHeight;

            // 触底并且总数小于list的时候
            return scrollTop + winodwHeight >= scrollHeight;
        }
    },
}