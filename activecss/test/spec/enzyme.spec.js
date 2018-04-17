import { shallow, mount } from 'enzyme';
import React from "react";
import Root from 'components/temp/root';
import CommentList from 'components/temp/commentlist';
// import Header from 'components/todo/Header';
// import Counter from 'components/counter/Counter';


describe.only('(Container) Root', () => {
   
         const mountWrapper = mount(<Root />);
         const shallowWrapper = shallow(<Root />);
         
        
    // it('renders as a <div>', () => {
    //     expect(wrapper.find('.welcome-header')).include('div');
    // });

    // it('has style with height 100%', () => {
    //     const expectedStyles = {
    //         height: '100%',
    //         background: '#333'
    //     }
    //     expect(wrapper.prop('style')).to.eql(expectedStyles);
    // });

    // it('contains a header explaining the app', () => {
    //     expect(wrapper.find('.welcome-header')).to.have.length(1);
    // });
    //  it('class name', () => {
    //     expect(wrapper.find('div h1').prop('className')).to.include('welcome');
    // });
    it('should render shallow', () =>{
        console.log(mountWrapper.html());
        expect(shallowWrapper.find(CommentList).length).to.eql(1);
    });
});
// describe('Header', () => {
//     const context = { color: 'foo' };
//     let wrapper2 = shallow(<Header />, { context });
//     it('color', () => {
//         expect(wrapper2.find('div h1').first().text()).include('todo');
//     });
// });
// describe.only('Header', () => {
//     let wrapper2 = shallow(<Counter />);
//     it('color', () => {
//         expect(wrapper2.find('input[type="text"]')).include('todo');
//     });
// });