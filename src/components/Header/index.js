import './index.css'
import {MdMenu} from 'react-icons/md'

const Header = () => (
  <div className="header-container">
    <div className="insta-logo-container">
      <img
        src="https://res.cloudinary.com/dxxexodjx/image/upload/v1720600610/Standard_Collection_8_2x_orexjz.png"
        alt="instalogo"
        className="insta-logo-img"
      />
      <h2>Insta Share</h2>
    </div>

    <MdMenu className="menu-styling" />
  </div>
)

export default Header
