import {atom} from 'recoil'
import initialState from '../state';


const state = atom({
  key:'main',
  default:initialState
})

export default state