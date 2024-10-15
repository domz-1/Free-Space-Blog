import {  Stack, Typography } from '@mui/material';

export const LandingPage = () => {
  return (
    <>
    <Stack sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '22vh',
    }}>
        <Typography variant='h2'>Free Space</Typography>
        <Typography variant='h6'>
        Your Platform, Your Perspective
        </Typography>
    </Stack>
    </>
  )
}
