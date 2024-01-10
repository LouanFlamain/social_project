import React, { useEffect } from 'react'
import EventSource, { EventSourceListener } from 'react-native-sse';
import 'react-native-url-polyfill/auto';
import { selectMercureToken } from '../redux/UserSlice';
import { useAppSelector } from '../redux/hook';
import { MERCURE_URL } from '@env';

import { ConversationItem } from '../../screens/Messages';
interface MercureProps {
    topic: string,
    Onchange: () => void,
    roomdata?: number,
}

const Mercure: React.FC<MercureProps> = ({topic, Onchange, roomdata}) => {

    const mercureToken = useAppSelector(selectMercureToken)

    const options = { headers: { Authorization: `Bearer ${mercureToken}` } };

    const topicUrl = `${MERCURE_URL}/.well-known/mercure?topic=${topic}`;    

    console.log(topicUrl)
    
    useEffect(() => {
      const es  = new EventSource(topicUrl, options);
    
      const listener: EventSourceListener = (event) => {
        if (event.type === "open") {
          console.log("Open SSE connection.");
        } else if (event.type === "message") {
          const parsedObject = event.data;
            Onchange(parsedObject);
           
        } else if (event.type === "error") {
          console.error("Connection error:", event.message);
        } else if (event.type === "exception") {
          console.error("Error:", event.message, event.error);
        }
      };
    
      es.addEventListener("open", listener);
      es.addEventListener("message", listener);
      es.addEventListener("error", listener);
    
      return () => {
        es.removeAllEventListeners();
        es.close();
      };
    }, []);

    return null;
    

}

export default Mercure
