import CardFront from "../components/cardFront"
import CardBack from "../components/cardBack"
import "./home.css"
import { useState } from "react"



interface typeError{
  type: string
  message: string | ''
}

interface valorInput {
  valor: string,
  error: typeError
}

interface formData {
  name: valorInput,
  number: valorInput,
  date: valorInput,
  cvc: valorInput
}

const TypeErrorMessage = {
  vacio: "vacio",
  NumberFormat: "Wrong format, numbers only"
}


export default function Home() {

  const [formData, setFormData] = useState<formData>({
    name: { valor: "", error: {type:"",message:''}},
    number: { valor: "", error: { type:"",message: '' }},
    date: { valor: "", error: { type: "",message: '' }},
    cvc: { valor: "", error: { type:"", message: '' }} 

  })

  const [confirm, setConfirm] = useState<Boolean>(false)


  const handlerMaskNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    let regex = /[a-zA-Z]/
    let type = ""
    let message= ""
    if (regex.test(value)) {
      type = "NumberFormat"
      message = TypeErrorMessage.NumberFormat

    } else if (value === "") {
      type = "vacio"
      message = TypeErrorMessage.vacio
    } else {
      var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      var matches = v.match(/\d{4,16}/g);
      var match = matches && matches[0] || ''
      var parts = []

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
      }

      if (parts.length > 0) {
        value = parts.join(' ')
      }

    }
    setFormData(prev => {
      return {
        ...prev,
        number: { valor: value, error: { type, message}} 
      }
    })
  }

  const handlerSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(formData.number.error.type)
    if (formData.number.error.type === "") { 
      setConfirm(!confirm)
    }
  }


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
            <input onChange={handlerMaskNumber}  value={formData.number.valor} name="cardNumber" id="cardNumber" type="text" placeholder="e.g. 1234 5678 9123 0000" className={`rounded-md border-2 p-2 font-medium focus:outline-none focus:ring-2 focus:border-transparent capitalize ${formData.number.error.type !== '' ? 'border-[#ff5252] focus:ring-[#ff5252]' : 'border-[hsl(249, 99%, 64%)] focus:ring-[#600594]' }`} />
            {formData.number.error.type !== '' && <span className="mt-3 text-red-600">{formData.number.error.message}</span>}
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