



import { createServerSupabaseClient, supabase } from '../../modules/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from 'types/supabase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const supabaseServerClient = createServerSupabaseClient<Database>({
  //   req,
  //   res,
  // })
  const data = await supabase.auth.getSession()
  console.log(data)
  res.status(200).json({ name: data ?? '' })
}