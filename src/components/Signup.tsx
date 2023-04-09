import { useNavigate } from 'react-router-dom'
import { HttpClient } from '../common/services/HttpClient'
import { UserService } from '../common/services/UserService'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { LocalStorageHandler } from '../common/services/LocalStorageHandler'

interface FormValues{
  username: string
  password: string
  customError?: string
}

export const Signup: React.FC = () =>  {

  const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<FormValues>({ defaultValues: {
    username: '',
    password: ''
  }})
  const navigate = useNavigate()

  async function handleSignup(values: FormValues){
    const url = 'http://localhost:3005/user'

    const saveUser = await new UserService(new HttpClient(), url, new LocalStorageHandler('user')).postValues(values, '/signup')

    if(!saveUser.status) return setError('customError', { type: 'server', message: saveUser.message})

    if(saveUser.status) navigate("/")
  }

  return (
    <div>
      <h3 className='subtitle'>Create new account:</h3>
      <form className="user-form" onSubmit={handleSubmit(handleSignup)}>
        <p style={{ color: 'red', textAlign: 'center'}} data-cy="signup-credentials-error">{errors.customError?.message}</p>
        <input 
          type="text"
          {...register('username', { 
            required: 'Username is required', 
            validate: (value) => {
              if(value.match(/^[a-zA-Z0-9]{4,20}$/)){
                return true
              }
              return "Username can't contain special chars and its length must be between 4 and 20"
            }})
          }
          className="task-text"
          placeholder="Username..."
          data-cy="signup-username"
        />
        <p style={{ color: 'red' }} data-cy="signup-username-error">{errors.username?.message}</p>
        <input 
          type="password"
          {...register('password', { 
            required: 'Password is required',
            validate: (value) => {
              if(value.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/)){
                return true
              }
              return "Password must contain at least 1 number, 1 letter and more than 6 chars"
            }})
          }
          className="task-text"
          placeholder="Password..."
          data-cy="signup-password"
        />
        <p style={{ color: 'red' }} data-cy="signup-password-error">{errors.password?.message}</p>
        <button 
          type="submit"
          onClick={() => clearErrors()}
          disabled={isSubmitting}
          className='user-btn'
          data-cy="form-submit-btn"
          >Signup</button>
      </form>
      <h3 className='subtitle'>If u already have an account <Link to='/login'>Login</Link></h3>
    </div>
  )
}
