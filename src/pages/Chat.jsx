import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FiCamera } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { delete_message, start_chat, update_message } from '../endpoints/api';

import no_bic from '../media/images/no_pic.png'
import '../static/css/chat.css'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/useAuth';

import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { VscEdit } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";







import { jwtDecode } from 'jwt-decode';

export default function Chat() {
    const menu=()=>{
        const side_bar=document.getElementsByClassName('side-bar')[0]
        side_bar.classList.toggle('open')
      }

    const BASE_URL='https://majdahmad1234.pythonanywhere.com'

    const [messages,setMessages]=useState([])

    const [text,setText]=useState('')
    const [image,setImage]=useState(null)

    const ws=useRef(null)

    const messagesEndRef=useRef(null)

    const {user}=useContext(AuthContext)

    const [participantName,setParticipantName]=useState("")
    const [participantImage,setParticipantImage]=useState(null)

    const {access_token}=useContext(AuthContext)

    const {user_id}=useParams()


    const [lastSeen,setLastSeen]=useState('')
    const [onlineStatus,setOnlineStatus]=useState(false)

    const [visibleMessages, setVisibleMessages] = useState([]); 

    const [selectedMessageId,setSelectedMessageId]=useState(null)


    const messageInfoRef=useRef(null)
    const inputInfoRef=useRef(null)
    const buttonInfoRef=useRef(null)





    useEffect(()=>{
        const IsAccessTokenValid=(Access_Token)=>{
            try{
                const decoded_token=jwtDecode(Access_Token)
                const expiryTime=decoded_token.exp * 1000
                const currentTime=Date.now();
                return expiryTime > currentTime;
            }
            catch(error){
                console.log(error)
            }
        }
        const connect = (room_id) => {
            if(access_token && IsAccessTokenValid(access_token)){
                console.log('access_token is valid')
            
            try{
                
                ws.current= new WebSocket(`wss://majdahmad1234.pythonanywhere.com/ws/ac/${room_id}/?access_token=${access_token}`);
                ws.current.onopen = () => {
                    console.log('websocket connecting ..!');
                };
                ws.current.onmessage = (event) => {
                    const newMessage = JSON.parse(event.data);
                    console.log('message from server to front :',newMessage)
                    if(newMessage.type==="online_status"){
                        if(newMessage.user_id===user_id){
                            setOnlineStatus(newMessage.is_online)
                        }
                    }
                    else if(newMessage.type==="message_read"){
                        setMessages((prev)=>prev.map(message=>message.id===newMessage.id ? {...message,is_read:true}:message))
                    }
                    else{
                        setMessages((prev)=>[...prev,newMessage])
                    }
                    
                };
                ws.current.onclose = () => {
                    console.log('WebSocket disconnected');
                };
                ws.current.onerror = (error) => {
                    console.error('WebSocket error:', error);
                  };
            }
            catch(err){
                console.error('Failed to connect to WebSocket:', err);
            }
        }
            
        };

        const SendLastSeen=()=>{
            if(ws.current && ws.current.readyState === WebSocket.OPEN){
                const lastSeenTime=new Date();
                const message={"type":"last_seen","time_stamp":lastSeenTime}
                console.log(message)
                ws.current.send(JSON.stringify(message))
            }
        }

        const close = () => {
            if (ws.current) {
                SendLastSeen();
                ws.current.close();

            }
        };



        const startChat=async()=>{
            const res=await start_chat(user_id)
            connect(res.conversation.id)
            console.log('response',res)

            setMessages(res.conversation.messages)
            setLastSeen(res.last_seen)
            setParticipantName(res.user_detail.username)
            setParticipantImage(res.user_detail.user_image)
            setOnlineStatus(res.online_status)
          
            
        }
        startChat()

        const intervalid=setInterval(SendLastSeen,100000)
        return () => {
            clearInterval(intervalid)
            close();
            
        };

    },[user_id,access_token])



    useEffect(()=>{
        messagesEndRef.current.scrollIntoView({behavior:"smooth"})
    },[messages])


    const formatLastSeen=(lastseen)=>{
        return `${lastseen} آخر ظهور `

    }

    const mark_message_as_read=useCallback((message_Id)=>{
        if(ws.current && ws.current.readyState === WebSocket.OPEN){
            const message={"type":"mark_as_read","message_id":message_Id,"user_id":user.id}
            console.log(message)
            ws.current.send(JSON.stringify(message))
        }
    },[ws,user.id])


    useEffect(() => {


        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const messageId = entry.target.dataset.messageId;
                       
                        // تحقق إذا كانت الرسالة غير مقروءة بالفعل
                        if (messageId && !visibleMessages.includes(messageId)) {
                            
                            mark_message_as_read(messageId);
                            setVisibleMessages(prev => [...prev, messageId]); // إضافة الرسالة إلى قائمة الرسائل المرئية
                        }
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        const messageElements = document.querySelectorAll('.content');
        messageElements.forEach(messageElement => {
            observer.observe(messageElement);
        });

        return () => {
            observer.disconnect();
        };
    },[messages,mark_message_as_read,visibleMessages]); // قم بتضمين messages في قائمة الاعتماديات

    const SendMessage=async(e)=>{
        e.preventDefault()
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            console.log('WebSocket is not connected.');
            return;
        }


        let base64image=null
        if (image) {
            base64image= await new Promise((resolve)=>{
                const reader = new FileReader();
                reader.onloadend =() => {
                    resolve(reader.result)
                };
                reader.readAsDataURL(image)
            })
        }

        let message={}
        if (text){
            message= {"type":"chat_message","text":text,"attachment":base64image,"is_read":false}
        }
        else{
            message={"type":"chat_message","attachment":base64image,"is_read":false}
        }
        
        console.log('message from front to server',message)

        if(selectedMessageId){
            const newMessage=await update_message(selectedMessageId,text)
                setMessages(messages.map(message => message.id === selectedMessageId ? newMessage : message));
                setText('')
                setSelectedMessageId(null)
        }
        else{
            ws.current.send(JSON.stringify(message))
            setText("")
            setImage(null)
        }

        
    }

    const handleDoubleClick = (message_id) => {
       setSelectedMessageId(message_id)
      };

    const edit_message=()=>{
        const messageToEdit=messages.find((message)=>message.id === selectedMessageId)
        if(messageToEdit){
            setText(messageToEdit.text)
            if(inputInfoRef.current){
                inputInfoRef.current.focus()
            }
        }

    }
    const deleteMessage=async(message_id)=>{

        const res=await delete_message(message_id);
        if(res.msg==="ok"){
            console.log(res)
            setMessages(messages.filter((message)=>message.id !== message_id))
        }
        

    }
    useEffect(()=>{
        const handleClickOutSide=(event)=>{
            
            if(messageInfoRef.current
                && !messageInfoRef.current.contains(event.target)
                && inputInfoRef.current
                && !inputInfoRef.current.contains(event.target)
                && buttonInfoRef.current
                && !buttonInfoRef.current.contains(event.target)
            ){
                setSelectedMessageId(null)
                setText('')
            }
        }
        document.addEventListener('click',handleClickOutSide)
        return ()=>{
            document.removeEventListener('click',handleClickOutSide)
        }
    },[messageInfoRef,inputInfoRef,buttonInfoRef,selectedMessageId])

  return (
        <div className={ 'container-2'}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem .8rem 1rem 1.8rem'}}>
              <h4>Message</h4>
              <p className={'menu'} onClick={menu}><RxHamburgerMenu /></p>
              </div>
          <div className={'chat'}>
            <div className={'chat-header'} style={{position:"relative"}}>
                {participantImage ? 
                
                <img src={`${participantImage}`} alt="user_image" />
                : 
                <img src={no_bic} alt="no-bic" />
                }
                
                {onlineStatus && 
                <p style={{borderRadius:"50%",position:"absolute",left:"41px",top:"27px",backgroundColor:"#37c637",width:"11px",height:"11px"}}></p>
                }
                <div>
                    <p className={'username'}>{participantName}</p>
                    <p className={'last-show'}>{onlineStatus ? "Online":<>{formatLastSeen(lastSeen)}</>}</p>
                </div>
            </div>
            <div className={'messages'} >
            {messages.map((message,index)=>
                <div className={'content'} key={message.id} data-message-id={message.id}>
                {user.username === message.sender ? 
                <>
                <div className={'message_send2'}>
                {message.text && <>

                    
                    <div className={'text'} onDoubleClick={()=>handleDoubleClick(message.id)}>
                        {message.text}

                        {selectedMessageId === message.id &&
                            <div className={"message_info"} ref={messageInfoRef}>
                                <VscEdit cursor={"pointer"} color={'green'} onClick={()=>edit_message()} />
                                <MdDeleteOutline cursor={"pointer"} color={'red'}  onClick={()=>{deleteMessage(message.id)}}/>
                            </div>
                        }
                    </div>
                    <p className={'timestamp'}>{message.is_read && <IoCheckmarkDoneSharp size={'15px'} style={{color:"green"}}/>}{message.timestamp}</p>
                    
                </>
                }
                </div>

                {message.attachment && 
                <div className={'send'}>
                    <img src={`${BASE_URL}${message.attachment}`} alt="no-bic" />
                </div>}
                
                
                </>

                : 
                <>
                <div className={'message_receive'}>
                {message.text && <>
                        <div className={'text'}>{message.text}</div>
                        <p className={'timestamp'}>{message.timestamp}</p>
                        
                    </>}
                </div>

                {message.attachment && 
                <div className={'receive'}>
                    <img src={`${BASE_URL}${message.attachment}`} alt="no-bic" />
                </div>}
                

                </>
                

                }

                </div>
                )}
            <div ref={messagesEndRef}/>
            </div>

            

            <div className={'write-message'}>
                <form onSubmit={SendMessage}>
                    <div>
                        <label htmlFor="image"><FiCamera cursor={'pointer'} color={'green'} size={'22px'}/></label>
                        <input type="file" name={'image'}onChange={(e)=>{setImage(e.target.files[0])}}  id="image" hidden />
                        <input type="text"name={'text'} value={text} onChange={(e)=>{setText(e.target.value)}} placeholder={'Type your message here!'} ref={inputInfoRef}/>
                    </div>


                    <button type={'submit'} disabled={text===''&& !image ? true: false} ref={buttonInfoRef}><LuSend cursor={'pointer'} size={'22px'}/></button>
                </form>
            </div>
          </div>
        </div>
  )
}
