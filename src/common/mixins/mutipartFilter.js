import { isMobile } from "../utils/index";
import { LISTOPTION } from '../constant/constant'

/**
 * @param { 过率的条件 } this.filters
 * @param { 过滤的函数 } this.getFilterList(返回promise,手机端需判断status， 瀑布流)
 */
export default {
    data() {
        return {
            isMobile: isMobile(),
            isLoadingList: false
        }
    },
    watch: {
        newFilters: {
            handler(newVal, oldVal) {
                // pageNum 相同的时候就是其他条件改变了，将pageNum重置
                // pageNum 只会随scroll向上加
                if (newVal.pageNum === oldVal.pageNum && newVal.pageNum !== 1) {
                    this.filters.pageNum = 1;
                } else if (newVal.pageNum === 1) {
                    this.isMobile && window.scrollTo(0, 0);
                    this.isLoadingList = true;
                    this.getFilterList(LISTOPTION.COVER).then(res => {
                        this.isLoadingList = false;
                    });
                } else {
                    this.isLoadingList = true;
                    this.getFilterList(LISTOPTION.PUSH).then(res => {
                        this.isLoadingList = false;
                        console.log(this.filters.pageNum, Date.now())
                    });
                }
            },
            deep: true
        }
    },

    computed: {
        newFilters() {
            return { ...this.filters };
        }
    },
}