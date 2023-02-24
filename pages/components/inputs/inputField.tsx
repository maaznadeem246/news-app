import { useFormHookType } from "@/modules/hooks/useFormHook";
import {  FormControlProps, TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Control, ControllerProps, ControllerRenderProps,} from "react-hook-form/dist/types";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { Path } from "react-hook-form/dist/types/path";
import { object, ZodSchema } from "zod";
import {signForType} from "../auth/signUp"






interface InputFieldTypes<T extends  FieldValues & TextFieldProps  >  {
     
    name:Path<T>,
    control:Control< T >,
    
} 




const InputField  = <T extends FieldValues & TextFieldProps>({
   
    control,
    name,
    ...FieldProps
}:InputFieldTypes<T>)  => {

    return (

        <Controller
            name={name}
            control={control}

            render={({ field }) => (

                <TextField  {...FieldProps} {...field} />
              )}
      />
      
    )
}

export default InputField;