import React, { useEffect } from 'react'
import EventSource, { EventSourceListener } from "react-native-sse";
import { selectMercureToken } from '../redux/UserSlice';
import { useAppSelector } from '../redux/hook';
import { useAppDispatch } from '../redux/hook';
import { addMessages } from '../redux/MessagesSlice';

interface MercureProps {
  roomId: number,
}

type CustomEvents = "open" | "message" | "error";


const Mercure: React.FC<MercureProps> = ({roomId}) => {

    const dispatch = useAppDispatch()
    const mercureToken = useAppSelector(selectMercureToken)

    useEffect(() => {
      const options = { headers: { Authorization: `Bearer ${mercureToken}` } };

      const topicUrl = `http://10.0.2.2:9090/.well-known/mercure?topic=chat_room_`+roomId;  
      console.log(topicUrl)
    
      const es = new EventSource<CustomEvents>(topicUrl, options);

      const listener: EventSourceListener<CustomEvents> = (event) => {
        if (event.type === "open") {
          console.log("SSE opened")
        } else if (event.type === 'message') {
          dispatch(addMessages(event.data))
        } else if (event.type === 'error') {
          console.log("SSE error", event.message)

        }
      }

      es.addEventListener("open", listener);
      es.addEventListener("message", listener);
      es.addEventListener("error", listener);

      return () => {
      es.close();
    };
  }, []);

  return null
    

}

export default Mercure
