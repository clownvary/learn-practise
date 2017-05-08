var capitalize = (str) => {
    if (str.length > 0) {
      return str.replace(/[a-zA-Z]/, x => x.toUpperCase());
    }
    return str;
}
describe('hello world', () => {
  it('works!', () => {
    expect(true).to.be.true;
  });
  it('is number', () => {
    expect(3).to.equal(3);
    expect(3).not.a('string');
    expect(10).to.be.least(10);
  });
});
describe('hooks', () => {
  var foo = false;

  beforeEach(function () {
    foo = true;


  });

  it('修改全局变量应该成功', function () {
    expect(foo).is.a('boolean');
  });
  it('首字母大写',function(){
    expect(capitalize('12. Asddf')).to.equal('12. Asddf');
    expect(capitalize('asddf')).to.equal('Asddf');
    expect(capitalize(' Asddf')).to.equal(' Asddf');
    expect(capitalize('1a. asddf')).to.equal('1A. asddf');
    expect(capitalize('a2. Asddf')).to.equal('A2. Asddf');
    expect(capitalize('a2lsddf')).to.equal('A2lsddf');
    
    
  })
});


