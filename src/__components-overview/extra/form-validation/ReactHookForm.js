import { useState, useRef } from 'react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import cloudUploadFill from '@iconify/icons-eva/cloud-upload-fill';
import { Icon } from '@iconify/react';
import {
  Stack,
  TextField,
  Button,
  Typography,
  FormHelperText,
} from '@mui/material';
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
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const {
    watch,
    reset,
    control,
    register,
    setValue,
    // setValue1,
    // setValue2,
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
  const handleClickAttachPhoto1 = () => {
    fileInputRef1.current?.click();
  };
  const handleClickAttachPhoto2 = () => {
    fileInputRef2.current?.click();
  };

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(
      JSON.stringify(
        {
          ...data,
          photo: data.photo?.name,
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
                // label="Full Name"
                label="Make"
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
                // label="Email address"
                label="Model"
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
                // label="Age"
                label="Year"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <div>
            <Typography variant="body2">
              <strong>Vehicle Images (Optional)</strong>
            </Typography>

            <Stack
              direction="row"
              sx={{ mt: 2, mb: 2 }}
              alignItems="center"
              justifyContent="flex"
              spacing={3}
            >
              <div>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={handleClickAttachPhoto}
                    startIcon={<Icon icon={cloudUploadFill} />}
                  >
                    Upload photo
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
                  <FormHelperText sx={{ px: 1.5, display: 'block' }} error>
                    {errors.photo.message}
                  </FormHelperText>
                )}
              </div>
            </Stack>
            <Typography variant="caption" sx={{ mt: 1, mb: 2 }}>
              * For a more accurate price estimate, please allow up to 24 hours
              for the CarX Vehicle Appraisal team to view the image files and
              return with an updated appraisal price.
            </Typography>
          </div>

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
