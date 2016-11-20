/**
 * Created by wangyan on 16/9/9.
 */
'use strict';
export default class Sel extends React.Component
{
    render()
    {
        return (
                <select defaultValue="B" >
                    <option value="A">Apple</option>
                    <option value="B">Banana</option>
                    <option value="C">Cranberry</option>
                </select>
            );
    }
}