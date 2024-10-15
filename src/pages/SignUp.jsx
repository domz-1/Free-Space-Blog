import { Box, Container, TextField, Typography, Button, FormGroup } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createUser } from '../rtk/slices/userSlice';
import * as Yup from 'yup';

export const SignUp = () => {
  const navigate = useNavigate(); // Corrected usage
  const dispatch = useDispatch();

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
    onSubmit: (values) => {
      dispatch(createUser(values));
      formik.resetForm();
      navigate('/');
    },
  });

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '88vh',
      }}
    >
      <Typography variant="h3">Sign Up</Typography> {/* Updated Title */}

      <Box sx={{ textAlign: 'center' }}>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: '280px',
            }}
          >
            <TextField
              type="email"
              id="email"
              label="Enter Your Email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              type="password"
              id="password"
              label="Enter Your Password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button variant="contained" sx={{
              bgcolor:"#795757",

            }} type="submit">
              Sign Up
            </Button>
          </FormGroup>
        </form>
        <Typography>
          Already have an account? <Link to={'/signin'} style={{
            color: '#795757',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            marginLeft: '8px',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#633f3f',
            },
          }}>Sign In</Link>
        </Typography>
      </Box>
    </Container>
  );
};
