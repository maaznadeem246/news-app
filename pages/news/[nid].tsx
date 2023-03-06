import Heading from "@/components/headings";
import useSingleNews from "@/modules/hooks/useSingleNews";
import SubNavLayout from "@/Project/layouts/subNavLayout";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ReactNode } from "react";




const SingleNewsPage = () => {

  const data = useSingleNews()

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
          Single News {data.author}
      </Heading>
  </Box>
    )
}


// SingleNewsPage.getLayout = function getLayout(page:ReactNode) {
//     return (
//       <SubNavLayout>
//         {page}
//       </SubNavLayout>
//     )
//   }
  



export default SingleNewsPage;