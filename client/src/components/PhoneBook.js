import React from 'react';
import { useState } from 'react';

const Phonebook = () => {
  const phoneNumbers = [
    '13018040009',
    '19842068287',
    '15512459377',
    '19362072765',
    '18582210308',
    '13018040009',
    '19842068287',
    '15512459377',
    '19362072765'
  ]
  const [numbers, setNumbers] = useState(phoneNumbers);

  return (
    <ul>
      {numbers.map((number, i) => {
        <Phonecall key={i} number={number} />
      })}
    </ul>
  )
}

export default Phonebook;