import Container from "../../../components/container";
import PanelHeader from "../../../components/panelheader";
import Style from './new.module.css';
import Input from "../../../components/input";
import { FiUpload, FiTrash } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useState, useContext } from 'react';
import { storage, db } from '../../../services/FirabaseConnection';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../../contexts/authcontext';
import { v4 as uuidV4 } from 'uuid';


type FormData = z.infer<typeof schema>;

interface CarImageProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O campo modelo é obrigatório"),
  year: z.string().nonempty("O campo ano é obrigatório"),
  km: z.string().nonempty("O campo ano é obrigatório"),
  whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value) => /^[0-9]{11,12}$/.test(value), {
    message: "Número de telefone inválido."
  }),
  city: z.string().nonempty("O campo cidade é obrigatório"),
  price: z.string().nonempty("O campo preço é obrigatório"),
  description: z.string().nonempty("O campo descrição é obrigatório")
})


export default function New() {
  const { user } = useContext(AuthContext);
  const [ carImages, setCarImages ] = useState<CarImageProps[]>([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })


  function onSubmit(data: FormData) {
    if (carImages.length === 0) {
      alert("Envie ao menos uma imagem!");
      return;
    }

    const carImageList = carImages.map( carImage => {
      return {
        uid: carImage.uid,
        name: carImage.name,
        url: carImage.url
      }
    })

    addDoc(collection(db, "cars"), {
      owner: user?.name,
      uid: user?.uid,
      images: carImageList,
      created_at: new Date(),
      name: data.name,
      model: data.model,
      year: data.year,
      km: data.km,
      whatsapp: data.whatsapp,
      city: data.city,
      price: data.price,
      description: data.description
    })
    .then( () => {
      reset();
      setCarImages([]);
      console.log('cadastrado com sucesso');
    })
    .catch( (error) => {
      console.log(`Erro ao enviar a imagem: ${error}`);
    })
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        await handleUpload(image);
      } else {
        alert('envie somente imagens JPEG ou PNG...');
      }
      
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) return;

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    await uploadBytes(uploadRef, image)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref)
      .then((downloadUrl) => {
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl
        }

        setCarImages((images) => [...images, imageItem]);
      })
    })
  }

  async function handleDelete(image: CarImageProps) {
    const imageRef = ref(storage, `images/${image.uid}/${image.name}`);
    try {
      await deleteObject(imageRef);
      setCarImages(carImages.filter((carImage) => carImage.url !== image.url ));
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <Container>
      <PanelHeader />
      <div className={Style.C_image_gallery}>
        <button className={Style.C_image_gallery_button}>
          <div className={Style.C_image_gallery_button_icon}>
            <FiUpload size={30}/>
          </div>
          <div>
            <input
              type="file"
              accept="image/*" 
              className={Style.C_image_gallery_button_input}
              onChange={handleFile}
            />
          </div>
        </button>

        {carImages.map(item => (
          <div key={item.name} className={Style.C_image}>
            <button className={Style.C_image_button_delete}>
              <FiTrash 
                size={28} 
                color="#fff" 
                onClick={() => {handleDelete(item)}}
              />
            </button>
            <img 
              src={item.url} 
              alt="car image"
            />
          </div>
        ))}
      </div>

      <div className={Style.C_form}>
        <form onSubmit={handleSubmit(onSubmit)} className={Style.C_form_form}>
          <div className={Style.C_form_input_container}>
            <label htmlFor="name">Nome do carro</label>
            <Input
              type="text"
              name="name"
              placeholder="Ex: Onix 2013"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className={Style.C_form_input_container}>
            <label htmlFor="model">Modelo</label>
            <Input
              type="text"
              name="model"
              placeholder="Ex: Automático 1.0 turbo"
              register={register}
              error={errors.model?.message}
            />
          </div>

          <div className={Style.C_form_flex_container}>
            <div className={Style.C_form_input_container}>
              <label htmlFor="year">Ano</label>
              <Input
                type="text"
                name="year"
                placeholder="Ex: 2023/2023"
                register={register}
                error={errors.year?.message}
              />
            </div>
            <div className={Style.C_form_input_container}>
              <label htmlFor="km">KM rodado</label>
              <Input
                type="text"
                name="km"
                placeholder="Ex: 23.900"
                register={register}
                error={errors.km?.message}
              />
            </div>
          </div>

          <div className={Style.C_form_flex_container}>
            <div className={Style.C_form_input_container}>
              <label htmlFor="whatsapp">Telefone / Whatsapp</label>
              <Input
                type="text"
                name="whatsapp"
                placeholder="Ex: 011999179100"
                register={register}
                error={errors.whatsapp?.message}
              />
            </div>
            <div className={Style.C_form_input_container}>
              <label htmlFor="city">Cidade</label>
              <Input
                type="text"
                name="city"
                placeholder="Ex: Dois Vizinhos - PR"
                register={register}
                error={errors.city?.message}
              />
            </div>
          </div>

          <div className={Style.C_form_input_container}>
            <label htmlFor="price">Preço</label>
            <Input
              type="text"
              name="price"
              placeholder="Ex: R$ 47.900"
              register={register}
              error={errors.price?.message}
            />
          </div>

          <div className={Style.C_form_input_container}>
            <label htmlFor="description">Descrição</label>
            <textarea
              className={Style.C_form_textarea}
              id="description"
              placeholder="Digite a descrição completo sobre o carro..."
              {...register("description")}
              >
            </textarea>
            {errors?.description?.message && (
              <p className={Style.C_form_error_message}>{errors?.description.message}</p>
            )}
          </div>

          <button type="submit" className={Style.C_form_button}>
            Cadastrar
          </button>

        </form>
      </div>
    </Container>
  )
}