import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authcontext';
import Container from '../../components/container';
import PanelHeader from '../../components/panelheader';
import Style from './dashboard.module.css';
import { FiTrash2 } from 'react-icons/fi';
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../services/FirabaseConnection';


interface CarProps {
  id: string;
  uid: string;
  name: string;
  price: string | number;
  km: string;
  year: string;
  city: string;
  images: ImageProps[];
}

interface ImageProps {
  name: string;
  uid: string;
  url: string; 
}


export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) return;

      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user?.uid));

      getDocs(queryRef)
      .then((snapshot) => {
        const carsList = [] as CarProps[];

        snapshot.forEach((doc) => {
          carsList.push({
            id: doc.id,
            uid: doc.data().uid,
            name: doc.data().name,
            price: doc.data().price,
            km: doc.data().km,
            year: doc.data().year,
            city: doc.data().city,
            images: doc.data().images
          })

        })

        setCars(carsList);

      })
    }

    loadCars();

  }, [user])

  async function handleDelete(carDelete: CarProps) {
    const confirm = window.confirm('deseja realmente deletar este carro?');

    if (confirm) {
      const carRef = doc(db, "cars", carDelete.id);
      await deleteDoc(carRef);
      setCars(cars?.filter(car => car.id !== carDelete.id));

      carDelete.images.map( async image => {
        const imagePath = `images/${image.uid}/${image.name}`;
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
      })
    }
  }

  return (
    <Container>
      <PanelHeader />

      <main className={Style.C_main}>

        {cars?.map((car) => (
          <section key={car.id} className={Style.C_car}>
            <button 
              className={Style.C_car_button}
              onClick={() => {handleDelete(car)}}
            >
              <FiTrash2 size={24}/>
            </button>
            <img
              className={Style.C_car_img}
              src={car?.images[0].url} alt={car?.name}
            />
            <p className={Style.C_car_name}>{car?.name}</p>
            <p className={Style.C_car_year}>Ano {car?.year} | {car?.km} km</p>
            <p className={Style.C_car_price}>R$ {car?.price}</p>
            <span></span>
            <p className={Style.C_car_city}>{car?.city}</p>
          </section>
        ))}

      </main>
    </Container>
  )
}