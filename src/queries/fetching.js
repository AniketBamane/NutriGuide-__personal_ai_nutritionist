import { db } from "@/config/firebase";
import axios from "axios"
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";

export const uploadQuestion = async(question) => {
try{
  console.log("in upload question", question);
  const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_KEY}`, {
    "contents": [{"parts": [{"text": question}]}]
  });
  console.log(response.data, "-----------data--------------");
  return response.data; 
}catch(err){
  console.log(err)
  throw err
}
};



export const storeResponseInFirebase = async (query,response) => {
  try {
    // Add a new document with the response data
    await addDoc(collection(db, "conversation"), {
      query: query,
      response: response.candidates[0].content.parts[0].text,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const fetchConversations = async () => {
  const q = query(
    collection(db, 'conversation'), 
    orderBy('timestamp', 'desc')  // Sort by timestamp in descending order
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id, // Include document ID if needed
    query: doc.data().query,
    response: doc.data().response,
    timestamp: doc.data().timestamp,
  }));
};


export const sendQuestion = async (question)=>{
  try{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/nutriguide`,{
      message:question
    },{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    })
    console.log(response)
    return response.data
  }catch(err){
    console.error(err)
    throw err
  }
}

export const fetchConversationsFromMongoDb = async()=>{
  try{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-conversations`)
    console.log(response)
    return response.data
  }catch(err){
    console.error(err)
    throw err
  }
}