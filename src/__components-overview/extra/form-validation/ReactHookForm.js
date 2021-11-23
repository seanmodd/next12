import { useState, useRef } from 'react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import cloudUploadFill from '@iconify/icons-eva/cloud-upload-fill';
import { Icon } from '@iconify/react';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { DevTool } from '@hookform/devtools';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { fData } from 'src/utils/formatNumber';
import { LoadingButton } from '@mui/lab';

import {
  FormSchema,
  defaultValues,
} from 'src/__components-overview/extra/form-validation';

const ReactHookForm = ({ openDevTool }) => {
  const fileInputRef = useRef(null);
  const {
    watch,
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const watchAllFields = watch();

  const handleClickAttachPhoto = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(
      JSON.stringify(
        {
          ...data,
        },
        null,
        2
      )
    );
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Full Name"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email address"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="age"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Age"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
          {/* <div>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Button
                color="warning"
                variant="contained"
                onClick={handleClickAttachPhoto}
                startIcon={<Icon icon={cloudUploadFill} />}
              >
                Photo (optional)
              </Button>

              <div>
                {watchAllFields.photo?.name && (
                  <Typography variant="subtitle2">
                    {watchAllFields.photo.name}
                  </Typography>
                )}
                {watchAllFields.photo?.size && (
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    {fData(watchAllFields.photo.size)}
                  </Typography>
                )}
              </div>

              <input
                {...register('photo')}
                ref={fileInputRef}
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setValue('photo', file);
                }}
                style={{ display: 'none' }}
              />
            </Stack>

            {errors.photo && (
              <FormHelperText sx={{ px: 2, display: 'block' }} error>
                {errors.photo.message}
              </FormHelperText>
            )}
          </div> */}
          <LoadingButton
            fullWidth
            color="info"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!isDirty}
          >
            Estimate Price!
          </LoadingButton>
        </Stack>
        {openDevTool && <DevTool control={control} placement="top-right" />}
      </form>
    </>
  );
};
export default ReactHookForm;
