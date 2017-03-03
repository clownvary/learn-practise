/**
 * Created by wangyan on 17/3/4.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// 自定义验证
import { validateMobile } from '../../common/validateMobile';
@Component({
    selector: 'simple-form',
    templateUrl: './simple-form.html',
    styleUrls: ['../../forms/forms.less']
})
export class SimpleFormsComponent implements OnInit {
    userForm: FormGroup;
    msg: String;
    changeMsg: any;
    constructor(private formBuilder: FormBuilder) {}
    ngOnInit() {
        this.userForm = this.formBuilder.group({
            name: ['张三', [Validators.required, Validators.minLength(3)]],
            mobile: [13800138001, [Validators.required, Validators.minLength(11), Validators.maxLength(11), validateMobile('test')]],
            address: this.formBuilder.group({
                city: ['北京', Validators.required],
                street: ['朝阳望京...', Validators.required]
            })
        });
        // 从表单控件中获得地址、城市、街道控件的引用
        // 地址控件也是一个FormGroup，需要将它转型成FormGroup类型。
        const addr$ = <FormGroup>this.userForm.controls['address'];
        const city$ = addr$.controls['city'];
        const street$ = addr$.controls['street'];
        city$.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe(cityValue => {
            this.msg = cityValue + ' 欢迎你!';
            street$.setValue(this.msg);
        });
        this.userForm.valueChanges.subscribe(x => this.changeMsg = { event: 'Form DATA CHANGED', object: x });
    }
    reset() {
        // 我们同样可以使用reset方法来重置数据
        this.userForm.reset();
    }
}