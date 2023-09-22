import Style from './login.module.css';
import Container from '../../components/container';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../services/FirabaseConnection';
import { useEffect } from 'react';
import toast from 'react-hot-toast';


export default function Login() {
  const schema = z.object({
    email: z.string().email("Insira um email válido").nonempty("Este campo é obrigatório"),
    password: z.string().nonempty("Este campo é obrigatório")
  })
  
  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  const navigate = useNavigate();

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();

  }, [])

  
  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      toast.success('Login realizado com sucesso');
      navigate("/dashboard", { replace: true });
    })
    .catch((err) => {
      toast.error(`Erro ao fazer login: ${err}`);
    })
  }


  return (
    <Container>
      <div className={Style.C_login}>
        <Link to="/" className={Style.C_logo}>
          <img src={logo} alt="logo" className={Style.logo}/>
        </Link>

        <form
          className={Style.Login_form}
          onSubmit={handleSubmit(onSubmit)}
          >
          <Input
            type="email"
            placeholder="Digite seu email..."
            name="email"
            error={errors.email?.message}
            register={register}
          />

          <Input
            type="password"
            placeholder="Digite sua senha..."
            name="password"
            error={errors?.password?.message}
            register={register}
          />

          <button
            type="submit"
            className={Style.button_submit}>
            Acessar
          </button>
        </form>

        <Link
          to="/register"
          className={Style.link_register}>
          Ainda não possui uma conta? Cadastre-se.
        </Link>
      </div>
    </Container>
  )
}