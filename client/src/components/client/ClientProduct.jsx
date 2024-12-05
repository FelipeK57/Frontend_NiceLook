import { Button, Tooltip, useDisclosure } from '@nextui-org/react'
import PropTypes from 'prop-types'
import ProductDetails from './ProductDetails';

function CLientProduct({ product }) {

    CLientProduct.propTypes = {
        product: PropTypes.object.isRequired
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className=" flex flex-col  border-1 mb-8 border-slate-300 p-4 rounded-xl sm:w-full w-[95%] sm:m-0 m-auto">
            <div className='grid grid-cols-[1.8fr_0.2fr] '>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-2xl font-bold line-clamp-1 text-ellipsis'>
                        {
                            product.details.map((product) => product.product.name).join(", ")
                        }
                    </h3>
                    <div className='flex gap-2'>
                        <label className='text-xl text-nowrap font-bold'>Fecha de compra:</label>
                        <h3 className='text-xl text-nowrap'>{product.date}</h3>
                    </div>
                    <div className='flex gap-2'>
                        <label className='text-xl text-nowrap font-bold'>Precio:</label>
                        <h3 className='text-xl text-nowrap'>${product.total_price}</h3>
                    </div>
                    <div className='flex gap-2'>
                        <label className='text-xl text-nowrap font-bold'>Unidades:</label>
                        <h3 className='text-xl text-nowrap'>{product.total_quantity}</h3>
                    </div>
                </div>
                <div className='flex flex-col justify-end items-end gap-2'>
                    <Button onPress={onOpen}
                        isIconOnly
                        variant="bordered"
                        className='rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </Button>
                    <Tooltip showArrow={true} content={product?.method}>
                        <Button isIconOnly variant="bordered" className='rounded-full cursor-default'>
                            {product.method.toLowerCase().includes("tarjeta") ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>
                            }
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <ProductDetails isOpen={isOpen} onOpenChange={onOpenChange} product={product} />
        </div>
    )
}

export default CLientProduct