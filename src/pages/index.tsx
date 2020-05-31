import { Microphone } from "../../interface/MicInterface";
import { GetStaticProps } from "next";
import Link from 'next/link'
import { openDB } from "../openDB";

export interface IndexProps {
  microphones: Microphone[]
}

export default function Index({ microphones }: IndexProps) {
  return (
    <div>
      <h1>Hello</h1>
      <ul>
        {microphones.map(microphone => {
          return (
            <li>
              <Link href="/microphone/[id]" as={`/microphone/${microphone.id}`}>
                <a>{microphone.brand + microphone.model}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const db = await openDB();
  const microphones = await db.all('select * from microphone')
  return { props: { microphones } };
}