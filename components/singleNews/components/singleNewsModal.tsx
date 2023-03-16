import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import MainContainer from '@/components/MainContainer';
import { newsType } from '@/components/news/components/newsCard';
import Heading from '@/components/headings';
import theme from '@/styles/theme/theme';
import { Box, Grid, Skeleton } from '@mui/material';
import TransparentTextBack from '@/components/TransparentTextBack';
import DetailsText from './detailsText';
import { StyledDataHead, StyledDataText } from '@/components/styledComp';
import ReactMarkdown from 'react-markdown'
import DOMpurify from 'dompurify';
import rehypeRaw from "rehype-raw";
import ArticalContent from './ArticalContent';


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
  

const dateValue = news?.publishedAt ? `${new Date(news?.publishedAt).getDate()} / ${new Date(news?.publishedAt).getMonth()} / ${new Date(news?.publishedAt).getFullYear()}` :  null
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
                        fontSize:['1.3rem','1.5rem','2rem']
                        

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
            marginTop:['4rem','6rem','6rem'],
            marginBottom:['4rem','6rem','6rem'],
            width:['95% !important'],
          }}
      >

          <Grid container spacing={3}>
              {news?.author && 
                <Grid item xs={12} sm={12} >
                  <DetailsText
                      dataHead="Author : "
                      dataValue={news?.author}
                     
                  />
              </Grid>}
              {news?.source?.name && 
                <Grid item xs={12} sm={'auto'} >
                  <DetailsText
                      dataHead="Source : "
                      dataValue={news?.source?.name}
                  />
              </Grid>}
              { dateValue && 
                <Grid item  xs={12} sm={'auto'}>
                  <DetailsText
                      dataHead="Published At :"
                      dataValue={dateValue}
                  />
              </Grid>}

              <Grid item xs={12} sx={{ marginTop:['0.8rem','1.2rem','1.3rem']}} >
                  <StyledDataHead
                      sx={{
                        width:'fit-content'
                      }}
                    >
                    Original Link :
                  </StyledDataHead>
                  <StyledDataText
                    sx={{
                      marginTop:'1rem',
                      textDecoration:'underline'
                    }}
                  >
                    <a href={news?.url || ''} style={{lineBreak:'anywhere'}} >{news?.url}</a>
                  </StyledDataText>

              </Grid>
              <Grid item xs={12} sx={{ marginTop:['0.8rem','1.2rem','1.3rem']}} >
                  <StyledDataHead
                      sx={{
                        width:'fit-content'
                      }}
                    >
                    Description :
                  </StyledDataHead>
                  <StyledDataText
                    sx={{
                      marginTop:'1rem',
                    }}
                  >
                     {news?.description  && 
                     <ReactMarkdown 
                          rehypePlugins={[rehypeRaw]}
                      >
                          { news?.description  ? DOMpurify.sanitize(news.description) : ''}
                      </ReactMarkdown>}
                  </StyledDataText>

                

              </Grid>
              <Grid item xs={12} sx={{marginTop:['0.8rem','1.2rem','1.3rem']}} >
                <>
                  {news?.url && <ArticalContent news={news} />}
                </>
              </Grid>
          </Grid>

      </MainContainer>

      </Dialog>
    </div>
  );
}