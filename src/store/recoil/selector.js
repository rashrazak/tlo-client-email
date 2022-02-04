import state from './atom';
import {selector} from 'recoil'



const emailLength = selector({
  key:'emailLength',
  get: ({get}) =>{
    const state = get(state)
  }
})
