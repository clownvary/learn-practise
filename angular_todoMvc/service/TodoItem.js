/**
 * Created by wangyan on 16/8/26.
 */

class TodoItem
{
    /**
     * @constructor
     * @param completed 费否完成
     * @param title
     * @param creattime
     * @param updatetime
     */
    constructor(completed,title,creattime,updatetime)
    {
        this.completed=completed;
        this.title=title;
        this.creattime=creattime;
        this.updatetime=updatetime;
    }
}
export default TodoItem;
