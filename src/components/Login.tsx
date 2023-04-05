import { Link, useNavigate } from 'react-router-dom'
import { HttpClient } from '../common/services/HttpClient'
import { useForm } from 'react-hook-form'
import { AuthToken } from '../common/services/AuthToken'

interface FormValues{
  username: string
  password: string
  customError?: string
}

export const Login: React.FC = () => {

  const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const navigate = useNavigate()
  const url = 'http://localhost:3005/user/login'
  const _token = new AuthToken('user')
    
  async function handleLogin(values: FormValues){
    
    await new HttpClient().sendRequest(url,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    })
    .then(response => {
      if(response.token){
        _token.saveToken(response.token)
        console.log('login successfully')
        navigate("/")
      } else {
        setError('customError', { type: 'server', message: response.message})
      }
    })
    .catch( error => console.log(error))
 
  }

  return (
    <>
      <h3 className='subtitle' data-cy="login-subtitle">if you don't have an account <Link to='Signup' data-cy='signup-link'>Signup</Link></h3>
      <form className="user-form" onSubmit={handleSubmit(handleLogin)}>
        <p style={{ color: 'red', textAlign: 'center'}} data-cy="credential-error">{errors.customError?.message}</p>
        <input 
          {...register('username', {required: 'Username is required'})}
          type='text'
          className="task-text"
          placeholder="Username..."
          data-cy="login-username"
        />
        <p style={{ color: 'red' }} data-cy="login-username-error">{errors.username?.message}</p>
        <input 
          {...register('password', {required: 'Password is required'})}
          type="password"
          className="task-text"
          placeholder="Password..."
          data-cy="login-password"
        />
        <p style={{ color: 'red' }} data-cy="login-password-error">{errors.password?.message}</p>
        <button 
          type="submit"
          onClick={() => clearErrors()}
          disabled={isSubmitting}
          className='user-btn'
          data-cy="login-btn"
          >Login</button>
      </form>
    </>
  )
}
