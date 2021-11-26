import React from 'react'
// nuestro componente recibira los quote por medio de una declaración props
const Quote = ({quote}) => {
    return (
        <p>
        {/* abrimos una sentencia js {} para que imprima lo que esta en el estado quote.text */}
        {quote.text}
        <br />
        {/* abrimos una sentencia js {} para que imprima lo que esta en el estado quote.author */}
        <span>- {quote.author}</span>
      </p>
    )
}

export default Quote
