import Container from '../../components/container';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/FirabaseConnection';
import { getDoc, doc } from 'firebase/firestore';
import Style from './car.module.css';
import { FaWhatsapp } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';


interface CarProps {
  id: string;
  uid: string;
  name: string;
  model: string;
  year: string;
  km: string | number;
  description: string;
  whatsapp: string,
  city: string;
  price: string | number;
  images: CarImagesProps[];
}

interface CarImagesProps {
  uid: string;
  name: string;
  url: string;
}


export default function Car() {
  const { id } = useParams();
  const [car, setCar] = useState<CarProps>();
  const [sliderPerView, setSliderPerView] = useState<number>(2);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCar() {
      const docRef = doc(db, "cars", `${id}`);
      getDoc(docRef)
      .then((snapshot) => {

        if (!snapshot.data()) {
          navigate("/");
        }

        setCar({
          id: snapshot?.id,
          uid: snapshot.data()?.uid,
          name: snapshot.data()?.name,
          model: snapshot.data()?.model,
          year: snapshot.data()?.year,
          km: snapshot.data()?.km,
          description: snapshot.data()?.description,
          whatsapp: snapshot.data()?.whatsapp,
          city: snapshot.data()?.city,
          price: snapshot.data()?.price,
          images: snapshot.data()?.images
        })
      })
    }

    loadCar();

  }, [id, navigate])


  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 578) {
        setSliderPerView(1);
      } else {
        setSliderPerView(2);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      handleResize();
    }

  }, [])

  return (
    <Container>
      {car && (
        <section className={Style.C_car}>
          <Swiper
            slidesPerView={sliderPerView}
            pagination={{ clickable: true }}
            navigation
          >
            {car?.images.map((image) => (
              <SwiperSlide>
                <img className={Style.Swiper_img} src={image.url} alt={image.name} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={Style.C_car_name}>
            <p>{car?.name}</p>
            <p>R$ {car?.price}</p>
          </div>
          <p className={Style.C_car_model}>{car?.model}</p>
          <div className={Style.C_car_details}>
            <div>
              <p>Cidade</p>
              <p>{car?.city}</p>
            </div>
            <div>
              <p>Ano</p>
              <p>{car?.year}</p>
            </div>
            <div>
              <p>KM</p>
              <p>{car?.km}</p>
            </div>
          </div>
          <div className={Style.C_car_description}>
            <p>Descrição:</p>
            <p>{car?.description}</p>
          </div>
          <div className={Style.C_car_whatsapp}>
            <p>Telefone / WhatsApp</p>
            <p>{car?.whatsapp}</p>
          </div>
          <a 
            href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Olá vi este ${car?.name} no site WebCarros e fiquei interessado`}
            target="_blank"
            className={Style.C_car_whatsapp_button}
            draggable='false'
          >
            Conversar com vendedor
            <FaWhatsapp size={22} color="#fff"/>
          </a>
        </section>
      )}
    </Container>
  )
}