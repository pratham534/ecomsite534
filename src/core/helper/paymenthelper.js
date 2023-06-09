import { API } from '../../backend'

export function getToken(userid, token) {
    return (
        fetch(`${API}payment/get_token/${userid}/${token}/`, {
            method: "GET"
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    )
}

export function processPayment(userid, token, paymentInfo) {
    const formData = new FormData();

    for (const name in paymentInfo) {
        formData.append(name, paymentInfo[name])
    }
    // console.log(formData)

    return (
        fetch(`${API}payment/process/${userid}/${token}/`, {
            method: 'POST',
            body: formData
        })
    )
        .then(res => res.json())
        .catch(err => console.log(err))
}
