import { Controller } from 'react-hook-form';
import { FormGroup, FormControlLabel, Checkbox, FormHelperText, Typography, Tooltip } from '@mui/material';
import { ICONS } from 'src/assets/library';

const CustomCheckboxField = ({ controller, options, label, helpText, required = true, ...props }) => {
  return (
    <div>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Typography variant="caption">{label}</Typography>
          {helpText && (
            <Tooltip arrow title={helpText}>
              {ICONS.HELP}
            </Tooltip>
          )}

          <br />
        </div>
      )}
      {controller && (
        <>
          <Controller
            control={controller.control}
            name={controller.name}
            rules={{
              required: required && 'This field is required',
              validate: (value) => (value && value.length > 0 ? true : 'At least one option must be selected'),
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <FormGroup>
                  {options.map((option) => (
                    <FormControlLabel
                      key={option._id}
                      control={
                        <Checkbox
                          checked={value?.includes(option._id)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...value, option._id]
                              : value.filter((id) => id !== option._id);
                            onChange(newValue);
                          }}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
                {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
              </>
            )}
          />
        </>
      )}
    </div>
  );
};

export default CustomCheckboxField;
