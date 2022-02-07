import React from 'react';
import {useAppSelector} from '../features/hooks';

export default function SuccessAlert() {
  const successMsg = useAppSelector(state => state.successMsg.value)

  return (
    <div className = {successMsg ? 'success' : ''} role = 'alert'>
        {successMsg}
    </div>
  );
}
