import React from 'react';
import { FormHelperText, MenuItem, Select, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

const CustomSelectField = ({ controller, label, optionsArray, required = true, ...props }) => {
  return (
    <div>
      {label && (
        <>
          <Typography variant="caption">{label}</Typography>
          <br />
        </>
      )}

      {controller ? (
        <>
          <Controller
            control={controller.control}
            name={controller.name}
            rules={{ required }}
            render={({ field: { onChange, value, onBlur } }) => (
              <Select
                fullWidth
                size="small"
                onChange={onChange}
                error={Boolean(controller.errors)}
                value={value ? value : ''}
                onBlur={onBlur}
                {...props}
              >
                {Array.isArray(optionsArray) &&
                  optionsArray.map(({ value, label, disabled = false }, index) => (
                    <MenuItem key={index} value={value} disabled={disabled}>
                      {label}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
          {controller.errors && (
            <FormHelperText sx={{ color: 'error.main' }}>{controller.errors.message}</FormHelperText>
          )}
        </>
      ) : (
        <Select fullWidth size="small" {...props}>
          {Array.isArray(optionsArray) &&
            optionsArray.map(({ value, label }, index) => (
              <MenuItem key={index} value={value}>
                {label}
              </MenuItem>
            ))}
        </Select>
      )}
    </div>
  );
};

export default CustomSelectField;
