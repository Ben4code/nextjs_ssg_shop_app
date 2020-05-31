import { Microphone } from "../../../interface/MicInterface";
import { GetStaticProps, GetStaticPaths } from "next";
import { openDB } from "../../openDB";
import Link from "next/link";
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';


export type MicDetailProps = Microphone;

export default function MicrophoneDetail({ id, brand, model, price, imageUrl }: MicDetailProps) {

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }


  return <div>
    <Button variant="contained" color="default">
      <Link href="/">
        <a>Back</a>
      </Link>
    </Button>
    <div>{id}</div>
    <div>{brand}</div>
    <div>{model}</div>
    <div>{price}</div>
    <div>
      <img src={imageUrl} alt="" />
    </div>
  </div>
}

//Genterate Prop
export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params.id as string;
  const db = await openDB();
  const microphone = await db.get('select * from microphone where id = ?', +id)
  return { props: microphone };
}

//Generate paths
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const db = await openDB();
  const microphones = await db.all('select * from microphone')
  const paths = microphones.map(mic => {
    return {
      params: { id: mic.id.toString() }
    }
  })
  return { fallback: false, paths };
}
