import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormHelperText, InputAdornment, TextField, Typography } from '@mui/material';
import { ICONS } from 'src/assets/library';

const CustomTextField = ({
  endIcon = false,
  controller,
  isPassword = false,
  label,
  type = 'text',
  required = true,
  icon,
  ...props
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const togglePassword = () => setIsShowPassword(!isShowPassword);
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
              <TextField
                className="autofill"
                slotProps={{
                  input: {
                    startAdornment: icon && <InputAdornment position="start">{icon}</InputAdornment>,
                    endAdornment: isPassword ? (
                      <InputAdornment sx={{ cursor: 'pointer' }} onClick={togglePassword} position="end">
                        {!isShowPassword ? ICONS.VISIBLE : ICONS.HIDE}
                      </InputAdornment>
                    ) : (
                      endIcon
                    ),
                  },
                }}
                fullWidth
                type={isShowPassword ? 'text' : type}
                size="small"
                onChange={onChange}
                error={Boolean(controller.errors)}
                value={value ? value : ''}
                onBlur={onBlur}
                {...props}
              />
            )}
          />
          {controller.errors && (
            <FormHelperText sx={{ color: 'error.main' }}>{controller.errors.message}</FormHelperText>
          )}
        </>
      ) : (
        <TextField
          type={type}
          fullWidth
          size="small"
          InputProps={{
            startAdornment: icon && <InputAdornment position="start">{icon}</InputAdornment>,
            endAdornment: endIcon && endIcon,
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default CustomTextField;
