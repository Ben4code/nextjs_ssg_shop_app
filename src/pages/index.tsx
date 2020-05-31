import { Microphone } from "../../interface/MicInterface";
import { GetStaticProps } from "next";
import { openDB } from "../openDB";

export interface IndexProps{
  microphones: Microphone[]
}

export default function Index({microphones}: IndexProps){
return (<pre>{JSON.stringify(microphones, null, 4 )}</pre>);
} 

export const getStaticProps: GetStaticProps = async (ctx) => {
  const db = await openDB();
  const microphones = await db.all('select * from microphone')
  return { props: {microphones}};
}