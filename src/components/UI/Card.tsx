import Logo from "../icons/Logo";

type CardProps = {
    title:string;
    children:React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">

         <div className='flex justify-center'>
          <div className="w-14 h-14 md:w-16 md:h-16">
            <Logo />
          </div>
        </div>
      <h2 className="text-2xl font-bold mb-4 text-center">{props.title}</h2>
     
      <div>{props.children}</div>

      
    </div>
  )
}

export default Card