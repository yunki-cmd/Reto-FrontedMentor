import CardFront from "../components/cardFront"
import CardBack from "../components/cardBack"
import "./home.css"

export default function Home() {


  const handlerNumberCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  return (
    <>
      <main className="body__home">
        <div>
         <CardFront className="transform translate-x-36 translate-y-48" />
          <CardBack className="transform translate-x-56 translate-y-56" />
        </div>
        <form className="w-[440px] h-96 transform translate-x-[800px] -translate-y-[200px] text-lg font-medium tracking-[2px]">
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="name" className="text-[#600594] text-[14px] uppercase my-1">
              Cardholder Name
            </label>
            <input name="name" id="name" type="text" placeholder="e.g. Jane Appleseed" className="rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent"/>
          </div>
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="cardNumber" className="text-[#600594] text-[14px] uppercase">
              Card Number
            </label>
            <input onChange={handlerNumberCard} name="cardNumber" id="cardNumber" type="text" placeholder="e.g. 1234 5678 9123 0000" className="rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent" />
          </div>
          <div className="flex flex-row w-full my-3">
            <div className="w-2/4">
              <label htmlFor="date" className="text-[#600594] text-[14px] uppercase">
                Exp. Date (MM/YY)
              </label>
              <div className=" flex flex-row">
                <input name="date" id="date" type="number" placeholder="MM" className="w-2/5 mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent no__spin" />
                <input name="date" id="date" type="number" placeholder="YY" className="w-2/5 mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent" />
            </div>
            </div>
            <div className="w-2/4">
              <div className="flex flex-col">
                <label htmlFor="cardNumber" className="text-[#600594] text-[14px] uppercase">
                  CVC
                </label>
                <input name="cardNumber" id="cardNumber" type="text" placeholder="e.g. 123" className="mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#600594] focus:border-transparent" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <button type="submit" className="w-full mr-3 my-3 rounded-lg border-2 border-[hsl(249, 99%, 64%)] p-4 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(278, 94%, 30%)] focus:border-transparent bg-[#21092f] text-white">Confirm</button>
          </div>
        </form>
      </main>
    </>
  )
}