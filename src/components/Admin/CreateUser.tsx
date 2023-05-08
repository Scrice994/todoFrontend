import { useForm } from 'react-hook-form'
import { UserService } from '../../common/services/UserService'
import { HttpClient } from '../../common/services/HttpClient'
import { LocalStorageHandler } from '../../common/services/LocalStorageHandler'

interface CreateUserFormValues{
    username: string
    password: string
    confirmPassword: string
    customError?: string
}

const CreateUser: React.FC = () => {

    const {register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting, isSubmitSuccessful }} = useForm<CreateUserFormValues>({ defaultValues: {
        username: '',
        password: '',
        confirmPassword: ''
    }})
    
    async function createNewMember(values: CreateUserFormValues){
        const url = 'http://localhost:3005'

        const createUser = await new UserService(new HttpClient(), url, new LocalStorageHandler('user')).createNewMember(values)

        if(!createUser.status) return setError('customError', { type: 'server', message: createUser.message})
    }

    return (
        <div>
            <h1 className='create-user-title'>Create new group member:</h1>
            <p style={{ color: 'red', textAlign: 'center'}} data-cy="create-member-credentials-error">{errors.customError?.message}</p>      
            <form className="user-form" onSubmit={handleSubmit(createNewMember)}>
                <input
                    type='text'
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
                    placeholder="Username...*"
                    data-cy="member-username"           
                />
                <p  
                    style={{ color: 'red' }} 
                    data-cy="create-member-username-error">
                        {errors.username?.message}
                </p>
                <input
                    type='password'
                    {...register('password', {
                        required: 'Password is required',
                        validate: (value) => {
                            if(value.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/)){
                                return true
                            }
                            return "Password must contain at least 1 number, 1 letter and more than 6 chars"
                        }
                    })} 
                    className="task-text"
                    placeholder="Password...*"
                    data-cy="member-password"
                />
                <p  
                    style={{ color: 'red' }} 
                    data-cy="create-member-password-error">
                        {errors.password?.message}
                </p>
                <input 
                    type='password'
                    {...register('confirmPassword', {
                        required: 'Confirm password is required' })} 
                    className="task-text"
                    placeholder="Confirm password...*"
                    data-cy="member-confirmPassword"
                />
                <p  
                    style={{ color: 'red' }} 
                    data-cy="create-member-confirmPassword-error">
                        {errors.confirmPassword?.message}
                </p>
                <button
                    type='submit'
                    onClick={() => clearErrors()}
                    disabled={isSubmitting}
                    className='user-btn'
                    data-cy='create-member-submit-btn'
                >
                    Create
                </button>
                {isSubmitSuccessful && <p style={{ color: 'green', textAlign: 'center'}}>Member created with success!</p>}
            </form>
        </div>
    )
}

export default CreateUser