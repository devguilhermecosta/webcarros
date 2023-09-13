import Style from './input.module.css';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';


/*
  - register é quem registrará o input;
  - errors são as mensagens de erro quando o schema for quebrado;
  - rules são as possíveis regras implementadas.
*/
interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export default function Input({ type, placeholder, name, register, rules, error }: InputProps) {
  return (
    <div>
      <input
        className={Style.input}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />
      {/* caso existam erros, eles serão exibidos no form */}
      {error && <p className={Style.error_message}>{error}</p>}
    </div>
  )
}