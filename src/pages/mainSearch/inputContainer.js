import React from 'react';
import TextField from 'material-ui/TextField';

export default function InputContainer(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            {...other}
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...InputProps,
            }}
        />
    );
}
