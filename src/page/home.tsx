import CardFront from "../components/cardFront"
import CardBack from "../components/cardBack"
import "./home.css"
import React, { useState } from "react"



interface typeError{
  type: string
  message: string | ''
}

interface valorInput {
  valor: string,
  error: typeError
}

interface dateInput {
  valor: { mm: string, yy: string },
  error: typeError
}

interface formData {
  name: valorInput,
  number: valorInput,
  date: dateInput,
  cvc: valorInput
}

const TypeErrorMessage = {
  vacio: "Can`t be blanck",
  NumberFormat: "Wrong format, numbers only"
}


export default function Home() {

  const [formData, setFormData] = useState<formData>({
    name: { valor: "", error: {type:"",message:''}},
    number: { valor: "", error: { type:"",message: '' }},
    date: { valor: {mm:"",yy:""}, error: { type: "",message: '' }},
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

  const handlerChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (value === '') {
      setFormData(prev => {
        return {
          ...prev,
          name: { valor: value, error: { type:"vacio", message: TypeErrorMessage.vacio } }
        }
      })
    }else (
    setFormData(prev => {
      return {
        ...prev,
        name: { valor: value, error: { type: "", message: "" } }
      }
    })
    )
  }

  const hanlderChangeDateMM = (e:React.ChangeEvent<HTMLInputElement>) => {
    let mm = e.target.value
    let type = ""
    let message = ""
    let regex = /[a-zA-Z]/gm
    if (mm === "") {
        type= "mm"
        message = TypeErrorMessage.vacio
    }
    if (regex.test(mm)) {
      type = "mm"
      message = TypeErrorMessage.NumberFormat
    }
    setFormData(prev => {
      return {
        ...prev,
        date: { valor: { mm: mm, yy: prev.date.valor.yy }, error: {type, message} }
      }
    })
  }

  const hanlderChangeDateYY = (e: React.ChangeEvent<HTMLInputElement>) => {
    let yy = e.target.value
    let type = ""
    let message = ""
    let regex = /[a-zA-Z]/gm
    if (yy === "") {
      type = "yy"
      message = TypeErrorMessage.vacio
    }
    if (regex.test(yy)) {
      type = "yy"
      message = TypeErrorMessage.NumberFormat
    }
    setFormData(prev => {
      return {
        ...prev,
        date: { valor: { mm: prev.date.valor.mm, yy: yy }, error: {type, message}}
      }
    })
  }

  const hanlderChangeCVC = (e:React.ChangeEvent<HTMLInputElement>) => {
    let cvc = e.target.value
    let type = ""
    let message = ""
    let regex = /[a-zA-Z]/gm
    if (cvc === "") {
      type = "vacio"
      message = TypeErrorMessage.vacio
    }
    if (regex.test(cvc)) {
      type = "NumberFormat"
      message = TypeErrorMessage.NumberFormat
    }
    setFormData(prev => {
      return {
        ...prev,
        cvc: { valor: cvc, error: {type, message} }
      }
    })

  }

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (formData.number.error.type === "" && formData.number.valor.length === 19 && formData.name.valor !== "" && formData.date.valor.mm !== "" && formData.date.valor.yy !== "" && formData.cvc.error.type === "") { 
      setConfirm(!confirm)
    }
  }


  return (
    <>
      <main className="body__home">
        <div>
          <CardFront cardNumber={formData.number.valor} date={formData.date.valor} name={formData.name.valor} className="transform translate-x-36 translate-y-48" />
          <CardBack cvc={formData.cvc.valor} className="transform translate-x-56 translate-y-56" />
        </div>
        {!confirm ? <form className="w-[440px] h-96 transform translate-x-[800px] -translate-y-[200px] text-lg font-medium tracking-[2px]">
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="name" className="text-[#600594] text-[14px] uppercase my-1">
              Cardholder Name
            </label>
            <input onChange={handlerChangeName} name="name" maxLength={25} value={formData.name.valor} id="name" type="text" placeholder="e.g. Jane Appleseed" className={`rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent capitalize ${formData.name.error.type !== '' ? 'border-[#ff5252] focus:ring-[#ff5252]' : 'border-[hsl(249, 99%, 64%)] focus:ring-[#600594]'}`} />
            {formData.name.error.type !== '' && <span className="mt-3 text-red-600 text-xs">{formData.name.error.message}</span>}
          </div>
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="cardNumber" className="text-[#600594] text-[14px] uppercase">
              Card Number
            </label>
            <input onChange={handlerMaskNumber} maxLength={19} value={formData.number.valor} name="cardNumber" id="cardNumber" type="text" placeholder="e.g. 1234 5678 9123 0000" className={`rounded-md border-2 p-2 font-medium focus:outline-none focus:ring-2 focus:border-transparent uppercase ${formData.number.error.type !== '' ? 'border-[#ff5252] focus:ring-[#ff5252]' : 'border-[hsl(249, 99%, 64%)] focus:ring-[#600594]' }`} />
            {formData.number.error.type !== '' && <span className="mt-3 text-red-600 text-xs">{formData.number.error.message}</span>}
          </div>
          <div className="flex flex-row w-full my-3">
            <div className="w-2/4">
              <label htmlFor="date" className="text-[#600594] text-[14px] uppercase">
                Exp. Date (MM/YY)
              </label>
              <div className=" flex flex-row">
                <input onChange={hanlderChangeDateMM} value={formData.date.valor.mm} pattern="[0-9]+" name="dateMM" id="dateMM" type="text" maxLength={2} placeholder="MM" className={`w-2/5 mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent no__spin ${formData.date.error.type === 'mm' ? 'border-[#ff5252] focus:ring-[#ff5252]' : 'border-[hsl(249, 99%, 64%)] focus:ring-[#600594]'}` } />
                <input onChange={hanlderChangeDateYY} value={formData.date.valor.yy}  pattern="[0-9]+" name="dateYY" id="dateYY" type="text" maxLength={2} placeholder="YY" className={`w-2/5 mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent ${formData.date.error.type === 'yy' ? 'border-[#ff5252] focus:ring-[#ff5252]' : 'border-[hsl(249, 99%, 64%)] focus:ring-[#600594]'}`} />
              </div>
              {formData.date.error.type !== '' && <span className="mt-3 text-red-600 text-xs">{formData.date.error.message}</span>}
            </div>
            <div className="w-2/4">
              <div className="flex flex-col">
                <label htmlFor="CVC" className="text-[#600594] text-[14px] uppercase">
                  CVC
                </label>
                <input onChange={hanlderChangeCVC} value={formData.cvc.valor} name="CVC" id="CVC" maxLength={3} type="text" placeholder="e.g. 123" className={`mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent ${formData.cvc.error.type !== '' ? 'border-[#ff5252] focus:ring-[#ff5252]' : 'border-[hsl(249, 99%, 64%)] focus:ring-[#600594]'}`} />
                {formData.cvc.error.type !== '' && <span className="mt-3 text-red-600 text-xs">{formData.cvc.error.message}</span>}
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