/**
 * Created by wangyan on 17/2/20.
 */
import { Directive, ElementRef, HostListener, Input, Output, Renderer, EventEmitter } from '@angular/core';

@Directive(
    {
        selector: '[myHighlight]'// 意思是作用于具有myHighlight属性的元素
    }
)
export class HighlightDirective {
    private _defaultColor = 'red';
    constructor(private  el: ElementRef, private  renderer: Renderer)
    {
    }

    // myHighlight既是属性名也是绑定目标(selector)
    @Input('myHighlight') private _highlightColor: string;
    @Input() set defaultColor(colorName: string)
    {
        this._defaultColor = colorName || this._defaultColor;
    }
    @Output() onClickTest = new EventEmitter();
    @HostListener('click') onClick()
    {
        this.testClick('xxxxe');
    }

    @HostListener('mouseleave') onMouseLeave(){
        this.highlight(null);
    }
    @HostListener('mouseenter') onMouseEnter(){
        this.highlight(this._highlightColor || this._defaultColor);
    }
    testClick(str: string)
    {
        console.log(`i am from child component click ${str}`);
        this.onClickTest.emit(str); // 触发事件
    }
    private highlight(color: string)
    {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    }

}
