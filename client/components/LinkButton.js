 import { Link } from 'react-router'
 import React from 'react'

const LinkButton = ({to, iconName, classNames}) => (<Link to={to} className={`btn  ${classNames}`}>
                 <i className="material-icons">{iconName}</i>
         </Link>)

export default LinkButton;