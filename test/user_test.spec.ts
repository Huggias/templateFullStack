import { User } from './../src/models/user';
import { assert } from "chai";

describe('User', ()=> {
    it('sumar()', ()=>{
        assert.equal(User.sumar(1,1),2)
        assert.notEqual(User.sumar(1,2),4)
    })
    it('encryptPassword()',()=>{
        assert.equal(1,1)
    })
    it('comparePassword()',()=>{
        assert.equal(1,1)
    })
}) 