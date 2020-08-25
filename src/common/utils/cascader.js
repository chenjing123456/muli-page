// 回溯剪枝计算path
/**
 * @desc 用来绑定el-cascader的value值
 * @param { 列表 } list
 * @param { 查找的key的值 } key
 * @param { 参数： 配置children和匹配key的值 } opts
 * @param {*} arr
 */
export const computedCascaderPath = (list, key, opts = {
    children: 'children',
    value: 'id',
}, arr = []) => {
    if(!opts || !opts.children || !opts.value){
        throw new Error('opts 参数不完整');
    }

    for (let idx = 0; idx < list.length; idx++) {
        arr.push(list[idx][opts.value]);
        list[idx][opts.children] &&
            computedCasecaderPath(
                list[idx][opts.children],
                key,
                opts,
                arr
            );
        if (arr[arr.length - 1] === key) {
            return arr;
        }
        arr.pop();
    }
    return arr;
}

/**
 * @desc 计算设置cascader的某一个为disabled = true
 * @param {*} list
 * @param { children：递归的属性， func: 返回true的时候该属性设置为disabled} opts
 */
export const setCascaderDisabled = (list, opts = {
    children: 'children',
    func: () => {},
}) => {
    if(!opts) throw new Error('请传如opts 参数')
    list.forEach(item => {
        opts.func && opts.func(item) && (item.disabled = true);
        item[opts.children] && setCascaderDisabled(item[opts.children], opts)
    });
}
