import "./cards.css"

interface props {
  style?: React.CSSProperties
  className?: string
  cvc:string
}

export default function CardBack({ className, style, cvc }: props) {

  return (
    <>
      <div className={`h-56 w-[440px] bg-[url('/images/bg-card-back.png')] rounded-lg shadom ${className}`} style={style}>
        <div className="transform translate-x-[355px] translate-y-[110px] text-white font-[18px] tracking-[2px]">{ cvc.padEnd(3,"0")}</div>
      </div>
    </>
  )
}