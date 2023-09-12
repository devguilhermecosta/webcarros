import Container from "../../components/container";
import Style from './home.module.css';

export default function Home() {
  return (
    <Container>
      <section className={Style.C_search}>
        <input
          type="text"
          placeholder="Digite o nome do carro..."
        />
        <button>Buscar</button>
      </section>

      <h1 className={Style.title}>Carros novos e usados em todo o Brasil</h1>

      <main className={Style.C_main}>
        <section className={Style.C_main_car}>
          <img src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2023/202309/20230909/peugeot-208-1.6-griffe-16v-flex-4p-automatico-wmimagem09314018065.jpg?s=fill&w=552&h=414&q=60" alt="car" />
          <div className={Style.C_main_car_details}>
            <div className={Style.C_main_car_description}>
              <p className={Style.C_main_car_details_name}>Nome do Carro</p>
              <p className={Style.C_main_car_details_year}>Ano do Carro</p>
              <p className={Style.C_main_car_details_price}><strong>R$ 100.000,00</strong></p>
            </div>

            <div className={Style.C_main_car_details_city_container}>
              <p className={Style.C_main_car_details_city}>Dois Vizinhos - PR</p>
            </div>
          </div>
        </section>
      </main>
    </Container>
  )
}