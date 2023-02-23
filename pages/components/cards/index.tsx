import { Card, CardContent, CardProps } from "@mui/material";
import { memo } from "react";



interface CardTypes extends CardProps {

}



const CardComp = memo(({children, ...props}:CardTypes) => {

    const {sx, ...cProps} = props


    return(
        <Card 

            sx={{
                width:'100%', 
                maxWidth: '500px', 
                ...sx,
            }}
            {...cProps}
        >
              <CardContent>
                    {children}
               </CardContent>
        </Card>
    )
})


export default CardComp as typeof Card;