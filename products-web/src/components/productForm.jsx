import { buildProduct } from '@/api/products';
import ToastSuccess, { ToastFail } from '@/components/toasts';
import { Input, Button, Loading  } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function ProductForm({title, buttonText, action, existingProduct, successToastMessage}) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [product, setNewProduct] = useState(existingProduct ?? {
        code: null,
        productName: null,
        brand: null,
        price: null,
        currency: {
            value: '€',//For now this is the only currency supported
            disabled: false
        } 
    })

    useEffect(() => {

    }, [submitted])

    const onSubmitAsync = async () => {
        setLoading(true);
        if (!(product.code && product.productName && product.brand && product.price)) {
          ToastFail(`There are some fields that need to be completed`).showToast()
          setSubmitted(true)
          setLoading(false);
          return;
        }

        let mappedProduct = buildProduct(product.code.value, 
            product.productName.value,
            product.brand.value,
            product.price.value,
            product.currency.value)
    
        let response = await action(mappedProduct);
        
        if (response.success){
          ToastSuccess(successToastMessage).showToast();
        }
        else{
          ToastFail(response.message).showToast()
        }
    
        setLoading(false);
      }

    const handleInputClass = (propertyValue) => {
        return submitted && !propertyValue ? 'border-2 border-rose-600 mb-3': 'mb-3';
    }
    
    const handleKeyDownHandlerAsync = async (event) => {
        if (event.key === 'Enter') {
            await onSubmitAsync();
        }
    }

    const handleValue = (property) => {
        return property ? property.value : null;
    }

    const handleDisabled = (property) => {
        return property ? property.disabled : false
    }

    return (
        <form method="post" onSubmit={async () => await onSubmitAsync()}  className='flex flex-col'>
            <h4>{title}</h4>
            <Input label="Code" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} placeholder="Product code" className={handleInputClass(product.code)} onChange={(e) => setNewProduct({...product, code: {value: e.currentTarget.value, disabled:false }})} value={handleValue(product.code)} disabled={handleDisabled(product.code)}/>
            <Input label="Name" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} placeholder="Product name" className={handleInputClass(product.productName)} onChange={(e) => setNewProduct({...product, productName: {value: e.currentTarget.value, disabled:false }})}  value={handleValue(product.productName)} disabled={handleDisabled(product.productName)}/>
            <Input label="Brand" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} placeholder="Product brand" className={handleInputClass(product.brand)} onChange={(e) => setNewProduct({...product, brand: {value: e.currentTarget.value, disabled:false }})}  value={handleValue(product.brand)} disabled={handleDisabled(product.brand)} />
            <Input label="Price" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} type='number' placeholder="Product price"  className={handleInputClass(product.price)} onChange={(e) => setNewProduct({...product, price: {value: e.currentTarget.value, disabled:false }})} value={handleValue(product.price)} disabled={handleDisabled(product.price)} />
            <Button flat color="primary" auto onPress={async () => await onSubmitAsync()}>
            { 
                loading ? (<Loading  type="points" color="currentColor" size="sm" />) : (buttonText)
            }
            </Button>
        </form>
    )
}
