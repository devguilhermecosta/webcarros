import Style from './register.module.css';
import Container from '../../components/container';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import Input from '../../components/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


// cria um esquema de validação de campo.
// cada campo deve ser validado individualmente.
// o nome do campo deve ser o mesmo do nome do input
const schema = z.object({
  name: z.string().nonempty("Este campo é obrigatório"),
  email: z.string().email("Insira um email válido").nonempty("Este campo é obrigatório"),
  password: z.string()
  .min(6, "A senha deve ter pelo menos 6 catacteres")
  .nonempty("Este campo é obrigatório")
})

// cria um novo tipo primitivo.
// estamos dizendo que o tipo 'infer' recebe dados do tipo 'schema'
type FormData = z.infer<typeof schema>;

export default function Register() {
  /*
    - register é um método que registra individualmente cada input do form com seus
    respectivos validadore e regras;
     - handleSubmit é uma função que deve ser chamada quando o formulário sofrer o 
     evento de submit;
     - formState retorna uma const 'errors', que armazena possíveis mensagens de erro.
     - resolver é quem fará as validações através do nosso schema;
     - mode é o evento que será chamado para validar os inputs, neste caso a cada letra
     digitada o resolver será chamado.
  */
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  
  // função que será chamada quando o form sofrer submit
  function onSubmit(data: FormData) {
    console.log(data);
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

          {/*
          - o name deve ser o mesmo do schema.
          - error são as mensagens de erro de cada schema.
          - register serve para registrar o input.
          ...leia também o arquivo de configuração do Input...
          */}
          <Input
            type="text"
            placeholder="Digite seu nome completo..."
            name="name"
            error={errors?.name?.message}
            register={register}
          />

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
            Registrar
          </button>
        </form>

        <Link
          to="/login"
          className={Style.link_register}>
          Já possui uma conta? Faça login!
        </Link>
      </div>
    </Container>
  )
}