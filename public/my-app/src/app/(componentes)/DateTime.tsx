"use client"
import React, { useState } from 'react';
import Datetime from 'react-datetime';

import "react-datetime/css/react-datetime.css";

function DateTime() {
  
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <div className=''>
      <DateTime />
    </div>
  );
}

export default DateTime;