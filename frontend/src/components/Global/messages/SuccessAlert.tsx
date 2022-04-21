import React from 'react';
import {Dispatch} from 'redux';
import {useAppSelector} from '../features/hooks';
import {setMessage} from '../../Global/features/successMsg';

export function handleAddSuccessMsg(msg: string, dispatch: Dispatch, timer = 2000){
    dispatch(setMessage(msg))
    window.scrollTo(0, 0)
    setTimeout(() => {
    dispatch(setMessage(''))
    }, timer)
}

export default function SuccessAlert() {
  const successMsg = useAppSelector(state => state.successMsg.value)

  return (
    <div className = {successMsg ? 'success' : ''} role = 'alert'>
        {successMsg}
    </div>
  );
}
