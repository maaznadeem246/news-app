import { DeepPartial, useForm } from "react-hook-form";
import { z, ZodFirstPartySchemaTypes, ZodSchema } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';




export  interface useFormHookType<T extends z.ZodType<any, any, any> > {
    formSchema: T,
    defaulvalues: z.infer<T>
}



const useFormHook  = <T extends  ZodSchema> ({formSchema,defaulvalues}:  useFormHookType<T>) => {
    const { register,control, handleSubmit, formState:{ errors }, } = useForm({
        defaultValues:defaulvalues,
        resolver: zodResolver(formSchema),
      });
     


      return {
        register, handleSubmit,  errors ,control
      }
}

export default useFormHook;