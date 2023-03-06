import Heading from "@/components/headings";
import SubNavLayout from "@/Project/layouts/subNavLayout";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ReactNode } from "react";




const SingleNews = () => {

    const router = useRouter()
    const {nid} = router.query
    console.log(nid)
    return (
      <Box 
      sx={{
          display:'flex',
          justifyContent:'center',
          marginTop:'3rem',
          marginBottom:'3rem',
      }}
  >
      <Heading
          variant="h3"
          headingStyle={true}
          sx={{
              textTransform:'capitalize'
          }}
      >
          Single News {nid}
      </Heading>
  </Box>
    )
}


// SingleNews.getLayout = function getLayout(page:ReactNode) {
//     return (
//       <SubNavLayout>
//         {page}
//       </SubNavLayout>
//     )
//   }
  



export default SingleNews;