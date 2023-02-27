
import {  Box, InputLabel, SxProps, TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";
import { Control,} from "react-hook-form/dist/types";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { Path } from "react-hook-form/dist/types/path";




interface InputFieldTypes<T extends  FieldValues  >   {
     
    name:Path<T>,
    control:Control< T >,
    sxLabel?:SxProps
    sxMainBox?:SxProps,   
} 




const InputField   = <T extends FieldValues  >({
   
    control,
    name,
    label,
    sxLabel={},
    sxMainBox={},
    ...fieldProps
}:InputFieldTypes<T> & TextFieldProps )  => {

    return (
        <>
        <Controller
        
            name={name}
            control={control}
           
            render={({ field }) => (
                <Box sx={sxMainBox}>
                    <InputLabel sx={sxLabel}>{label}</InputLabel>
                    <TextField  {...field}   {...fieldProps} />
                </Box>
              )}
      />
     </>
    )
}

export default InputField;