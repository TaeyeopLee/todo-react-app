import React from 'react';
import {
    Button,
    TextField,
    Link,
    Grid,
    Container,
    Typography
} from '@material-ui/core';
import { signup } from './service/ApiService';

const SignUp = () => {

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    signup({email: email, username: username, password: password}).then(response => {
        // 계정 생성 성공시 login 페이지로 리디렉트
        window.location.href = '/login';
    });
  }

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '8%'}}>
      <form noValidate onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                  계정 생성
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='username'
                variant='outlined'
                required
                fullWidth
                id='username'
                label='사용자 이름'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='이메일 주소'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='패스워드'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
              >
                계정 생성
              </Button>
            </Grid>
          </Grid>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                이미 계정이 있으신가요? 로그인하기
              </Link>
            </Grid>
          </Grid>
      </form>
    </Container>
  )
}

export default SignUp;
