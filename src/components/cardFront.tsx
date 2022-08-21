import { useEffect, useState } from "react"
import "./cards.css"

interface props {
  style?: React.CSSProperties
  className?: string,
  cardNumber: string,
  date: { mm: string, yy: string }
  name:string
}

export default function CardFront({ style, className, cardNumber, date,name }: props) {
  
  const [cardNumberState, setCardNumberState] = useState(cardNumber || "0000000000000000")

  useEffect(() => {
    setCardNumberState(splitNumber(cardNumber,16))
  }, [cardNumber])

  function splitNumber(number: string, longitud:number): string {
    const splited = number.split(" ")
    return splited.join("").padEnd(longitud,"0")
  }

  return (
    <>
      <div className={`h-56 w-[440px] bg-[url('/images/bg-card-front.png')] rounded-lg shadom ${className}`} style={style}>
        <div className="flex flex-row transform translate-x-8 translate-y-6">
          <span className="w-10 h-10 bg-white rounded-[50%]"></span>
          <span className="w-4 h-4 border rounded-[50%] transform translate-x-3 translate-y-3"></span>
        </div>
        <div className="h-5 w-full text-white font-medium transform translate-x-8 translate-y-24 text-[25px]">
          <span className="tracking-[3px]">{cardNumberState.substring(0,4)}</span>
          <span className="tracking-[3px] m-3">{cardNumberState.substring(4, 8)}</span>
          <span className="tracking-[3px] m-3">{cardNumberState.substring(8, 12)}</span>
          <span className="tracking-[3px] m-3">{cardNumberState.substring(12, 16)}</span>
        </div>
        <div className="transform translate-x-8 translate-y-[120px] text-white text-[14px] uppercase tracking-[2px]">{name === "" ? "Jane Appleseed": name}
        </div>
        <div className="transform translate-x-[355px] translate-y-[100px] text-white font-[18px] tracking-[2px]">{date.mm.padEnd(2,"0")}/{ date.yy.padEnd(2,"0")}</div>
      </div>
    </>
  )
}