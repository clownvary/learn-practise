var Database = {
    save: (d, f) => {
        f;
    }
};


function setupNewUser(info, callback) {
    var user = {
        name: info.name,
        nameLowercase: info.name.toLowerCase()
    };

    try {
        Database.save(user, callback);
    }
    catch (err) {
        callback(err);
    }
}
describe('sinon func test', () => {
    it('should call save once', function () {
        var save = sinon.spy(Database, 'save');
        setupNewUser({ name: 'test' }, function () { });
        save.restore();
        // sinon.assert.calledOnce(save);
        // these all is properties of spy,not method
        expect(save.callCount).equal(1);

    });
    it('should pass object with correct values to save', function () {
        var save = sinon.spy(Database, 'save');
        var info = { name: 'test' };
        var expectedUser = {
            name: info.name,
            nameLowercase: info.name.toLowerCase()
        };

        setupNewUser(info, function () { });

        save.restore();
        sinon.assert.calledWith(save, expectedUser);
    });
    it('should pass object with correct values to save', function () {
        var save = sinon.stub(Database, 'save');
        var info = { name: 'test' };
        var expectedUser = {
            name: info.name,
            nameLowercase: info.name.toLowerCase()
        };

        setupNewUser(info, function () { });
        save.restore();
        sinon.assert.calledWith(save, expectedUser);
    });
    it('should pass the error into the callback if save fails', function () {
        var expectedError = new Error('oops');
        var save = sinon.stub(Database, 'save');
        save.throws(expectedError);
        var callback = sinon.spy();

        setupNewUser({ name: 'foo' }, callback);

        save.restore();
        //save抛出了错误，try 出错 在catch里捕获到了错误，callback调用了错误，所以要验证catch里的callback
        //这条路径，不是验证save是否抛出了异常
        // sinon.assert.calledWith(callback, expectedError);
        //expect(save.threw(expectedError)).to.be.true;
        expect(callback.calledWith(expectedError)).to.be.true;

    });
    it('should pass the database result into the callback', function () {
        var expectedResult = { success: true };
        var save = sinon.stub(Database, 'save');
        save.yields(expectedResult);
        var callback = sinon.spy();

        setupNewUser({ name: 'foo' }, callback);

        save.restore();
        sinon.assert.calledWith(callback,expectedResult);
    });
    it('shoul pass callFake', () => {
        var dest = {
            go: (name) => {
                return name;
            }
        }
        sinon.stub(dest, 'go').callsFake((name) => {
            return `fake${name}`;
        });
        expect(dest.go('yyy')).include('yyy');
    });
    it("should call method once with each argument", function () {
        var object = { method: function () { } };
        var spy = sinon.spy(object, "method");
        // spy.withArgs(42);
        // spy.withArgs(1);

        object.method(42);
        object.method(1);
        object.method(3);

        // assert(spy.withArgs(42).calledOnce);
        // sinon.assert(spy.withArgs(1).calledOnce);
        // sinon.assert.calledWith(spy,4);
        expect(spy.withArgs(3).callCount).equal(1);
        // assert(spy.withArgs(3).calledOnce);

    });
    it('should pass object with correct values to save only once', function () {
        var info = { name: 'test' };
        var expectedUser = {
            name: info.name,
            nameLowercase: info.name.toLowerCase()
        };
        var database = sinon.mock(Database);
        database.expects('save').once().withArgs(expectedUser);

        setupNewUser(info, function () { });
        database.verify();
        database.restore();
    });

});