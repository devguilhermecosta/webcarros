import Container from "../../../components/container";
import PanelHeader from "../../../components/panelheader";
import Style from './new.module.css';
import { FiUpload } from 'react-icons/fi';

export default function New() {
  return (
    <Container>
      <PanelHeader />
      <div className={Style.C_image_gallery}>
        <button className={Style.C_image_gallery_button}>
          <div className={Style.C_image_gallery_button_icon}>
            <FiUpload size={30}/>
          </div>
          <div>
            <input type="file" accept="image/*" className={Style.C_image_gallery_button_input}/>
          </div>
        </button>
      </div>
    </Container>
  )
}