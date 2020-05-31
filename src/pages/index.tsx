import { Microphone } from "../../interface/MicInterface";
import { GetStaticProps } from "next";
import Link from 'next/link'
import { openDB } from "../openDB";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

export interface IndexProps {
  microphones: Microphone[]
}

export default function Index({ microphones }: IndexProps) {
  return (
    <div>
      <h1 style={{ textAlign: "center"}}>Welcome to MicShop</h1>
      <Grid container >
        {microphones.map(microphone => {
          return (
            <Grid key={microphone.id} container item xs={12} sm={6} md={4} spacing={3}>
              <Link key={microphone.id} href="/microphone/[id]" as={`/microphone/${microphone.id}`}>
                <a>
                  <Card >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={microphone.brand + ' ' + microphone.model}
                        height="200"
                        image={microphone.imageUrl}
                        title={microphone.brand + ' ' + microphone.model}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Lizard
                    </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae at est natus, rerum nemo obcaecati, sint excepturi corporis ut iusto nulla voluptates autem provident a voluptate quis consequatur impedit aspernatur!
                    </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </a>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const db = await openDB();
  const microphones = await db.all('select * from microphone')
  return { props: { microphones } };
}