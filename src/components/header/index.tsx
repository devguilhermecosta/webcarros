import logo from '../../assets/logo.svg';

export default function Header() {
  return (
    <header>
      <div>
        <img src={logo} alt="logo da loja" />
      </div>
      <h1>This is the Header</h1>
    </header>
  )
}