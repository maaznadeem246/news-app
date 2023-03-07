import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import MainContainer from '@/components/MainContainer';
import { newsType } from '@/components/news/components/newsCard';
import Heading from '@/components/headings';
import theme from '@/styles/theme/theme';
import { Box, Grid } from '@mui/material';
import TransparentTextBack from '@/components/TransparentTextBack';
import DetailsText from './detailsText';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface singleNewsModalType{
    open:boolean,
    news:newsType,
    handleClose:()=>void,
}

export default function SingleNewsModal({open=false,handleClose,news}:singleNewsModalType) {
  


  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
     
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar
            sx={{
              aligItems: 'baseline',
              position:'relative',
              marginTop:0,
            }}
          >
           
              <MainContainer
               
               >  <Box
               sx={{
                 position:'absolute',
                 width:'100%',
                 objectFit:'contain',
                 height:'140%',
                
                //  aspectRatio:['1/0.5','1/0.23','1/0.2'],
                 // maxHeight:['150px','200px','260px'],
                 top:0,
                 left:0,
                 overflowX:'unset',
                 overflowY:'hidden',
               }}
             >
               <img 
                 src={news.urlToImage || ''}
                 
                 width="100%"
                 
               />
             </Box>
           
                <Box
                  sx={{
                    width:'100%',
                    display:'flex',
                    justifyContent:"center",
                    alignItems:'center',
                    gap:'15px',
                    marginTop:['0%','3%','5%'],
                    // border:'1px solid red'
                  }}
                >
                  
              <Box
                sx={{
                  width:'100%'
                }}
                >
                  <TransparentTextBack
                    sx={{
                      padding:'10px',
                      background:'#ffffff96'
                    }}
                  >
                  <Heading 
                    variant="h4"
                    sx={{
                        fontWeight:'600',
                        textAlign:'left',
                        fontSize:['1rem','1.5rem','2rem']
                        

                        }}
                        headingStyle={false}
                    >
                      {news?.title|| ''}
                </Heading>
                </TransparentTextBack>
              </Box>

            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                backgroundColor:theme.palette.primary.light,
                border:`3px solid ${theme.typography.h1.color}`,
                '&:hover':{
                  backgroundColor:theme.palette.primary.main
                }
              }}
            >
              <CloseIcon />
           
            </IconButton>
            </Box>
            </MainContainer>
          </Toolbar>
        </AppBar>
        {/* <MainContainer>
        </MainContainer> */}

      <MainContainer
          sx={{
            marginTop:'6rem',
            // width:'95% !important',
          }}
      >

          <Grid container spacing={2}>
              <Grid item>
                  <DetailsText
                      dataHead="Source :"
                      dataValue={news?.source?.name || ''}
                  />
              </Grid>
              <Grid item>
                <DetailsText
                      dataHead="Published At :"
                      dataValue={news?.publishedAt || ''}
                  />
              </Grid>
              {/* <Grid item>
              <DetailsText
                      dataHead="Source"
                      dataValue={news?.source?.name || ''}
                  />
              </Grid> */}
          </Grid>

      </MainContainer>

      </Dialog>
    </div>
  );
}