import Image from "next/image";

const  OrderPage = () => {

    return (
        <div className="bg-slate-950 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <input className="" type="text" />

                <div className="">
                    <h1>Order №</h1>
                    <Image
                    src={"/images/order.png"}
                    alt="Order"
                    width={600}
                    height={400}
                    />
                    <p>Problem description</p>
                    <p>Order Status</p>
                    <button>Call to the specialist for getting current ifno </button>
                </div>
            </div>
        </div>
    )
}

export default OrderPage;