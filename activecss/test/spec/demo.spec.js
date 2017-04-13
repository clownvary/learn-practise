
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
});

