import { Link, useNavigate } from 'react-router-dom'
import { HttpClient } from '../common/services/HttpClient'
import { useForm } from 'react-hook-form'
import { LocalStorageHandler } from '../common/services/LocalStorageHandler'
import { UserService } from '../common/services/UserService'

interface LoginFormValues{
  username: string
  password: string
  customError?: string
}

export const Login: React.FC = () => {

  const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const navigate = useNavigate()
    
  async function handleLogin(values: LoginFormValues){
    const url = 'http://localhost:3005/user'
    
    const saveUser = await new UserService(new HttpClient(), url, new LocalStorageHandler('user')).postValues(values, '/login')

    if(!saveUser.status) return setError('customError', { type: 'server', message: saveUser.message})

    if(saveUser.status) navigate("/")
 
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
