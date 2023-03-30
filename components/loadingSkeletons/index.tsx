import theme from "@/styles/theme/theme"
import { Card, Skeleton, SkeletonProps,  } from "@mui/material"



type skOptionType = 'custom' | 'one' | 'two' | 'three' | 'four'



const SkeletionComp = ({sx,...props}:SkeletonProps) => {
    return (

             <Skeleton {...props}   sx={{width:['90%','100%','100%'],margin:'auto',...sx}} />

    )
}


const SkeletonTypeCustom =  ({...props}:SkeletonProps) => {
    return <SkeletionComp {...props} />
}

const SkeletonTypeOne =  ({sx,...props}:SkeletonProps) => {
    return  <SkeletionComp {...props}  sx={{height:['150px','250px','350px'], ...sx}} />  
}

const SkeletonTypeTwo =  ({sx,...props}:SkeletonProps) => {
    return  <SkeletionComp {...props}  sx={{ aspectRatio:['1/0.2','1/0.116','1/0.085','1/0.07'], transform:'scale(1,0.85)', ...sx}} />  
}

const SkeletonTypeThree =  ({sx,...props}:SkeletonProps) => {
    return  <SkeletionComp {...props}  sx={{ aspectRatio:['1/0.15','1/0.12','1/0.12','1/0.10'], transform:'scale(1,0.85)', minHeight:'50px', maxHeight:'100px',...sx} } />  
}


const SkeletonTypeFour =  ({sx,...props}:SkeletonProps) => {

    return(
        <Card
        sx={{
            margin:'8px',
            padding:'0px',
            cursor:'pointer',
            minHeight:'230px',
            position:'relative',
            overflow:'hidden',
            // boxShadow:theme.shadows[10],
            
        }}
        >        
            <SkeletionComp {...props} sx={{width:'100%', height:'100%', transform:'scale(1,1)', minHeight: 'inherit'}} />
        </Card>
    )
    // return  <SkeletionComp {...props}  sx={{ aspectRatio:['1/0.15','1/0.12','1/0.12','1/0.10'], transform:'scale(1,0.85)', minHeight:'50px', maxHeight:'100px',...sx} } />  
}



export const LoadingSkeleton = ({skOption, skprops}:{skOption:skOptionType,skprops?: SkeletonProps}) => {

    switch(skOption){
        case 'custom':
            return <SkeletonTypeCustom {...skprops} />  
        case 'one':
            return  <SkeletonTypeOne {...skprops} />    
        case 'two':
            return  <SkeletonTypeTwo {...skprops} /> 
        case 'three':
            return  <SkeletonTypeThree {...skprops} />   
        case 'four':
            return <SkeletonTypeFour  {...skprops} /> 
        default:
            return <SkeletonTypeCustom {...skprops} />   
    }

}