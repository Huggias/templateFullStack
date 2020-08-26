import { User } from './../src/models/user';
import { assert } from "chai";

describe('probando', ()=> {
    it('probandolevel2', ()=>{
        assert.equal(User.sumar(1,1),2)
    })
}) 