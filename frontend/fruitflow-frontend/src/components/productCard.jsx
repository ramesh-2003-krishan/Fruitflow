export default function ProductCard(props){
    console.log(props);
    return(
        <div>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>Price: ${props.price.toFixed(2)}</p>
        </div>                                                                                                                                                      
    )
}