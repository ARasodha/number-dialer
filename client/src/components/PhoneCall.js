import React from 'react';
import { useState } from 'react';

const PhoneCall = ({ number }) => {
  return (
    <li>{number.phone} {number.status}</li>
  )
}

export default PhoneCall;