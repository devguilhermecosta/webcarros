import Container from "../../components/container";
import Style from './home.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../services/FirabaseConnection';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';


interface CarProps {
  id: string;
  owner: string;
  uid: string;
  created_at: string;
  name: string;
  model: string;
  year: string;
  km: string;
  price: string | number;
  whatsapp: string;
  city: string;
  images: ImageProps[];
}

interface ImageProps {
  uid: string;
  name: string;
  url: string;
}

export default function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);

  
  useEffect(() => {
    function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("created_at", "desc"));

      getDocs(queryRef)
      .then((snapshot) => {
        const carList = [] as CarProps[];

        snapshot.forEach( doc => {
          carList.push({
            id: doc.id,
            owner: doc.data().owner,
            uid: doc.data().uid,
            created_at: doc.data().created_at,
            name: doc.data().name,
            model: doc.data().model,
            year: doc.data().year,
            km: doc.data().km,
            price: doc.data().price,
            whatsapp: doc.data().whatsapp,
            city: doc.data().city,
            images: doc.data().images
          })
        })

        setCars(carList);

      })
    }

    loadCars();

  }, [])

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

        {cars.map( (car) => (
          <Link key={car.id}  to={`/car/${car.id}`}>
            <section className={Style.C_main_car}>
              <img src={car.images[0].url} alt="car image" />
              <div className={Style.C_main_car_details}>
                <div className={Style.C_main_car_description}>
                  <p className={Style.C_main_car_details_name}>{car.name}</p>
                  <p className={Style.C_main_car_details_year}>{car.year}</p>
                  <p className={Style.C_main_car_details_price}><strong>R$ {car.price}</strong></p>
                </div>

                <div className={Style.C_main_car_details_city_container}>
                  <p className={Style.C_main_car_details_city}>{car.city}</p>
                </div>
              </div>
            </section>
          </Link>

        ) )}
  
      </main>
    </Container>
  )
}