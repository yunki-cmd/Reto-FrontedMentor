import CardFront from "../components/cardFront"
import CardBack from "../components/cardBack"
import "./home.css"
import { useEffect, useState } from "react"

interface formData {
  name: string,
  number: string,
  date: string,
  cvc: string
}


export default function Home() {

  const [formData, setFormData] = useState<formData>({
    name: '',
    number: '',
    date: '00/00',
    cvc:'123'
  })

  const [confirm, setConfirm] = useState<Boolean>(false)
  const [errorNumber, setErrorNumber] = useState<Boolean>(false)


  const handlerMaskNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let pos = [3,7,11,15]
    let markNumber:string = value
    for (let index = 0; index < pos.length; index++) {
      if(value.length > pos[index]){
        markNumber = markNumber.concat(value)
      }      
    }
    setFormData(prev => {
      return {
        ...prev,
        number: value
      }
    })
  }

  const handlerSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setConfirm(!confirm)
  }

  useEffect(()=> {
    let regex = /[a-zA-Z]/
    if(regex.test(formData.number) && formData.number.length >= 1){
      if(errorNumber !== true){
        setErrorNumber(true)
      }
    }else {
      setErrorNumber(false)
    }
  },[formData.number])


  return (
    <>
      <main className="body__home">
        <div>
         <CardFront className="transform translate-x-36 translate-y-48" />
          <CardBack className="transform translate-x-56 translate-y-56" />
        </div>
        {!confirm ? <form className="w-[440px] h-96 transform translate-x-[800px] -translate-y-[200px] text-lg font-medium tracking-[2px]">
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="name" className="text-[#600594] text-[14px] uppercase my-1">
              Cardholder Name
            </label>
            <input name="name" id="name" type="text" placeholder="e.g. Jane Appleseed"  className={`rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent capitalize`}/>
          </div>
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="cardNumber" className="text-[#600594] text-[14px] uppercase">
              Card Number
            </label>
            <input onChange={handlerMaskNumber}  value={formData.number}name="cardNumber" id="cardNumber" type="text" placeholder="e.g. 1234 5678 9123 0000" className={`rounded-md border-2 p-2 font-medium focus:outline-none focus:ring-2 focus:border-transparent capitalize ${errorNumber ? 'border-[#ff5252] focus:ring-[#ff5252]' : 'border-[hsl(249, 99%, 64%)] focus:ring-[#600594]' }`} />
            {errorNumber && <span className="mt-3 text-red-600">Wrong format, numbers only</span>}
          </div>
          <div className="flex flex-row w-full my-3">
            <div className="w-2/4">
              <label htmlFor="date" className="text-[#600594] text-[14px] uppercase">
                Exp. Date (MM/YY)
              </label>
              <div className=" flex flex-row">
                <input name="date" id="date" type="text" maxLength={2} placeholder="MM" className="w-2/5 mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent no__spin" />
                <input name="date" id="date" type="text" maxLength={2} placeholder="YY" className="w-2/5 mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent" />
            </div>
            </div>
            <div className="w-2/4">
              <div className="flex flex-col">
                <label htmlFor="CVC" className="text-[#600594] text-[14px] uppercase">
                  CVC
                </label>
                <input name="CVC" id="CVC" maxLength={3} type="text" placeholder="e.g. 123" className="mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <button onClick={handlerSubmit} type="submit" className="w-full mr-3 my-3 rounded-lg border-2 border-[hsl(249, 99%, 64%)] p-4 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(278, 94%, 30%)] focus:border-transparent bg-[#21092f] text-white">Confirm</button>
          </div>
        </form> :
        <div className="w-[440px] h-96 transform translate-x-[800px] -translate-y-[150px] text-lg font-medium tracking-[2px]">
          <div className="flex justify-center mb-5">
            <img src="/images/icon-complete.svg" alt="check-confirm" />
          </div>
          <div className="flex flex-col text-center my-3">
            <span className="my-3 text-[24px] font-medium text-[#21092f]">THANK YOU!</span>
            <span className="my-3 text-[#8e8593]">We've added your card details</span>
          </div>
          <button onClick={handlerSubmit} type="button" className="w-full mr-3 my-3 rounded-lg border-2 border-[hsl(249, 99%, 64%)] p-4 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(278, 94%, 30%)] focus:border-transparent bg-[#21092f] text-white">Continue</button>
        </div> 
        }
      </main>
    </>
  )
}