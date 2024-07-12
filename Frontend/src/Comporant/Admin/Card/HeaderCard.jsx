import './Card.css'

import {Color} from '../../CSS/Css.jsx'
const HeaderCard = (prop) => {
  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#ffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    margin:'20px',
    


  };
  
  return (
    <div  style={cardStyle}  >
      <div className='HeaderCard__left' style={{width:'auto' , height:'100px' }}>
        <img src={prop.icon} alt="" />
      </div>
      <div className='HeaderCard__right  w-100 mt-2 '>
        <h2 style={{color:Color.PrimaryColor }}>{prop.title}</h2>
        <h3 style={{ color: Color.SecondaryColor }}>{prop.count}</h3>
      </div>
    </div>
  )
}

export default HeaderCard
