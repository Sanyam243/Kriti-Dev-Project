// import React from 'react'
// import Lookup from '../llm/Lookup'
// // import { api } from '@/convex/_generated/api'
// import {api} from '../../../convex/_generated/api'
// function PricingModel() {
//   const { user, setUser } = React.useContext(UserContext)
//   const UpdateToken = useMutation(api.user.UpdateToken)
//   const {selectedOption, setSelectedOption} = React.useState()
//   const onPaymentSuccess = async() => {
//   const token =user?.token+Number(selectedOption?.token);
//   console.log('Token after payment:', token);
//   await UpdateToken({
//     token:token,
//      userId:user?._id
//   })


//   }
//   return (
//     <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl;grid-cols-4 gap-5'>
//     {
//         Lookup.PRICING_OPTIONS.map((pricing, index) => (
//             <div key={index} className='border p-7 rounded-xl flex flex-col gap-3' onClick={()=>{setSelectedOption(pricing); console.log(pricing.value)}}>
//                 <h2 className='font-bold text-2xl'>{pricing.name}</h2>
//                 <h2 className='font-medium text-lg'>{pricing.tokens}</h2>
//                 <h2 className='text-gray-400'>{pricing.desc}</h2>
//                 <p className='font-bold text-4xl text-center mt-6'>{pricing.price}</p>
//                 {/* <Button>Upgrade to {pricing.name}</Button> */}
//                 <PayPalButtons style={{ layout: "horizontal" }} 
//                 disabled={!user}
//                 onClick={()=>{setSelectedOption(pricing); console.log(pricing.value)}}
//                 onApprove={()=>onPaymentSuccess()}
//                 onCancel={()=>{console.log('Payment cancelled')}}
//                 createOrder={(data, actions) => {
//                     return actions.order.create({
//                         purchase_units: [{
//                             amount: {
//                                 value: pricing.price,
//                                 currency_code: 'USD'
//                             }
//                         }]
//                     });
//                 }}
//                 />
//             </div>
//         ))
//     }

//     </div>
//   )
// }

// export default PricingModel




import React, { useState, useContext } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import Lookup from '../llm/Lookup';
import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { UserContext } from '../../context/UserContext';

function PricingModel() {
  const { user, setUser } = useContext(UserContext);
  const UpdateToken = useMutation(api.user.UpdateToken);
  const [selectedOption, setSelectedOption] = useState(null);

  const onPaymentSuccess = async () => {
    const token = user?.token + Number(selectedOption?.tokens);
    console.log('Token after payment:', token);

    await UpdateToken({
      token,
      userId: user?._id,
    });

    // Optional: update local user state
    setUser({ ...user, token });
  };

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
      {
        Lookup.PRICING_OPTIONS.map((pricing, index) => (
          <div key={index} className='border p-7 rounded-xl flex flex-col gap-3'
            onClick={() => setSelectedOption(pricing)}>
            <h2 className='font-bold text-2xl'>{pricing.name}</h2>
            <h2 className='font-medium text-lg'>{pricing.tokens} Tokens</h2>
            <h2 className='text-gray-400'>{pricing.desc}</h2>
            <p className='font-bold text-4xl text-center mt-6'>${pricing.price}</p>

            <PayPalButtons
              style={{ layout: "horizontal" }}
              disabled={!user}
              onClick={() => setSelectedOption(pricing)}
              onApprove={() => onPaymentSuccess()}
              onCancel={() => console.log('Payment cancelled')}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: pricing.price,
                      currency_code: 'USD',
                    }
                  }]
                });
              }}
            />
          </div>
        ))
      }
    </div>
  );
}

export default PricingModel;
