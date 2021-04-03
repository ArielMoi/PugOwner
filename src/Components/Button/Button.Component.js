import './Button.css'

const Button = (props) => {
    return (
        <>
        {props.img 
        ? <button onClick={props.onClickFunc} className='btn-img'><img src={props.img} alt='bag' /></button> 
        : <button onClick={props.onClickFunc} className='btn'>{props.btnText}</button>}
        </>
    )
}


export default Button;