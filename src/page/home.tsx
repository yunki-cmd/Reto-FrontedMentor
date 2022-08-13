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
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-[hsl(279, 6%, 55%)] uppercase">
              Cardholder Name
            </label>
            <input name="name" id="name" type="text" placeholder="e.g. Jane Appleseed" className="rounded-md border-2 border-[hsl(249, 99%, 64%)] p-3 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(278, 94%, 30%)] focus:border-transparent"/>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="cardNumber" className="text-[hsl(279, 6%, 55%)] uppercase">
              Card Number
            </label>
            <input onChange={handlerNumberCard} name="cardNumber" id="cardNumber" type="text" placeholder="e.g. 1234 5678 9123 0000" className="rounded-md border-2 border-[hsl(249, 99%, 64%)] p-3 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(278, 94%, 30%)] focus:border-transparent" />
          </div>
          <div className="flex flex-row w-full">
            <div className="w-2/4">
              <label htmlFor="date" className="text-[hsl(279, 6%, 55%)] uppercase">
                Exp. Date (MM/YY)
              </label>
              <div className=" flex flex-row">
                <input name="date" id="date" type="text" placeholder="MM" className="w-2/5 mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-3 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(278, 94%, 30%)] focus:border-transparent" />
                <input name="date" id="date" type="text" placeholder="YY" className="w-2/5 mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-3 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(278, 94%, 30%)] focus:border-transparent" />
            </div>
            </div>
            <div className="w-2/4">
              <div className="flex flex-col">
                <label htmlFor="cardNumber" className="text-[hsl(279, 6%, 55%)] uppercase">
                  CVC
                </label>
                <input name="cardNumber" id="cardNumber" type="text" placeholder="e.g. 123" className="mr-3 my-3 rounded-md border-2 border-[hsl(249, 99%, 64%)] p-3 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(278, 94%, 30%)] focus:border-transparent" />
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}