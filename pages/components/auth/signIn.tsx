import { handleToggle } from ".";
import CardComp from "../cards";
import Heading from "../headings";




type SigninTypes  = {
    handleToggle :  handleToggle
}




const SignIn = ({}:SigninTypes) => {
    return (
            <>
                <Heading variant="h3">
                    Login
                </Heading>
            </>
             
   )
}


export default SignIn;