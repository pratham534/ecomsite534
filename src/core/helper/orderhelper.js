import { API } from '../../backend'

export async function createOrder(userid, token, orderData) {
    const formData = new FormData();

    for (const name in orderData) {
        formData.append(name, orderData[name])
    }
    // console.log(formData)

    const res = await fetch(`${API}order/add/${userid}/${token}/`, {
        method: 'POST',
        body: formData
    })

    const resj = await res.json()
    // console.log(resj)
    return resj

    // return (
    //     fetch(`${API}order/add/${userid}/${token}/`, {
    //         method: 'POST',
    //         body: formData
    //     })
    // )
    //     .then((res) => {
    //         res.json()
    //         console.log(res)
    //     })
    //     .catch(err => console.log(err))
}