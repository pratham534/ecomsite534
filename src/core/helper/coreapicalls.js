import {API} from '../../backend'

export default function getProducts() {
    return (
        fetch(`${API}product/`, {method:'GET'})
        .then((res) => res.json())
        .catch(err => console.log(err))
    )
}