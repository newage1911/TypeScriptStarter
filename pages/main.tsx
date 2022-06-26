import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import Router from 'next/router'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { count } from 'console';

interface detail {
  id: number;
  num: string;
  name: string;
  img: string;
  height: string;
  weight: string;
  candy: string;
  egg: string;
  multipliers: number[];
  weaknesses: string[];
  spawn_time: string;
  type: string[];
  spawn_chance: string;
  candy_count:number;
  prev_evolution: string[];
  next_evolution: string[];
}

function FooterTheme() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  const [data, setData] = useState<detail[]>();
  const [isLoading, setLoading] = useState(false);
  const [showData, setShowData] = useState<detail[]>([])

  // const [page,setPage] = useState(1);
  // const [pagesize, setPageSize] = useState(9)
  // const [count, setCount] = useState(9)

  useEffect(() => {
    setLoading(true);
    fetch('https://run.mocky.io/v3/f9d9d724-2a69-4948-b8d0-3824fedcf87e')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        // console.log(data);
      });
  }, []);
 
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  {
    // console.log(Array.isArray(data));
    // console.log(data.slice(0,10))
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button variant="contained" color="error" onClick={(()=> Router.push('/'))}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
           <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Pokédex
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              A guide to Pokédex stats in the Pokémon games. Contains various lists of Pokémon by game, size, and shiny Pokémon.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}

          <Grid container spacing={4}>
            {showData.map((e:detail,index:number) => ( <>   
            {/* {index < count && <>          */}
              <Grid item  xs={12} sm={6} md={4}
              direction="column"
              alignItems="center"
              justifyContent="center">              
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',
                            borderRadius:'10px', borderColor:'#CDCDCD', border:'' }}>
                  <CardMedia component="img"
                    style={{width:'120px'}}
                    sx={{
                      // 16:9
                      display:'column',
                      pt: '56.65',
                      ml:'130px'
                    }}
                    image={e.img}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">{e.name}</Typography>
                    <Typography>Type: {e.type.join(' / ')}</Typography>
                    <Typography>Weight: {e.weight}</Typography>
                    <Typography>Height: {e.height}</Typography>
                    <Typography>Candy: {e.candy}</Typography>
                    <Typography>Candy : {e.candy_count}</Typography>
                    <Typography>Multiplier: {e.multipliers}</Typography>
                    <Typography>Weakness: {e.weaknesses.join(', ')}</Typography>
                    <Typography>Spawn Time: {e.spawn_time}</Typography>
                    <Typography>Spawn Change: {e.spawn_chance} %</Typography>
                  </CardContent>
                </Card>                                                         
              </Grid>                        
                </> 
                    // }   
                // </> 
            ))}  
          </Grid>
          <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={()=>{setShowData(data)}}>more</Button>
            {/* {page > 1 && <Button variant="contained" onClick={()=>{setPage(page - 1)}} >Prev</Button>}
            <Typography>Page: {page} /{(data.length / 9).toFixed()}</Typography>
            {data.length > pagesize * page && <Button variant="contained" onClick={()=>{setPage(page + 1)}} >Next</Button>}  */}
          </Stack> 
        </Container>   
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          This is a footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <FooterTheme />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

