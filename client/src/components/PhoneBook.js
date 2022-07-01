import React from 'react';
import { useState, useEffect } from 'react';
import { getPhoneNumbers } from '../constants/ApiRoutes';
import PhoneCall from './PhoneCall';

const SERVER_URL = 'http://localhost:5000/sse';

const Phonebook = () => {
  const [numbers, setNumbers] = useState([]);
  useEffect(() => {
    // (async () => {
    //   const phoneNumbers = await getPhoneNumbers();
    //   setNumbers(phoneNumbers);
    // })();


  }, []);
  
  const sse = new EventSource(SERVER_URL);

  sse.addEventListener("message", ({data}) => {
  console.log(data);
  });


  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchEventSource(SERVER_URL, {
  //       method: "GET",
  //       headers: {
  //         Accept: "text/event-stream",
  //         "Content-Type": "application/json"
  //       },
  //       onopen(res) {
  //         if (res.ok && res.status === 200) {
  //           console.log("Connection made ", res);
  //         } else if (
  //           res.status >= 400 &&
  //           res.status < 500 &&
  //           res.status !== 429
  //         ) {
  //           console.log("Client side error ", res);
  //         }
  //       },
  //       onmessage(event) {
  //         console.log(event.data);
  //         setNumbers(numbers.map(num => {
  //           if (num.id === event.id) {
  //             return event;
  //           }
      
  //           return num;
  //         }))
  //       },
  //       onclose() {
  //         console.log("Connection closed by the server");
  //       },
  //       onerror(err) {
  //         console.log("There was an error from server", err);
  //       },
  //     });
  //   };
  //   fetchData();
  // }, [])




  // const eventSource = new EventSource('http://localhost:5000/phoneWebhook');
  // eventSource.onmessage = (event) => {
  //   console.log(event.data);
    // setNumbers(numbers.map(num => {
    //   if (num.id === event.id) {
    //     return event;
    //   }

    //   return num;
    // }))
  // }

  // eventSource.onerror = () => {
  //   console.log('Event source connection closed');
  //   eventSource.close();
  // }


  return (
    <ul>
      {numbers.map((number) => {
        <PhoneCall key={number.id} number={number} />
      })}
    </ul>
  )
}

export default Phonebook;