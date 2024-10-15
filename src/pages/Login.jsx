import { Box, Container, TextField, Typography, Button, FormGroup } from '@mui/material';
import { Link,  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchUser } from './../rtk/slices/userSlice'; // Ensure this is the correct path to your slice
import { useDispatch } from 'react-redux';


export const Login = () => {

    const dispatch = useDispatch();
    const nav = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await dispatch(fetchUser(values));
        if (response) {
          nav('/');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '88vh',
        }}
      >
        <Typography variant="h3">Login</Typography>
        <Typography variant="h3"></Typography>
        <Box sx={{ textAlign: 'center' }}>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: '200px',
              }}

            >
              <TextField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                id="email"
                label="Enter Your Email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete='email'
              />
              <TextField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                id="password"
                label="Enter Your Password"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                autoComplete='current-password'
              />
              <Button variant="contained" sx={{
                bgcolor: "#795757"
              }} type="submit">
                Login
              </Button>
            </FormGroup>
          </form>
          <Typography>
            New? <Link to={'/signIn'} style={{
              color: "#795757",
              textDecoration: "none"
            }}>SignIn</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};
